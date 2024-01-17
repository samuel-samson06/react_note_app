import { motion } from 'framer-motion'

function HomeToast({messageTrigger}) {

    setTimeout(function(){

    },3000)

  return (
    <motion.div
        variants={{
            initial:{
                x:-400,
                opacity:0,
            },
            animate:{
                x:1,
                opacity:1,
                transition:{
                    type:"spring"
                }
            },exit:{
                x:-400,
                opacity:0,
                transition:{
                    delay:1.5
                }
            }
        }} initial="initial"  animate={messageTrigger?'animate':'exit'}
    className='bg-white w-fit py-1 px-8 rounded-md font-semibold text-xl'>
        {messageTrigger?'Loading...':'Loaded ✅'}
        </motion.div>
  )
}

export default HomeToast