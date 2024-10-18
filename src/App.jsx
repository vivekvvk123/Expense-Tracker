import './App.css'
import {createBrowserRouter,RouterProvider,Route,Link} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Main from './layouts/Main';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Main />,
    children:[
      {
        path: "/login",
        element: <Login />
      },
      {
        path:"/",
        element:<Dashboard />,
      },
      {
        path: "/about",
        element: <p>About</p>
      }
    ]
  },

]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
