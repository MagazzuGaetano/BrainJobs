import React from 'react'


const Button = ({
  className,
  style,
  action,
  title
}) => {
  return (
    <div className="control">
      <button
        className={className}
        style={style} 
        onClick={action}>    
        {title} 
    </button>
    </div>
  )
}

export default Button