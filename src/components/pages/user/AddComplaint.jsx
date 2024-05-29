import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select,Loading } from "../../comp";
import userData from "../../../AppWrite/userBucket";
import firdata from "../../../AppWrite/firBucket";
import { punjabDistricts, rajasthanDistricts } from "./district";
import { useNavigate } from "react-router-dom";
function AddComplaint() {
  const [loader, setLoader] = useState(false);
  const fileref = useRef(null);
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
    await firdata.submitFIR({
      ...data,
      name: data.firstname + " " + data.lastname,
      userId: user.$id,
    });
    alert("Your complaint has been registered");
    navigate("/userhome");
  };

  const ocr = (e) => {
    e.preventDefault();
    setLoader(true)
    console.log(fileref);
    console.log(fileref.value);

    const c =
      "https://script.google.com/macros/s/AKfycbw2J64mNPoiCuz4F2YtBPhDa-t0PZ2G9ONMBH0sVPIE0p2uGwzil9EXSCJv9Q9axgVY/exec";
    let a = new FileReader();
    try{

      a.readAsDataURL(fileref.current.files[0]);
    }catch(error){
      if(error)   
       setLoader(false)

    }
    a.onload = () => {
      let h = a.result.split("base64,")[1];
      fetch(c, {
        method: "POST",
        body: JSON.stringify({
          file: h,
          type: fileref.current.files[0].type,
          name: fileref.current.files[0].name,
        }),
      })
        .then((n) => n.text())
        .catch((err) => {
          console.log("Error From server", err);
        })
        .then((n) => {
          setValue("fir", n);
          setLoader(false)

        })
        .catch((err) => {
          console.log("There is Error", err);
        });
    };
  };
  return (
    <>
          {loader && <Loading />}
    <div className=" flex justify-center bg-[url(/bg.svg)] bg-bottom bg-no-repeat bg-cover">
      <form
        onSubmit={handleSubmit(addComplaint)}
        className="border m-6 p-8 sm:w-2/5 rounded-2xl bg-blur backdrop-blur bg-white/50"
      >
        <h1 className="text-center text-primary-300 font-bold text-2xl">
          Add a new complaint
        </h1>
        <div className="flex justify-around gap-1">
          <div className="w-full">
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
          </div>
          <div className="w-full">
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
          </div>
        </div>
        <Input
          label="Phone No."
          placeholder="00000-00000"
          {...register("phoneNo", {
            required: {
              value: true,
              message: "Please enter your Phone No.",
            },
            validate: {
              digits: (value) =>
                /^[0-9]{1,10}$/.test(value) || "Phone Number has Digits",
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
        <div className="flex my-4 gap-2">
          <div className="w-full">
            <Select
              // className='p-2'
              lable="State"
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
                  select: (value) =>
                    value !== "select a state" || "select a state",
                },
              })}
            />
            <p className="text-red-500">{errors.district?.message}</p>
          </div>
          <div className="w-full">
            <Select
              lable="District"
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
          </div>
        </div>
        <label class="block mb-2 text-sm font-medium text-labelcol dark:labelcol" for="file_input">Upload file</label>

        <input
          ref={fileref}
          type="file"
          aria-describedby="file_input_help"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  dark:text-white focus:outline-none dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 py-2 "
        />
        <button
          onClick={ocr}
          title="upload image to Perform OCR"
        //  disabled={fileref?.value ? 'false':'true'}
          className={` disabled:hover:bg-labelcol/50 disabled:bg-labelcol/50 disabled:cursor-not-allowed mt-4 block m-auto rounded-md bg-labelcol px-3 py-2  text-sm font-semibold text-white shadow-sm hover:bg-labelcol-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
        >
          Perforn OCR
        </button>

        <label
          htmlFor="txtArea"
          className="block font-semibold text-labelcol mb-2"
        >
          Complaint
        </label>
        <textarea
          className="w-full min-h-36 p-3 rounded-md outline-none focus:drop-shadow-[0_0_2px_rgba(210,48,73,1)]"
          id="txtArea"
          placeholder="Enter your complaint here..."
          // rows="10"
          // cols="60"
          {...register("fir", {
            required: {
              value: true,
              message: "Please enter your Complaint",
            },
          })}
        ></textarea>
        <p className="text-red-500">{errors.fir?.message}</p>

        <Button className="w-full  mt-5">Submit</Button>
      </form>
    </div>
    </>

  );
}

export default AddComplaint;
