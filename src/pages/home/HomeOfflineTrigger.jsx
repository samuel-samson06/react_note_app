import { motion } from "framer-motion"
import { RiWifiOffLine } from "react-icons/ri"

function HomeOfflineTrigger({offlineTrigger}) {
  return (
    <motion.div variants={{
        initial:{
            x:-400,
            opacity:0,
        },
        animate:{
            x:2,
            opacity:1,
            transition:{
                type:"spring",
            },
        },
        exit:{
            x:-400,
            opacity:0
        }
    }} initial="inital"  animate={offlineTrigger?"animate":'exit'}  className=' font-semibold text-xl border-r-[10px] border-red-600 bg-red-200  w-fit px-5 py-1 rounded-md flex gap-4 items-center' >
        <p>Offline</p>
        <RiWifiOffLine/>
    </motion.div>
  )
}

export default HomeOfflineTrigger