import React from 'react'

function ComplaintData({name,value,className=' '}) {
  return (
    <p><span className={`text-slate-500 inline-block min-w-40 `}>{name} </span><span className={`text-black font-semibold ${className}`}> {value}</span></p>
    )
}

export default ComplaintData;