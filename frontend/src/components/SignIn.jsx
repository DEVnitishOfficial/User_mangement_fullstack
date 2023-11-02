import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn(){
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ 
    email: "",
    password: ""
    });

    const URL = import.meta.env.VITE_REACT_APP_URL;

    async function handleSignIn(e) {
      e.preventDefault(); // event.preventDefault() method to prevent the default behavior of an HTML form submission
      setLoading(true);
      try {
        const response = await axios({
          method: "post",
          url: URL + "/api/insta/signin",
          withCredentials: true,
          data: credentials
        });
        if (response.data.success) {
          navigate("/");
        }
        setLoading(false);
      } catch (error) {
        alert(error.response.data.message);
        setLoading(false);
      }
    }

    return(
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 m-4">
            <form className="space-y-6" onSubmit={(e) => handleSignIn(e)} >
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Instagram Login
        </h5>

         {/* your userName start  */}
         <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id=""
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="nitish"
            required
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })}
          />
        </div>
        {/* your username end */}

             {/* password */}
             <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            minLength="8"
            placeholder="Entre your password"
            required
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        {/* password end */}

         {/*  signUp button */}
         <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
          { loading ? 'loading...' : null}
        </button>
        {/*  signUp button End*/}

        {/* create account(signup) */}
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">

          <Link to="/forgot-password"
            className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">  
           Forgot Password 
          </Link>
         {" "}?{" "}
         <Link to="/signup"
            className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"> 
         Sign Up
         </Link>
        </div>
        {/* create account(signup) end */}

            </form>

        </div>
    )
}

export default SignIn