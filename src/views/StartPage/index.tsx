/**
 * 启动页
 */
import { useNavigate } from 'react-router-dom'

import './index.scss'
export default function StartPage() {
  const Navigate = useNavigate()
  const goBack = (path: string) => {
    Navigate(`${path}`)
  }
  return (
    <>
      <div className="start-page">
        <img src={require('../../assets/images/startLogo.png')} alt="" />
        <button onClick={() => goBack('login')}>登录</button>
      </div>
    </>
  )
}