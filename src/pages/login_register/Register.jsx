import React, { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import svg from "../../svg's/Notebook-bro.svg"
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Context } from "../../context/ContextFile";
import useLocalStorage from "use-local-storage";
import OfflineToast from "../../myToastNotifications/OfflineToast";
import FormToast from "./FormToast";

function Register() {
  const [register, setRegister] = useLocalStorage("register",{email:"",password:''})
  const [displayFormToast,setDisplayFormToast]=useState(false)
  const [fieldsEmpty, setFieldsEmpty] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [emailCorrect,setEmailCorrect]=useState(false)
  const {email,password}=register
  const navigate=useNavigate()
  const {setFormToastMessage,setOfflineTrigger,offlineTrigger,setUserName,setIsSignedIn,setUserId}=useContext(Context)

  useEffect(function(){
    const test=setTimeout(function(){
      setFieldsEmpty(false)
    },2000)

    return function(){
      clearTimeout(test)
    }
  },[fieldsEmpty])

  useEffect(function(){
    const test=setTimeout(function(){
      setOfflineTrigger(false)
    },2000)

    return function(){
      clearTimeout(test)
    }
  },[offlineTrigger,setOfflineTrigger])


  useEffect(function(){
    const test=setTimeout(function(){
      setEmailCorrect(false)
    },2000)

    return function(){
      clearTimeout(test)
    }
  },[emailCorrect])

  useEffect(function(){
    const test=setTimeout(function(){
      setDisplayFormToast(false)
      setBtnDisabled(false)
    },2000)

    return function(){
      clearTimeout(test)
    }
  },[displayFormToast])



  function handleRegisterChange(e){
    setRegister({...register,[e.target.name]:e.target.value})
  }

  function handleRegisterSubmit(e){
    e.preventDefault();
    // Checks if registering user is Online
    if(navigator.onLine){
      if(email==="" || password===""){
        setFieldsEmpty(true)
      }else{
        if(email.includes("@")&&email.indexOf("@")===email.lastIndexOf("@")){
          createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
              setBtnDisabled(true)
              navigate("/")
              const user = userCredential.user;
              setUserId(user.uid);
              console.log(user.uid);
              const userName=user.email.indexOf("@")
              setIsSignedIn(true)
              setUserName(user.email.slice(0,userName))
            })
            .catch((error) => {
              setDisplayFormToast(true)
              const messageSlash=(error.message.indexOf("/")+1);
              const messageBracket=(error.message.lastIndexOf(")"))
              const errorMessage=error.message.slice(messageSlash,messageBracket)
              setFormToastMessage(errorMessage)
            });
        }else{
          setEmailCorrect(true)
            setDisplayFormToast(true)
        }
      }
    }else{
      setOfflineTrigger(true)
    }
  }


  return (
    <React.Fragment>
      <FormToast displayFormToast={displayFormToast}/>
      <OfflineToast/>
      <div className=" flex flex-col items-center gap-5 h-screen">
       <img src={svg} alt="Note Image" className=" w-[50%] md:w-[20%]" />
       <form action="" onSubmit={handleRegisterSubmit} className=" flex flex-col gap-4">
        <section>
          <label htmlFor="" className=" text-gray-700  font-semibold">Email</label><br />
          <input type="email" onChange={handleRegisterChange}  value={email} name="email"  className=" outline-none bg-white py-1 px-2 my-1 ml-0.5 rounded-lg" />
          <p className={` text-red-700 text-[12px] px-3 capitalize font-semibold ${emailCorrect?'block':'hidden'}`}>Incorrect email</p>
          <p className={` text-red-700 text-[12px] px-3 capitalize font-semibold ${email.length===0&&fieldsEmpty?'block':'hidden'}`}>please enter email field!</p>
        </section>
        <section>
          <label htmlFor="" className=" text-gray-700  font-semibold">Password</label><br />
          <input type="password" onChange={handleRegisterChange}  value={password} name="password"  className=" outline-none bg-white py-1 px-2 my-1 ml-0.5 rounded-lg" />
          <p className={` text-red-700 text-[12px] px-3 capitalize font-semibold ${password.length===0&&fieldsEmpty?'block':'hidden'}`}>please enter password field!</p>
        </section>
        <button disabled={displayFormToast||btnDisabled} className={` ${displayFormToast||btnDisabled?" bg-slate-700":'bg-black'} text-white rounded-md py-1 font-semibold`}>Sign-up</button>
        <NavLink to="/login" className={"text-center underline"}>Login</NavLink>
       </form>
    </div>
    </React.Fragment>
  )
}

export default Register