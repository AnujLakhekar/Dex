import React from 'react'
import { StateCard, OverviewChart, StockPieChart } from "../../components"
import * as lucide from "lucide-react"
import { motion } from "framer-motion"
import { useQuery } from '@tanstack/react-query';

const OverviewPage = () => {
 
  
const { data: overviewData, isPending, error } = useQuery({
queryKey: ["OverviewData"],
queryFn: async () => {
const res = await fetch(`${import.meta.env.VITE_BACKNED_URL}/api/me`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({category: 0, users:0, })
});

if (!res.ok) throw new Error(res.status);
  const fetchedData = await res.json();
  
 return fetchedData;
 }
 });

if (error) return <div className="flex justify-center w-[90%] p-2.5 bg-pink-600 m-2 rounded-lg text-black font-bold ">Error: {error.message}</div>;

 return (
 <>
 {isPending ? (
 <div className="w-full h-screen fixed z-50 bg-gray-700/30 flex justify-center items-center">
<div className="w-[34px] h-[34px] border-4 bg-sky-500 rounded-full animate-pulse"></div>
</div>
) : (
 <motion.div className="mt-2">
  <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
className="settings items-center flex justify-center m-2.5"
 > 
<div className="flex rounded-3xl overflow-y-scroll justify-center scrollbar-hide w-[120px] items-center  gap-2.5">

 <button className="p-2.5 font-bold text-indigo-100/70 bg-indigo-600 rounded-3xl"></button>
 <button className="flex gap-2.5 p-2.5 font-bold text-indigo-100/70 bg-indigo-600 rounded-3xl"><lucide.RotateCcw  className="stroke-[3] w-8 h-8 duration-[3s]" /></button>
 <button className="p-2.5 font-bold text-indigo-100/70 bg-indigo-600 rounded-3xl"></button>

</div>
 </motion.div>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
className="grid grid-cols-2 grid-rows-2 m-2.5 gap-2.5"
 >
 <StateCard name='Total Sales' icon={lucide.Zap} value={overviewData.sales+`₹`} color='#6366F1' />
 <StateCard name='Users' icon={lucide.Users} value={overviewData.users} color='#8B5CF6' /> 
 <StateCard name='Total Products' icon={lucide.ShoppingBag} value={overviewData.products.length} color='#EC4899' />
 <StateCard name='stock' icon={lucide.BarChart2} value={overviewData.stock} color='#10B981' />
 </motion.div>
   <OverviewChart data={overviewData.saleGraph} />
   <StockPieChart data={overviewData} />
 

 </motion.div>
 )}
</>
 );
};

export default OverviewPage;
