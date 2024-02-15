import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select } from "../../comp";
import userData from "../../../AppWrite/userBucket";
import firdata from "../../../AppWrite/firBucket";
import { punjabDistricts, rajasthanDistricts } from "./district";
import { useNavigate } from "react-router-dom";
function AddComplaint() {
  const navigate = useNavigate();
  const [state, setState] = useState();
  const [district, setDistrict] = useState([]);
  const user = useSelector((state) => state.authreducer.user);
  useEffect(() => {
    if (state == "Punjab") setDistrict(punjabDistricts);
    else if (state == "Rajasthan") setDistrict(rajasthanDistricts);
    else {
      null;
    }
  }, [state]);
  useEffect(() => {
    setValue("firstname", user?.firstname);
    setValue("lastname", user?.lastname);
    setValue("phoneNo", user?.phone);
    setValue("date", new Date().toISOString().substring(0, 10));
  }, []);

  // const dispatch = useDispatch();

  // console.log("UserData : ", user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //   useEffect(async () => {
  //     const preInfo = await userData.getInfo(user.$id);
  //     if (preInfo) {
  //       setValue("firstname", preInfo.firstname);
  //       setValue("lastname", preInfo.lastname);
  //       setValue("phone", preInfo.phone);
  //     }
  //   }, []);

  let addComplaint = async (data) => {
    console.log({
      ...data,
      name: data.firstname + " " + data.lastname,
      userId: user.$id,
      phoneNo: data.phoneNo.toString(),
    });
    // await firdata.submitFIR({
    //   ...data,
    //   name: data.firstname + " " + data.lastname,
    //   userId: user.$id,

    // });
    // alert("Your complaint has been registered");
    // navigate("/userhome")
  };
  return (
    <div>
      <h1>Add a new complaint</h1>
      <form onSubmit={handleSubmit(addComplaint)}>
        <Input
          label="First Name"
          placeholder="First Name"
          {...register("firstname", {
            required: {
              value: true,
              message: "Please enter your first name.",
            },
          })}
        />
        <p>{errors.firstname?.message}</p>
        <Input
          label="Last Name"
          placeholder="Last Name"
          {...register("lastname", {
            required: {
              value: true,
              message: "Please enter your Last name.",
            },
          })}
        />
        <p>{errors.lastname?.message}</p>
        <Input
          label="Phone No."
          placeholder="00000-00000"
          {...register("phoneNo", {
            required: {
              value: true,
              message: "Please enter your Phone No.",
            },
          })}
        />
        <p className="text-red-500">{errors.phone?.message}</p>
        <Input
          label="Date"
          type="date"
          {...register("date", {
            required: {
              value: true,
              message: "Please select a date",
            },
          })}
        />
        <p className="text-red-500">{errors.date?.message}</p>
        <Select
          label="State"
          raw="select a state"
          options={["Punjab", "Rajasthan"]}
          oc={(e) => {
            setState(e.target.value);
            setValue("state", e.target.value);
          }}
          {...register("state", {
            required: {
              value: true,
              message: "Please select a distict",
            },
            validate: {
              select: (value) => value !== "select a state" || "select a state",
            },
          })}
        />
        <p className="text-red-500">{errors.district?.message}</p>

        <Select
          label="District"
          raw="select a district"
          oc={(e) => setValue("district", e.target.value)}
          options={district}
          {...register("district", {
            required: {
              value: true,
              message: "Please select a distict",
            },
            validate: {
              select: (value) =>
                value !== "select a district" || "select a distict",
            },
          })}
        />
        <p className="text-red-500">{errors.district?.message}</p>

        <textarea
          id="txtArea"
          rows="10"
          cols="70"
          {...register("fir", {
            required: {
              value: true,
              message: "Please enter your Complaint",
            },
          })}
        ></textarea>
                <p className="text-red-500">{errors.fir?.message}</p>

        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default AddComplaint;
