import React, { useContext, useEffect, useState } from "react"
import { db } from "../../firebase/firebase-config"
import { getDocs,collection } from "firebase/firestore"
import { Context } from "../../context/ContextFile"
import { Link, useNavigate } from "react-router-dom"
import HomeToast from "../../myToastNotifications/HomeToast"
import HomeOfflineTrigger from "./HomeOfflineTrigger"


function Notes() {
    const [notesFromDB,setNotesFromDB]=useState([])
    const {theme2,isSignedIn,userId,textSize}=useContext(Context)
    const notesCollectionRef=collection(db,"notes");
    const [isLoaded,setIsLoaded]=useState(false)
    const [offlineTrigger,setOfflineTrigger]=useState(false)
    const navigate=useNavigate()

    useEffect(function(){
        const test=setTimeout(function(){
          setOfflineTrigger(false)
        },2000)
    
        return function(){
          clearTimeout(test)
        }
      },[offlineTrigger])

    useEffect(function(){
        async function getNotes(){
            if(navigator.onLine){
                setIsLoaded(true)
                try{
                    if(isSignedIn){
                        const data=await getDocs(notesCollectionRef)
                        const retrievedData=data.docs.map((doc)=>({...doc.data(),id:doc.id}))
                        setIsLoaded(false)
                        const filteredData=retrievedData?.filter(function(eachNote){
                            return eachNote.userId===userId
                        })
                        setNotesFromDB(filteredData);
                    }else{
                        navigate("/login")
                    } 
                }catch(error){
                    console.log(error);
                }
            }else{
                setOfflineTrigger(true)
            }
        }

        getNotes()
    },[isSignedIn])


    return (
    <React.Fragment>
        <div className=" flex flex-col gap-1 mb-5">
           <HomeOfflineTrigger offlineTrigger={offlineTrigger}/>
           <HomeToast messageTrigger={isLoaded} />
            {notesFromDB.length===0?<p className={` text-${textSize} font-semibold ${theme2} px-5 py-2 md:py-5 rounded-md`}>You Currently Have No Notes</p>:notesFromDB.map(function(eachNote){
                return(
                    <Link to={eachNote.id} className={`text-${textSize} flex flex-col gap-2 rounded-lg bg-yellow-100 py-5 px-4 my-1  mx-3`} key={eachNote.id}>
                        <p className=" font-semibold text-xl">{eachNote.title}</p>
                        <p className=" font-light text-sm text-gray-800">{eachNote.date}</p>
                        <article className=" text-base">{eachNote.content.length>30?`${eachNote.content.slice(0,30)}...`:eachNote.content}</article>
                    </Link>
                )
            })}
        </div>

    </React.Fragment>
  )
}

export default Notes