/**
 * App
 */
import { Outlet } from 'react-router-dom'
import MyRouter from './router/appRouters'
import './assets/scss/global.scss'
export default function App() {
  return (
    <>
      <div className="dragable-header">
      </div>
      <Outlet />
      <MyRouter />
    </>
  )
}