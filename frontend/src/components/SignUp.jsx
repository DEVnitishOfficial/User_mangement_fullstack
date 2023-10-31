import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    bio: ""
  });

  const URL = import.meta.env.VITE_REACT_APP_URL;

  async function handleSignup(e){
    e.preventDefault();

    setLoading(true);

   try {
     const response = await axios({
       method: "post",
       url: URL + "/api/insta/signup",
       withCredentials: true,
       data: userData
     });
 
     if (response.data.success) {
      console.log('success',response)
       navigate("/signin");
     }
     setLoading(false);
   } catch (error) {
    alert(error.response.data.message);
    setLoading(false);
   }
  }

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 m-4 ">
      <form className="space-y-6" onSubmit={(e) => handleSignup(e)}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Instagram SignUp
        </h5>

        {/* your name  */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id=""
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="user name"
            required
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        {/* your name end */}

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
            value={userData.userName}
            onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
          />
        </div>
        {/* your username end */}

        {/* email  */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id=""
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@company.com"
            required
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>
        {/* email end */}

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
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        {/* password end */}

        {/* your Bio start  */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Entre your Bio
          </label>
          <textarea
            type="text"
            id=""
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Your bio goes here.........."
            required
            value={userData.bio}
            onChange={(e) =>
              setUserData({ ...userData, bio: e.target.value })
            }
          />
        </div>
        {/* your bio end */}

        {/*  signUp button */}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign Up
          {loading ? "Loading...." : null}
        </button>
        {/*  signUp button End*/}

        {/* create account(signup) */}
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Alerady have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Sign In
          </Link>
        </div>
        {/* create account(signup) end */}
      </form>
    </div>
  );
}

export default SignUp
