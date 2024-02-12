import React, { useEffect } from 'react'
import firdata from '../../../AppWrite/firBucket';

 function  Complaints() {
    const [complaints, setComplaints] = React.useState();
    let complaintData=async()=>{
        let data=await firdata.allFIRs();
        if(data)setComplaints(data)
    }

    useEffect(Complaints,[])
  return (
    <div>{Complaints}</div>
  )
}

export default Complaints