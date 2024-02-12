import React from 'react'

function Container({children}) {
  return (
    <div className=' min-h-[34rem] mt-2 border'>
        {children}
    </div>
  )
}

export default Container