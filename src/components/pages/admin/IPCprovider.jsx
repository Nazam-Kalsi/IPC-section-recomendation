import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firdata from "../../../AppWrite/firBucket";
import userData from "../../../AppWrite/userBucket";
import { useForm } from "react-hook-form";
import {Input} from '../../comp/index';
export default function IPCprovider() {
  const [FIR, setFIR] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();
    const {register,setValue,handleSubmit}=useForm();
  useEffect(() => {
    async function data() {
      if (id) {
        const FIR = await firdata.getFIR(id);
        if (FIR) {
          setFIR(FIR);
          const user = await userData.getInfo(FIR.userId);
          if (user) setUser(user);
          setValue('fir', FIR?.fir);
        }
      }
    }
    data();
  }, []);

  const update=(data)=>{
    console.log(data);
  }
  return FIR ? (
    <>
      <div>
        <p>Name : {FIR?.name}</p>
        <p>Date : {FIR?.date}</p>
        <p>Addahar : {user?.addahar}</p>
        <p>Phone Number : {user?.phone}</p>
        <p>Address : {FIR?.state}-{FIR?.district}</p>
      </div>
      <div className="p-4 border">
        <form onSubmit={handleSubmit(update)}>
          <label htmlFor="fir" className="block">Complaint : </label>
            <textarea  id="fir" cols="100" rows="10"  {...register('fir', { required: true})}></textarea>

        </form>
      </div>
        <p>Status : {FIR?.status}</p>
    </>
  ) : (
    <p>Loading...</p>
  );
}
