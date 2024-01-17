import {useState } from 'react'
import NotesApp from './NotesApp'
import { Context } from './context/ContextFile'
import useLocalStorage from 'use-local-storage'
import { ToastContainer } from 'react-toastify'

function App() {
  const [navTrigger,setNavTrigger] = useState(false)
  const [isSignedIn,setIsSignedIn]=useLocalStorage("signedIn",false)
  const [userName,setUserName]=useLocalStorage('username','')
  const [userId,setUserId]=useLocalStorage('userId','')
  const [offlineTrigger,setOfflineTrigger]=useState(false)
  const [formToastMessage,setFormToastMessage]=useState('')
  const [theme,setTheme]=useLocalStorage('theme','bg-yellow-200')
  const [theme2,setTheme2]=useLocalStorage('theme2','bg-yellow-50')
  const [font,setFont]=useLocalStorage("font",'sans')
  const [textSize,setTextSize]=useLocalStorage('text','')

  const value={textSize,setTextSize,font,setFont,theme2,setTheme2,theme,setTheme,formToastMessage,setFormToastMessage,offlineTrigger,setOfflineTrigger,userName,setUserName,navTrigger,setNavTrigger,isSignedIn,setIsSignedIn,userId,setUserId}

  return (
    <Context.Provider value={value}>
      <NotesApp/>
      <ToastContainer/>
    </Context.Provider>
  )
}

export default App