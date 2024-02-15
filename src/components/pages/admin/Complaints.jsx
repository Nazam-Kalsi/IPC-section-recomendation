import React, { useEffect } from "react";
import firdata from "../../../AppWrite/firBucket";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Complaints() {
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
            <Link to={`/complaints/${complaint.$id}`} key={complaint.$id}>
              <div className="p-4 border rounded-md">
                <h4 className="">Complain ID: {complaint.$id}</h4>
                <p className="">Complainant Name : {complaint.name}</p>
                <p className="">
                  Complainant Addahar Number : {user.addahar}
                </p>
                <p className="">
                  Complainant Address : {complaint.state}-{complaint.district}
                </p>
                <p>FIR Date : {(complaint.date)}</p>
                <p>FIR : {complaint.fir}</p>
              </div>
            </Link>
          );
        })}
    </>
  );
}

export default Complaints;
