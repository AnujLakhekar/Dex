import React from 'react'
import {motion} from "framer-motion"
import * as lucide from "lucide-react"
import {Link} from "react-router-dom"
const SIDEBAR_EVENTS = [
  {title: "OverView", color: "pink", id: 1, Icon: lucide.BarChart, target:"/"},
  {title: "Products", color: "skyblue", id: 1, Icon: lucide.X, target:"/products"},
  ]


const Sidebar = (isTrue) => {
  
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  
  return (
    <>
    <motion.div
    className={`w-[260px] ${isSidebarOpen ? "block" : "hidden"} h-screen bg-gray-900 border-[3px] border-gray-800  z-50`}
    initial={{ opacity: 0, x: -20 }}
    animate={{opacity: 1, x: 0 }}
    >
     <div className="flex w-full justify-center items-center w-full mt-5" >
     <div className="grid w-[80%] grid-cols-1 grid-rows-4 ">
      {SIDEBAR_EVENTS.map((e, index) => {
        return (
          <motion.div
          key={index}
          className="mt-2.5 border border-gray-600/60 ease-in duration-200 rounded p-2 w-full hover:bg-gray-600/30"
          >
          <Link to={e.target}>
            <li className="list-none p-2 gap-2 flex ">
            <e.Icon color={e.color} size={24}  />
           <h3 className="font-bold">{e.title}</h3>
            </li>
            </Link>
          </motion.div>
          )
      })}
     </div >
     </div >
    </motion.div>
    </>
  )
}

export default Sidebar