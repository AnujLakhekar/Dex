import React from 'react'
import { motion } from "framer-motion"
import * as lucide from "lucide-react"
import { Link } from "react-router-dom"

type SidebarEvent = {
  title: string
  color: string
  id: number
  Icon: React.ElementType
  target: string
}

const SIDEBAR_EVENTS: SidebarEvent[] = [
  { title: "OverView", color: "pink", id: 1, Icon: lucide.BarChart, target: "/" },
  { title: "Products", color: "skyblue", id: 2, Icon: lucide.X, target: "/products" },
]

interface SidebarProps {
  isOpen?: boolean
}

const Sidebar: React.FC<SidebarProps> = () => {
  const isSidebarOpen = true;

  return (
    <motion.div
      className={`w-[260px] ${isSidebarOpen ? "block" : "hidden"} h-screen bg-gray-900 border-[3px] border-gray-800 z-50`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex w-full justify-center items-center mt-5">
        <div className="grid w-[80%] grid-cols-1 grid-rows-4">
          {SIDEBAR_EVENTS.map((e) => (
            <motion.div
              key={e.id}
              className="mt-2.5 border border-gray-600/60 ease-in duration-200 rounded p-2 w-full hover:bg-gray-600/30"
            >
              <Link to={e.target}>
                <li className="list-none p-2 gap-2 flex">
                  <e.Icon color={e.color} size={24} />
                  <h3 className="font-bold">{e.title}</h3>
                </li>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar
