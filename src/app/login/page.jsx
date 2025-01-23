"use client";
import Input from "../components/Input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

const defaultData = { username: "", password: "" };

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState(defaultData);

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post("api/users/login", data); // Ensure the path starts with "/"
      setData(defaultData);
    
      if (response.status === 200 || response.status === 201) {
              router.push("/profile");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white px-16 pt-8 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Login Now</h1>
        <form onSubmit={onLogin}>
          
          <Input
            label="Username"
            id="username"
            type="text"
            value={data.username}
            onChange={(e) => onValueChange(e)}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => onValueChange(e)}
          />
          <button
            type="submit"
            className="px-2 py-2 text-white rounded-full w-full bg-blue-500 p-2 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link className="m-1 text-blue-400 hover:underline" href="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
