import React, { useEffect,useState } from "react";
import firdata from "../../../AppWrite/firBucket";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ComplaintData ,Loading} from "../../comp";

function Complaints() {
  const [loader, setLoader] = useState(true);
  const user = useSelector((state) => state.authreducer.user);
  const [complaints, setComplaints] = React.useState();

  useEffect(() => {
    let complaintData = async () => {
      let data = await firdata.allFIRs();
      if (data) setComplaints(data.documents);
      setLoader(false)


    };
    complaintData();
  }, []);

  return (
    <>
          {loader && <Loading />}

      <p className="text-center mt-5 font-bold  text-4xl font-sans text-primary border-b pb-2 ">COMPLAINTS</p>
     <div className="bg-[url(databg.svg)] flex flex-wrap gap-6 justify-between p-4 ">

      {complaints &&
        complaints.map((complaint) => {
          return (
            <Link to={`/complaints/${complaint.$id}`} key={complaint.$id}>

              <div className="p-4 rounded-md border">
                <ComplaintData name="Complaint ID" value={complaint.$id} />
                <ComplaintData name="User Name" value={complaint.name} />
                <ComplaintData name="Addahar Number" value={user.addahar} />
                <ComplaintData name="Complainant Address" value={`${complaint.state} - ${complaint.district}`}/>
                <ComplaintData name="FIR Date " value={complaint.date} />
                <ComplaintData name="FIR Status   " value={complaint.status} />
                <ComplaintData name="IPC Section" value={complaint.ipcSection} />
              
                <ComplaintData name="FIR  " value={complaint.fir} />
              </div>
            </Link>
          );
        })}
        </div>
    </>
  );
}

export default Complaints;
