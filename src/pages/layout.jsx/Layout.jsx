import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { AnimatePresence, motion } from 'framer-motion'
import { Context } from '../../context/ContextFile'

function Layout() {

  const{font,theme,navTrigger,setNavTrigger}=useContext(Context)

  function handleClicked(){
    setNavTrigger(!navTrigger)
  }
  function handleClickBody(){
    setNavTrigger(false)
  }

  return (
    <React.Fragment>
      <motion.aside  onClick={handleClicked} className={`  
      ${theme} sticky cursor-pointer flex flex-col  py-2`}>
      
          <motion.div variants={{initial:{
              rotate:"0deg",
              y:0,
              transition:{
                duration:0.3
              }},
            animate:{
              rotate:'45deg',
              y:4,
              transition:{
                duration:0.4
              }
            },
          }} initial="initial" animate={navTrigger?"animate":'initial'} className='bg-black mx-2 h-0.5 text-transparent my-0.5 w-5'>.</motion.div>
          <motion.div variants={{
            initial:{
              rotate:"0deg",
              y:0,
              transition:{
                duration:0.3
              }
            },
            animate:{
              rotate:"-45deg",
              y:-2,
              transition:{
                duration:0.4
              }
            }
          }} initial="initial" animate={navTrigger?"animate":'initial'} className='bg-black mx-2 h-0.5 text-transparent my-0.5 w-5'>.</motion.div>
          <motion.div variants={{initial:{opacity:1,transition:{
          duration:0.2
          }},final:{opacity:0,transition:{
          duration:0.1
          }}}} initial="initial" animate={navTrigger?'final':'initial'} className='bg-black mx-2 h-0.5 text-transparent my-0.5 w-5'>.</motion.div>
        
      </motion.aside>
      <main>
        <AnimatePresence >
           <Navbar/>
        </AnimatePresence>
      </main>
      <section className={`${theme} font-${font}`} onClick={handleClickBody}>
        <Outlet/>
      </section>
    </React.Fragment>
  )
}

export default Layout