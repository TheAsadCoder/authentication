import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {




  const {backend_url, setIsLoggedIn} = useAppContext();

  const [state, setState] = useState("Sign up");

  const navigate = useNavigate();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {

      if (state === "Sign up") {
        const {data} = await axios.post(`http://localhost:8080/api/auth/register`, {name, email, password})

        // .then(res => console.log('res',res)).catch(err => console.log('err', err))

        if (data.success) {
          setIsLoggedIn(true)
          navigate("/")
         
        } else {
         toast.error(data.message, {
           position: "top-left",
           });
        }

      } else {

        const responce = await axios.post(`${backend_url}/api/auth/login`, {email, password})

        console.log('responce', responce);
        

        if (data.success) {
          setIsLoggedIn(true)
          navigate("/")
         
        } else {
         toast.error(data.message, {
           position: "top-left",
           });
        }

      }






    } catch (error) {
      console.log("Error", error);
      
      toast.error(error.message, {
        position: "top-left",
        });
    }
  };

  return (
    <div className="flex items-center justify-center relative min-h-screen bg-linear-to-bl from-blue-300 to-cyan-400 p-4">
      <img 
        src={assets.logo}
        alt="Logo"
        className="absolute w-[7rem] cursor-pointer top-[3%] left-[4%] "
        onClick={() => navigate("/")}
      />
      <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-lg w-full sm:w-[390px]">
        {state === "Sign up" ? (
          <h2 className="text-white text-2xl font-semibold text-center">
            Create Account
          </h2>
        ) : (
          <h2 className="text-white text-2xl font-semibold text-center">
            Login
          </h2>
        )}

        {state === "Sign up" ? (
          <p className="text-gray-400 text-center mb-4">Create your account</p>
        ) : (
          <p className="text-gray-400 text-center mb-4">
            Login to your account
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            {state === "Sign up" && (
              <div className="flex items-center gap-3 pl-4 bg-[#333A5C] rounded-full p-2">
                <img src={assets.person_icon} className="" />
                <input
                  type="text"
                  name="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="bg-none border-none outline-none text-white w-full"
                  required
                />
              </div>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-3 pl-4 bg-[#333A5C] rounded-full p-2">
              <img src={assets.mail_icon} className="" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID"
                className="bg-none border-none outline-none text-white w-full"
                required
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="flex items-center gap-3 pl-4 bg-[#333A5C] rounded-full p-2">
              <img src={assets.lock_icon} className="" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-none border-none outline-none text-white w-full"
                required
              />
            </div>
          </div>

          {state === "Login" && (
            <div className="text-right">
              <a href="#" className="text-blue-400 text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 cursor-pointer hover:opacity-90"
          >
            {state}
          </button>

          {state === "Sign up" ? (
            <div className="flex items-center w-full justify-center gap-2 mt-5 text-[14px]">
              <p className="text-gray-400">
                Already have an account click here
              </p>
              <p
                onClick={() => setState("Login")}
                className="text-blue-700 hover:underline cursor-pointer"
              >
                Login
              </p>
            </div>
          ) : (
            <div className="flex items-center w-full justify-center gap-2 mt-5 text-[14px]">
              <p className="text-gray-400">Don't have an account</p>
              <p
                onClick={() => setState("Sign up")}
                className="text-blue-700 hover:underline cursor-pointer"
              >
                Sign up
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
