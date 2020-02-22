import React from 'react'


const Input = ({
  id,
  name,
  title,
  type,
  value,
  handleChange,
  placeholder,
  required,
}) => {
  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {title}
      </label>
      <div className="control">
        <input
          className="input"
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required || false}
        />
      </div>
    </div>
  )
}

export default Input