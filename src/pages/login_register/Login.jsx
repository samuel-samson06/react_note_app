import React, { useContext, useEffect, useState } from "react"
import svg from "../../svg's/Notebook-amico.svg"
import { NavLink, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Context } from "../../context/ContextFile";
import FormToast from "./FormToast";
import OfflineToast from "../../myToastNotifications/OfflineToast";

function Login() {
  const [fieldsEmpty, setFieldsEmpty] = useState(false)
  const [emailCorrect,setEmailCorrect]=useState(false)
  const [loginTriggers, setLoginTriggers] = useState({email:'',password:''})
  const {email,password}=loginTriggers
  const navigate=useNavigate()
  const {setUserId,setUserName,setIsSignedIn,setFormToastMessage,setOfflineTrigger,offlineTrigger}=useContext(Context)
  const [displayFormToast,setDisplayFormToast]=useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
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
      setDisplayFormToast(false)
      setBtnDisabled(false)
    },2000)

    return function(){
      clearTimeout(test)
    }
  },[displayFormToast])

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

  function handleLoginChange(e){
    setLoginTriggers({...loginTriggers,[e.target.name]:e.target.value})
  }

  function handleLoginForm(e){
    e.preventDefault()
    // First Condition to Test if USer is Online
    if(navigator.onLine){
      // Check if User Inputs all fields neccessary
      if(email.length===0 || password.length===0){
        setFieldsEmpty(true)
      }else{
        if(email.includes("@")&&email.indexOf('@')===email.lastIndexOf('@')){
          setBtnDisabled(true)
          signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
              navigate("/");
              const user = userCredential.user;
              console.log(user);
              setUserId(user.uid);
              console.log(user.uid);
              const userName=user.email.indexOf("@")
              setUserName(user.email.slice(0,userName))
              setIsSignedIn(true)

            }).catch(() => {
              setFormToastMessage('Invalid Email or Password')
              setDisplayFormToast(true)
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
       <form action="" onSubmit={handleLoginForm} className=" flex flex-col gap-2">
        <section>
          <label htmlFor="" className=" text-gray-700  font-semibold">Email</label><br />
          <input type="email" onChange={handleLoginChange} value={email} name="email"  className=" outline-none bg-white py-1 px-2 my-1 ml-0.5 rounded-lg" />
          <p className={` text-red-700 text-[12px] px-3 capitalize font-semibold ${emailCorrect?'block':'hidden'}`}>Incorrect email</p>
          <p className={` text-red-700 text-[12px] px-3 capitalize font-semibold ${email.length===0&&fieldsEmpty?'block':'hidden'}`}>please enter email field!</p>
        </section>
        <section>
          <label htmlFor="" className=" text-gray-700  font-semibold">Password</label><br />
          <input type="password" onChange={handleLoginChange} value={password} name="password"  className=" outline-none bg-white pt-1 px-2 my-1 ml-0.5 rounded-lg " />
          <p className={` text-red-700 text-[12px] px-3 capitalize font-semibold ${password.length===0&&fieldsEmpty?'block':'hidden'}`}>please enter password field!</p>
        </section>
        <button disabled={displayFormToast||btnDisabled} className={` ${displayFormToast||btnDisabled?" bg-slate-700":'bg-black'} text-white rounded-md py-1 font-semibold`}>Login</button>
         <NavLink to="/register" className={"text-center underline"}>Register</NavLink>
       </form>
    </div>

    </React.Fragment>
  )
}

export default Login