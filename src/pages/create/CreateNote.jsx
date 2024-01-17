import React, { useContext, useState } from "react"
import {  useNavigate } from "react-router-dom"
import { auth, db } from "../../firebase/firebase-config"
import { addDoc, collection } from "firebase/firestore";
import { Context } from "../../context/ContextFile";

function CreateNote() {
  const navigate=useNavigate()
  const{isSignedIn}=useContext(Context)
  const [notesState,setNotesState]=useState({title:'',note:'',userId:null})
  const {title,note}=notesState
  const notesCollectionRef=collection(db,"notes");
  const [clicked,setClicked]=useState(false)
  
  function handleNoteState(e){
    setNotesState(function(prevNotes){
      return {...prevNotes,[e.target.name]:e.target.value}
    })
  }

  async function handleCreateNote(e){
    e.preventDefault()
    if(navigator.onLine){
      if(isSignedIn){
        try{
          if(title==="" || note===""){
            alert("Please input all Parameters")
          }else{
            setClicked(true)
            await addDoc(notesCollectionRef,{title:title,content:note,userId:auth?.currentUser?.uid})
            setNotesState({...notesState,title:'',note:'',userId:null})
            navigate('/')
          }
        }catch(error){
          console.log(error);
        }
      }else{
        navigate('/login')
      }
    }else{
      alert("Offline")
    }
  }

  return (
    <React.Fragment>
      <div className=" h-screen overflow-y-auto">
        <form onSubmit={handleCreateNote} action="" className=" flex flex-col gap-5 my-5 ml-5">
          <div>
            <label htmlFor="" className=" md:text-2xl  font-semibold text-xl">Title</label><br />
            <input type="text" name="title" onChange={handleNoteState}  value={title}  className="w-4/5 md:w-3/4  rounded-md bg-yellow-50 outline-none px-2 py-1 mx-1 my-2"/>
          </div>
          <div>
            <label htmlFor="" className=" md:text-2xl font-semibold text-xl">Note</label><br />
            <textarea name="note" onChange={handleNoteState} value={note} className="outline-none h-56 w-4/5 md:w-3/4 rounded-md bg-yellow-50 my-2 mx-1"/>
          </div>
          <button disabled={clicked} onClick={handleCreateNote} className={`" w-4/5 md:w-3/4 md:py-3 md:text-xl  text-white font-semibold py-1 rounded-md ${clicked?'bg-slate-500':'bg-black'}`}>Create Note</button>
        </form>
      </div>      
    </React.Fragment>
  )
}

export default CreateNote