import React from 'react'
import {OverviewPage, Product} from "./pages"
import {Sidebar} from "./components"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import * as lucide from "lucide-react"

const App = () => {
  const [isTrue, setIsTrue] = React.useState(false);
  
return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<Sidebar isTrue={isTrue} />
			<main className="w-full flex flex-col">
			<Routes>
				<Route path='/' element={<OverviewPage />} />
				<Route path='/products' element={<Product />} />
			</Routes>
			</main>
		</div>
	);
}

export default App