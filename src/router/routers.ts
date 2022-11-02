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
    path: '/index',
    title: 'index',
    element: lazy(() => import('../views/Index'))
  }
]

export default Router