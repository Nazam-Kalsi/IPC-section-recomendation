import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../comp";
import auth from "../../AppWrite/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
function SignUp() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let DataHandler = async (data) => {
    dispatch(setUser(data));
   const newUser= await auth.signup(data.email,data.password,data.firstname);
   if(newUser){
    navigate('/login')
   }


  };

  return (
    <div className="">
      <form className="border p-4" onSubmit={handleSubmit(DataHandler)}>
        <Input
          label="First Name"
          placeholder="firstname"
          {...register("firstname", {
            required: {
              value: true,
              message: "This is required field",
            },
          })}
        />
        <p className="text-red-500">{errors.firstname?.message}</p>
        <Input
          label="Last Name"
          placeholder="lastname"
          {...register("lastname", {
            required: {
              value: true,
              message: "This is required field",
            },
          })}
        />
        <p className="text-red-500">{errors.lastname?.message}</p>
        <Input
          label="Phone Number"
          type="number"
          placeholder="0000000000"
          {...register("phone", {
            required: {
              value: true,
              message: "This is required field",
            },
          })}
        />{" "}
        <p className="text-red-500">{errors.phone?.message}</p>
        <Input
          label="Addahar Number"
          type="number"
          placeholder="0000-0000-0000"
          {...register("addahar", {
            required: {
              value: true,
              message: "This is required field",
            },
          })}
        />{" "}
        <p className="text-red-500">{errors.addahar?.message}</p>
     
       <Input
        label="email"
        type="email"
        placeholder="abc@gmail.com"
        {...register("email", {
          required: {
            value: true,
            message: "This is required field",
          },
        })}
      />
      <p className="text-red-500">{errors.email?.message}</p>
      <Input
        label="Password"
        placeholder="********"
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "This is required field",
          },
        })}
      />
      <p className="text-red-500">{errors.password?.message}</p>
      <Button>Sign in</Button>
      </form>
    </div> 
  );
}

export default SignUp;
