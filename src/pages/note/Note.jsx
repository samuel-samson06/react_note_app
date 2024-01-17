import {  useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase/firebase-config"
import {  doc, getDoc,deleteDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { IoMdTrash } from "react-icons/io"


function Note() {
    const navigate=useNavigate()
    const {id}=useParams()
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const [loadingNote,setLoadingNote]=useState(false)
    
    
   async function handleDelete(){
        if(navigator.onLine){
            alert("deleting")
            try{
                const deleteNoteRef=doc(db,"notes",id)
                await deleteDoc(deleteNoteRef)
                navigate("/")
                alert("deleted")
            }catch(error){
                console.log(error);
            }
        }else{
          alert("Offline")
        }
      }


    function handleBack(){``
        navigate(-1)
    }
    useEffect(function(){
        async function noteRetrieve(){
            try{
                if(navigator.onLine){
                    const noteRef=doc(db,"notes",id)
                    const data = await getDoc(noteRef);
                    if(data.exists()){
                        setLoadingNote(true)
                        setTitle(data.data().title);
                        setContent(data.data().content);
                    }else{
                        console.log("No docs");
                    }
                }else{
                    alert("Offline")
                }
            }catch(error){
                console.log(error
                    );
            }

        }
        noteRetrieve()
    })

  return (
    <React.Fragment>
        <button className=" pl-5 font-semibold text-2xl" onClick={handleBack}>←</button>
        <div className="h-screen overflow-auto flex flex-col gap-10 py-2 px-4">
           {<p className={`${loadingNote?'hidden':'block'} py-7 animate-bounce text-center font-semibold text-2xl`}>LOADING NOTE <span className=" animate-ping ">.</span><span className=" animate-ping">.</span><span className="animate-ping">.</span></p>}
            <div className="  overflow-y-auto flex flex-col gap-5 px-3">
                <p className=" text-2xl capitalize ">{title}</p>
                <p>{content}</p>
            </div>
            {title!==""&&content!==""&&<section onClick={handleDelete} className={` cursor-pointer flex items-center gap-3 justify-center text-red-500 bg-yellow-50 mx-3 py-2 px-2 rounded-md`}>
                <IoMdTrash className=" text-lg"/>
            <button>Delete Note</button>
          </section>}
        </div>
    </React.Fragment>
  )
}



export default Note