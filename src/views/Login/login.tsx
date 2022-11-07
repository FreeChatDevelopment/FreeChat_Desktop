/**
 * Login
 */
import { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
// import Wallet from '../../utils/wallet'
import { message } from 'antd'
import './index.scss'
export default memo(function Login() {
  const navigate = useNavigate()

  let [select, setSelect] = useState(false)
  const goBack = (path: string) => {
    navigate(`${path}`)
  }
  const selectClick = () => {
    select = select ? false : true
    setSelect(select)
  }

  const goBackCreateUser = () => {
    if(!select) return message.error('请勾选协议')
    goBack('/login/create')
  }

  const goBackLoginUser = () => {
    if(!select) return message.error('请勾选协议')
    goBack('/login/user')
  }

  return (
    <>
      <div className="login">
        <img src={require('../../assets/images/logo@2x.png')} className='logo' alt="" />
        <img src={require('../../assets/images/FREECHAT@2x.png')} className="free" alt="" />
        <h3>欢迎使用Freechat<br />享受自由的世界</h3>
        <ul className="btn">
          <li onClick={() => goBackLoginUser()}>登录</li>
          <li onClick={() => goBackCreateUser()}>创建Freechat账户</li>
        </ul>
        <p><em className={select ? 'select yes' : 'select'} onClick={() => selectClick()}></em>我已阅读并同意<a href=" ">《Freechat用户协议》</a>、<a href=" ">《隐私政策》</a>、<a href=" ">《设备权限使用清单》</a>、<a href=" ">《防止滥用政策》</a>和<a href=" ">《儿童保护政策》</a>等协议</p>
      </div>
    </>
  )
})