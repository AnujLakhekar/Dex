import React from 'react'
import { motion } from "framer-motion"

interface StateCardProps {
  icon: React.ElementType
  value: string | number
  color: string
  name: string
  prefix?: string
}

const StateCard: React.FC<StateCardProps> = ({ icon: Icon, value, color, name, prefix = '' }) => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 min-w-[170px]'
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className='px-4 py-5 sm:p-6'>
        <span className='flex items-center text-sm font-medium text-gray-400'>
          <Icon size={20} className='mr-2' style={{ color }} />
          {name}
        </span>
        <p className='mt-1 text-3xl font-semibold text-gray-100'>{value}{prefix}</p>
      </div>
    </motion.div>
  )
}


export default StateCard