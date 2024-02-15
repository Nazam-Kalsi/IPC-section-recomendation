import React, { useEffect } from "react";
import firdata from "../../../AppWrite/firBucket";
import { useSelector } from "react-redux";

function ViewComplaints() {
  const user=useSelector((state)=>(state.authreducer.user))
  const [complaints, setComplaints] = React.useState();

  useEffect(() => {
    let complaintData = async () => {
      let data = await firdata.allFIRs();
      if (data) setComplaints(data.documents);
    };
    complaintData();
  }, []);

  return (
    <>
      {complaints &&
        complaints.map((complaint) => {
          return (
              <div className="p-4 border rounded-md" key={complaint.$id}>
                <h4 className="">Complain ID: {complaint.$id}</h4>
                <p className="">Complainant Name : {complaint.name}</p>
                <p className="">
                  Complainant Addahar Number : {user.addahar}
                </p>
                <p className="">
                  Complainant Phone Number : {user.phone}
                </p>
                <p className="">
                  Complainant Address : {complaint.state}-{complaint.district}
                </p>
                <p>FIR Date : {(complaint.date)}</p>
                <p>FIR Status : {(complaint.status)}</p>
                <p>FIR : {complaint.fir}</p>
              </div>
          );
        })}
    </>
  );
}

export default ViewComplaints;
