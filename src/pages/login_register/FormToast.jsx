import React, { useContext } from 'react'
import { Context } from '../../context/ContextFile'
import { motion } from 'framer-motion'
function FormToast({displayFormToast}) {
    const{formToastMessage}=useContext(Context)
  return (
    <React.Fragment>
        <motion.div variants={{
            initial:{
                x:-400,
                opacity:0
            },
            animate:{
                x:0,
                opacity:1,
                transition:{
                    type:"spring"
                }
            },exit:{
                x:-400,
                opacity:0
            }
        }} initial="initial" animate={displayFormToast?'animate':'exit'} className=' bg-gray-100 w-fit py-3 px-5 border-r-[8px] inline border-zinc-500  rounded-e-md absolute'>
            {formToastMessage}
        </motion.div>
    </React.Fragment>
  )
}

export default FormToast