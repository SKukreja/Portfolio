import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Project from './pages/Project/Project';
import { ModalProvider } from './components/Common/ModalContext';
import styled from 'styled-components';
import { useContext } from 'react';
import ModalContext from './components/Common/ModalContext.jsx';

const Blur = styled.div`
  ${({ isModalOpen }) =>
    isModalOpen
      ? `
    filter: blur(10px);
    transition: filter 0.3s ease-in-out;
  `
      : ''};
`;

const Layout = () => {
  const { isModalOpen } = useContext(ModalContext);

  return (
    <div className="app">
      <GlobalStyle />
      <Navbar />
      <Blur isModalOpen={isModalOpen}>
        <Outlet />
        <Footer />
      </Blur>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/project/:id',
        element: <Project />,
      },
      {
        path: '/work',
        element: <Work />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </div>
  );
}

export default App;