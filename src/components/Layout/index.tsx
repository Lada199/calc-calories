import React from 'react'
import { Header } from '../Header/index.tsx'

export const Layout = ({children}) => {
  return (
   <div className="wrapper">
    <Header/>
    {children}
   </div>
  )
}
