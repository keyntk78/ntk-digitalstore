import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Login,
  Home,
  Public,
  Products,
  DetailProduct,
  Blogs,
} from './pages/public'
import path from './utils/path'
import { getCategories } from './store/app/asyncAction'
import { useDispatch } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='min-h-screen font-main'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
