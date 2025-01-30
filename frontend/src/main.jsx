import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

import { ToastContainer, Bounce } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <RouterProvider router={router} />
  </Provider>,
)
