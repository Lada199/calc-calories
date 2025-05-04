
import React from 'react'

export const Button = ({children, type, onClick}) => {
  return (
   <button
    type={type} 
     className='btn'
     onClick={onClick}
     >{children}</button>
  )
}
