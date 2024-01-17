import { NavLink } from "react-router-dom"
import {SlNotebook} from "react-icons/sl"
import {SlNote} from "react-icons/sl"
import {MdOutlineAccountCircle} from "react-icons/md"
import {IoMdSettings} from "react-icons/io"
import { motion } from "framer-motion"
import { Context } from '../../context/ContextFile'
import { useContext } from "react"

function Navbar() {



  const{isSignedIn,navTrigger,setNavTrigger}=useContext(Context)
  function handleClicked(){
    setNavTrigger(!navTrigger)
  }


  return (
    <>
    <motion.nav
        variants={{
            initial:{
                x:-1000,
                borderRadius:"60px",
            },
            final:{
                x:0,
                borderRadius:"12px"
                ,transition:{
                    duration:0.5,
                }
            },
            initialExit:{
                x:-1000,
                borderRadius:"60px",
                transition:{
                    duration:0.5
                }
            }
        }}
        initial="initial" animate={navTrigger?'final':'initialExit'} 
    className={` z-10 bg-blue-100 text- h-screen fixed md:w-1/4 w-3/4 top-0  flex flex-col gap-5 font-semibold rounded-e-xl px-3 py-3`}>
        <NavLink onClick={handleClicked} to={"/"} className={`flex items-center gap-2 border-b-2 border-slate-600 py-3 `}><SlNotebook className="text-xl"/><span>Note</span></NavLink>
        <NavLink onClick={handleClicked} to={"create"} className={`flex items-center gap-2 border-b-2 border-slate-600 py-3 `}><SlNote className="text-xl"/>Create Note</NavLink>
        {!isSignedIn&&<NavLink onClick={handleClicked} to={"login"} className={`flex items-center gap-2 border-b-2 border-slate-600 py-3 `}><MdOutlineAccountCircle className="text-xl"/>Login</NavLink>}
        <NavLink onClick={handleClicked} to={"settings"} className={`flex items-center gap-2 border-b-2 border-slate-600 py-3 `}><IoMdSettings className="text-xl"/>Settings</NavLink>
    </motion.nav>
    </>
  )
}

export default Navbar