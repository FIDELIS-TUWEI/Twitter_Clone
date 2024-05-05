import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, NotificationPage, ProfilePage, SignUpPage } from "./pages";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";


const App = () => {
  return (
    <div className='flex max-w-6xl mx-auto'>
		<Sidebar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/notifications' element={<NotificationPage />} />
				<Route path='/profile/:username' element={<ProfilePage />} />

			</Routes>
			<RightPanel />
		</div>
  )
};

export default App;