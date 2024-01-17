import React, { useContext } from "react"
import { IoMdTrash } from "react-icons/io"
import {  useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config"
import {BiLogOut} from "react-icons/bi"
import {  signOut } from "firebase/auth";
import { Context } from "../../context/ContextFile";

function Setting() {
  const navigate=useNavigate()
  const {setTextSize,font,setFont,theme,setTheme2,setTheme,setUserName,isSignedIn,setIsSignedIn,setUserId}=useContext(Context)


  function handleFont(e){
    e.preventDefault()
    setFont(e.target.value)
  }

  function handleTextSize(e){
    e.preventDefault()
    setTextSize(e.target.value)
  }

  function handleDefaultTheme(){
    setTheme('bg-yellow-200')
    setTheme2('bg-yellow-100')
  }
  function handleSecondTheme(){
    setTheme('bg-slate-200')
    setTheme2('bg-gray-100')
  }
  function handleThirdTheme(){
    setTheme('bg-green-300')
    setTheme2('bg-lime-200')
  }

  function handleLogout(){
    if(navigator.onLine){
      signOut(auth).then(() => {
        setIsSignedIn(false)
        setUserName('')
        navigate("/login")
        setUserId('')
      }).catch((error) => {
        alert(error)
      });
    }else{
      alert("Offline")
    }
  }

  function handleDelete(){
    if(navigator.onLine){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Signed In");
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
      <div className=" h-screen ">
        <h1 className=" text-2xl text-center font-sembold underline">Settings</h1>
        <div className="mx-3 md:mx-0 ">
{/* Theme start */}
          <section className={` items-center flex justify-between bg-yellow-50 my-4 py-2 md:py-5 md:text-xl px-2 rounded-md`}>
            <p className=" font-semibold ">Theme</p>
            <main className="flex items-center gap-6">
              <button onClick={handleDefaultTheme} className={` border-2  w-7 h-8 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-50 text-transparent ${theme==="bg-yellow-200"?'border-blue-400':''}`}>.</button>
              <button onClick={handleSecondTheme} className={` w-7 h-8 rounded-full bg-gradient-to-br ${theme==="bg-slate-200"?'border-blue-400':''} border-2
              from-slate-500 to-gray-200  text-transparent`}>.</button>
              <button onClick={handleThirdTheme} className={`${theme==="bg-green-300"?'border-blue-400':''} w-7 h-8 rounded-full bg-gradient-to-tr from-green-300 border-2 to-lime-100 text-transparent`}>.</button>
            </main>
          </section>
{/* Theme End */}
{/* Font Select Section */}
          <section className={` flex justify-between bg-yellow-50  my-4  py-2 md:py-5 md:text-xl px-2 rounded-md`}>
            <p className={` font-semibold  font-${font} `}>Font</p>
            <select name="" onChange={handleFont} className=" bg-yellow-50 outline-none">
              <option value="sans">Sans</option>
              <option value="serif">Times New Roman</option>
              <option value="mono">Monospace</option>
            </select>
          </section>
{/* Font Select end */}
{/* Font Size */}
          <section className={` flex justify-between bg-yellow-50  my-4 py-2 md:py-5 md:text-xl px-2 rounded-md`}>
            <p className={`  font-semibold`}>Font-Size</p>
            <select onChange={handleTextSize} name="" className=" bg-yellow-50 outline-none">
              <option value="base">16</option>
              <option value="lg">18</option>
              <option value="xl">20</option>
              <option value="2xl">24</option>
            </select>
          </section>
{/* Font Size End */}
{/*Logout */}
          <section onClick={handleLogout} className={`${!isSignedIn && "hidden"} cursor-pointer flex  gap-3 items-center text-red-500 bg-yellow-50 md:py-5 md:text-xl my-4 py-2 px-2 rounded-md`}>
            <BiLogOut className=" text-lg"/>
            <button>Logout</button>
          </section>
{/* Delete Account */}
          <section onClick={handleDelete} className={` cursor-pointer flex items-center gap-3 justify-center text-red-500 bg-yellow-50 my-4 py-2 md:py-5 md:text-xl px-2 rounded-md`}>
            <IoMdTrash className=" text-lg"/>
            <button>Delete Account</button>
          </section>
{/* Delete Account end */}
        </div>
      </div>
    </React.Fragment>
    
  )
}

export default Setting


// theme[from original to Dark and white or lime green and white]
// Font Customization
// delete account 