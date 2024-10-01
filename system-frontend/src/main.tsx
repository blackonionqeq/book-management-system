// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import 'virtual:uno.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { Register } from './Register'
import { Login } from './Login'
import { BookManage } from './BookManage'



const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <BookManage />
  },
]

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('root')!)

root.render(
  <RouterProvider router={router} />
)