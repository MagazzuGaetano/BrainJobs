import React from 'react'

const Select = ({
  name,
  title,
  value,
  handleChange,
  options
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>{title}</label>
      <div className="control">
        <div className="select">
          <select
            className="select"
            name={name}
            value={value}
            onChange={handleChange}
          >
            {options.map(option => {
              return (
                <option
                  key={option}
                  value={option}
                  label={option}>{option}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Select