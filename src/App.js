import { 
  createBrowserRouter, 
  Route, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Products from './pages/Products'

// layout
import RootLayout from './layouts/RootLayout';

// createbrowserrouter 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='products' element={<Products />} />
    </Route>
  )
)

function App() {

  return (
      
      <RouterProvider router={router}/>
  )
}

export default App;
