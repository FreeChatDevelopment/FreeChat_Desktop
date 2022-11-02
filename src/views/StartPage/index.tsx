/**
 * 启动页
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'

import './index.scss'
export default function startPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()
  const goBack = (path: string) => {
    navigate(`${path}`)
  }
  console.log(useNavigate, '1')
  return (
    <>
      <div className="start-page">
        启动页
        <button onClick={() => goBack('index')}>登录</button>
      </div>
    </>
  )
}