import React from 'react'

export const Select = ({valueOption,valueSelect, onChange, label}) => {
  return (
    <div className="select__wrapper">
      <label htmlFor="">{label}</label>
      <select value={valueSelect} onChange={onChange} name="" id="">
        {
          valueOption.map(item => (
            <option key={item.value} value={item.value}>{item.descr}</option>
          ))
        }
          </select>
    </div>
   
  )
}
