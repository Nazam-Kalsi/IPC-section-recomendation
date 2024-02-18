import React from 'react'

function Container({children}) {
  return (
    <div className='min-h-[calc(50vh)]'>
        {children}
    </div>
  )
}

export default Container