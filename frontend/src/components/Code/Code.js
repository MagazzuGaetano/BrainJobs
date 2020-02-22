import React from 'react'
import { Highlight } from 'react-fast-highlight'

import './Code.css'

const Code = ({
  type,
  language,
  code
}) => {
  const setLang = () => 
    [(language === 'csv' || language === 'avro')? ('json') : (language)]

  return (
    <div className="code-block">
      <h3 id="code-type">{type}</h3>
      <Highlight
        languages={setLang()}>
        {code}
      </Highlight>
    </div>
  )
}

export default Code