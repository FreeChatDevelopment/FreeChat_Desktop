/**
 * 自定义react 路由
 */
import { FC, Suspense } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Routers, { Items } from './routers'

const RouterArr = (items: Items[]): JSX.Element[] => {
  return items.map((item: Items, key: number) => {
    return <Route key={key} path={item.path} element={<item.element />} >
      {item.children && RouterArr(item as any)}
    </Route>
  })
}

const MyRouetr: FC = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        {RouterArr(Routers)}
        <Route path="*" element={<Navigate to="/default" />} />
      </Routes>
    </Suspense>
  )
}

export default MyRouetr

