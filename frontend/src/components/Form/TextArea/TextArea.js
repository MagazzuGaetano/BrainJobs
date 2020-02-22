import React from 'react'

const TextArea = ({
  id,
  name,
  title,
  value,
  handleChange,
  placeholder,
  required
}) => {
  return (
    <div className="field">
      <label htmlFor={name} className="label">{title}</label>
      <div className="control">
        <textarea
          className="textarea"
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required={required || false}>
        </textarea>
      </div>
    </div>
  )
}

export default TextArea