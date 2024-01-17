import React, { useContext } from "react"
import Notes from "./Notes"
import {GoPencil} from "react-icons/go"
import { NavLink, useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config"
import { Context } from "../../context/ContextFile"

function Home() {
  const navigate=useNavigate()
  const {userName}=useContext(Context)

  function handleCreateNote(){
    if(navigator.onLine){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/create")
        } else {
          navigate('/login')
        }
      });
    }else{
      alert("Offline")
    }
  }



  return (
    <React.Fragment>
      <div className=" h-screen overflow-auto">
        <p className=" px-3 text-sm font-medium pt-5 pb-2">{userName!==""&&"Welcome"} {userName}</p>
        {/* <div>
          <HeaderOptions/>
        </div> */}
        <div>
          <Notes/>
        </div>
        <div className=" absolute  left-4 bg-blue-100 text-3xl py-3 px-3 rounded-full bottom-5">
          <NavLink onClick={handleCreateNote}>
            <GoPencil/>
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home



