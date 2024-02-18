import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firdata from "../../../AppWrite/firBucket";
import userData from "../../../AppWrite/userBucket";
import { useForm } from "react-hook-form";
import { Input, Button, Loading,ComplaintData } from "../../comp/index";
import { useNavigate } from "react-router-dom";

export default function IPCprovider() {
  const [complaint, setComplaint] = useState(null);
  const [user, setUser] = useState(null);
  const [manual, setManual] = useState(true);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();
  const { register, setValue, handleSubmit } = useForm();
  useEffect(() => {
    async function data() {
      if (id) {
        const complaint = await firdata.getFIR(id);
        if (complaint) {
          setComplaint(complaint);
          const user = await userData.getInfo(complaint.userId);
          if (user) {setUser(user);
            setLoader(false);
          setValue("fir", complaint?.fir);
          setValue("ipcSection", complaint?.ipcSection);
        }
        }
      }
    }
    data();
  }, []);

  const update = async (data) => {
    setLoader(true);

    let updateData = await firdata.updateFIR({ ...data, id });
    if (updateData) {
      alert("update Sucessfully !");
      navigate("/complaints");
    }

    console.log(data);
  };

  const manually = (e) => {
    e.preventDefault();
    setManual(false);
    console.log("manual");
    // e.current.focus();
  };

  const nlp = (e) => {
    e.preventDefault();
    setValue("ipcSection", "python function execute");
    console.log("python");
  };
  return (
    <>
      {loader && <Loading />}
        <p className="text-center my-5 font-bold  text-4xl font-sans text-primary border-b pb-2">UPDATE</p>
      <div className="m-8">
        <p className=" ml-3 font-bold  text-2xl font-sans text-primary border-b pb-2">User Info :</p>
        <div className="flex flex-wrap gap-4 mb-4 ">
        <ComplaintData className="block mt-2" name="Complaint ID" value={complaint?.$id} />
        <ComplaintData className="block mt-2" name="User Name" value={complaint?.name} />
        <ComplaintData className="block mt-2" name="Addahar Number" value={user?.addahar} />
        <ComplaintData className="block mt-2" name=" Phone Number" value={user?.phone} />
        <ComplaintData className="block mt-2" name=" Address" value={`${complaint?.state} - ${complaint?.district}`}/>
        <ComplaintData className="block mt-2" name=" Date " value={complaint?.date} />
        <ComplaintData className="block mt-2" name="FIR Status   " value={complaint?.status} />
      </div>
        <div className="p-4 border">
          <form onSubmit={handleSubmit(update)}>
            <label htmlFor="fir" className="block font-bold  text-2xl font-sans text-primary border-b pb-2">
              Complaint :
            </label>
            <textarea
              id="fir"
              cols="100"
              rows='10'
              {...register("fir", { required: true })}
            ></textarea>
            <p className="border-b">Status : <span className="text-xl">  {complaint?.status} </span></p>

            <div className="flex gap-4 items-center">
            <Input
            className='flex-1 '
              label="Applicable IPC section "
              readOnly={manual}
              {...register("ipcSection")}
            />
            <Button className='self-end px-2' onClick={nlp}>Auto Generate IPC section</Button>
            <Button className="self-end px-2" onClick={manually}>Update Manually</Button>
            </div>

            <Button className="w-full mt-4">Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
}
