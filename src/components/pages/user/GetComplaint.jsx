import React, { useEffect, useState } from "react";
import firdata from "../../../AppWrite/firBucket";
import { Link } from "react-router-dom";
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
return complaints ? (<div>
        {
            complaints.map((individual)=>{
                return(
                   ( user.$id==individual.userId) ?
                    <div key={individual._id} className=" border p-2 m-4">
                        <p>{individual.name}</p>
                        <p>{individual.phoneNo}</p>
                        <p>{individual.date.substring(0,10)}</p>
                        <p>{individual.fir}</p>
                    </div>
                : null
                )
            })
        }
  </div>): <p>You don't hane any submitted  FIR</p>;
}

export default GetComplaint;
