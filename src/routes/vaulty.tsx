import { motion } from 'framer-motion'

export const Vaulty = () => {
  return (
    <div className='hidden md:block overflow-y-auto max-h-[100dvh]'>
      <motion.div
        animate={{ y: [-100, 0] }}
        transition={{
          duration: 1,
          type: 'spring',
          damping: 6,
          stiffness: 50,
          restDelta: 0.001,
        }}
      >
        <h1 className='text-2xl font-semibold p-5'>
          vaulty
          <span className='bg-gradient-to-r from-red-400 to-amber-400 text-transparent bg-clip-text'>
            .
          </span>
        </h1>
      </motion.div>
    </div>
  )
}
