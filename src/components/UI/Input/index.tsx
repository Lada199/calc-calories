import React from 'react'

export const Input = ({type, label, value, onChange, error}) => {
  return (
   <div className='input__wrapper'>
    <label htmlFor="">{label}</label>
    <input 
    className={` ${error ? 'error' : ''}  `}
    type={type} 
    value={value}
    onChange={onChange}
    />
   </div>
  )
}