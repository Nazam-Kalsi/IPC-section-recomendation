import React, { useEffect, useState } from "react";
import firdata from "../../../AppWrite/firBucket";
import { Link } from "react-router-dom";
import { ComplaintData } from '../../comp'
import { useSelector } from "react-redux";
function GetComplaint() {
  const [complaints,setComplaints]=useState(null);
  const user = useSelector((state) => state.authreducer.user);
 
  //  async( const firs = await firdata.allFIRs();
  //   if (firs) {
  //     console.log(firs);
  //    setComplaints(firs.documents);
  //   })();
  // useEffect(firs, [user]);
  useEffect(() => {
    async function firs() {
      const firs = await firdata.allFIRs()
      if (firs) {
        setComplaints(firs.documents)
      }
    }
    firs()
  }, [user] )
return complaints ? (
  <>
  <p className="text-center mt-5 font-bold  text-4xl font-sans text-primary border-b pb-2 ">MY COMPLAINTS</p>
     <div className="bg-[url(/databg.svg)] flex flex-wrap gap-6 justify-between p-4 ">
        {
            complaints.map((individual)=>{
              return(
                ( user.$id==individual.userId) ?
                    <div key={individual.$id} className="border-2 bg-slate-100/50 basis-[28%] p-2 m-4">
                      <ComplaintData name='User ID' value={individual.userId}/>
                      <ComplaintData name='Name' value={individual.name}/>
                      <ComplaintData name='Phone Number' value={individual.phoneNo}/>
                      <ComplaintData name='Date' value={individual.date.substring(0,10)}/>
                      <ComplaintData name='Complaint ID ' value={individual.$id}/>
                      <ComplaintData name='Complaint Status ' value={individual.status}/>
                      <ComplaintData name='Complaint ' value={individual.fir}/>
                    </div>
                : null
                )
              })}
</div>
</>)
            :
             <p>You don't hane any submitted  FIR</p>;
}

export default GetComplaint;
