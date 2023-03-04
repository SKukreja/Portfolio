import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyle from './globalStyles';
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Project from './pages/Project/Project';


const Layout = () => {
  return (
    <div className="app">
      <GlobalStyle />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/project/:id",
        element: <Project />
      }, 
      {
        path: "/work",
        element: <Work />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ]
  },
])

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
