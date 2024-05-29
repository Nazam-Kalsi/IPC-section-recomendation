import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userData from "../../../AppWrite/userBucket";
import { Button, Input } from "../../comp";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../store/userSlice";
import auth from "../../../AppWrite/auth";
export default function MyInfo() {
  const navigate = useNavigate();
  const [UpdateE, setE] = useState(false);
  const [UpdateP, setP] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authreducer.user);
  const [writeable, setWriteable] = useState("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      userId: `${user?.$id}`,
      firstname: `${user?.firstname}`,
      lastname: `${user?.lastname}`,
      addahar: `${user?.addahar}`,
      phone: `${user?.phone}`,
      // email: `${user?.email}`,
      // password: `${user?.password}`,
    },
  });
  const showPassword = (e) => {
    e.preventDefault();
    if (writeable == "password") setWriteable("text");
    else {
      setWriteable("password");
    }
  };
  const emailUpdate = async (e) => {
    e.preventDefault();
    const pw = getValues("password");
    const em = getValues("email");
    await auth.updateEmail(em, pw);
    alert("Email updated successfully");
  };
  const passwordUpdate = async (e) => {
    e.preventDefault();
    const pw = getValues("password");
    await auth.updatePassword(pw);
    alert("Password updated successfully");
  };
  const save = async (data) => {
    dispatch(setUser({ ...data }));
    await userData.updateInfo({ ...data });
    alert("Profile saved Successfully!");
    navigate("/userhome");
  };
  //   console.log(user);
  return (
    <>
      <div className="p-8 bg-[url(/myinfobg.svg)]">
        <p className="text-center text-white font-bold text-4xl">MY INFO</p>
        <form
          onSubmit={handleSubmit(save)}
          className="border rounded-xl p-8 w-3/5 mx-auto backdrop-blur bg-white/50"
        >
          <Input
            className="bg-transparent"
            label="User ID"
            readOnly
            {...register("userId")}
          />
          <Input label="First Name" {...register("firstname")} />
          <Input label="Last Name" {...register("lastname")} />
          <Input label="Addahar Number" {...register("addahar")} />
          <Input label="Phone Number" {...register("phone")} />
          <div className="mt-4 flex justify-center gap-10">
            <p>Want to <button className="text-red-800"
              onClick={() => {
                if (UpdateE == true) setE(false);
                else setE(true);
              }}
              >
              update Email
            </button>.
              </p>
              {/* <p>want to <button
              onClick={() => {
                if (UpdateP == true) setP(false);
                else setP(true);
              }}
              >
              update Password
            </button>
              </p>      */}
                   </div>
          {
            UpdateE && <div>
          
          <div className="flex items-center gap-14">
            <Input label="E-Mail" {...register("email")} className="flex-1" />
          <div className="flex items-center gap-14 relative">
            <Input
              label="Password"
              type={writeable}
              {...register("password")}
              />
            <button className="absolute right-2  pt-14" onClick={showPassword}>
              <img
                className="size-6"
                src="https://img.icons8.com/fluency-systems-regular/48/visible--v1.png"
                alt="show"
                />
            </button>
                </div>
            <Button className="flex-[0.2] self-end" onClick={emailUpdate}>
              Update
            </Button>
           
          </div>
          </div>
}
          <Button className="mt-6 w-full">Save</Button>
        </form>
      </div>
    </>
  );
}
