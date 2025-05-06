
import OverviewPage from "./pages/overview/OverviewPage.tsx" 
import Product from "./pages/products/products.tsx" 
import Sidebar from "./components/common/Sidebar.tsx"
import {Routes, Route} from "react-router-dom"

const App = () => {
  
return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<Sidebar />
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