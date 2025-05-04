import React from 'react'

export const CheckBox = ({ checked, onChange, label }) => {
    return (
        <label className="checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="checkbox-box"></span>
            {label && <span className="checkbox-label">{label}</span>}
        </label>
    )
}
