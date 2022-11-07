import { lazy } from "react";

export type Items = {
  path: string,
  title: string,
  element: Function,
  children?: Array<Items>
}

const Router: Items[] = [
  {
    path: '/',
    title: '启动页',
    element: lazy(() => import('../views/StartPage'))
  },
  {
    path: 'login',
    title: '登录',
    element: lazy(() => import('../views/Login')),
    children: [
      {
        path: '',
        title: '登录',
        element: lazy(() => import('../views/Login/login'))
      },
      {
        path:'create',
        title: '创建账户',
        element: lazy(() => import('../views/Login/createUser'))
      },
      {
        path:'user',
        title: '登录账户',
        element: lazy(() => import('../views/Login/loginUser'))
      }
    ]
  },
  {
    path: 'index',
    title: 'index',
    element: lazy(() => import('../views/Index'))
  }
]

export default Router