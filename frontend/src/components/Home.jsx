import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Home() {

  const [userData, setUserData] = useState(false);
  const [logoutLoading, setLogoutloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const URL = import.meta.env.VITE_REACT_APP_URL;

      useEffect(() => {
        getUserData()
       },[])

  async function getUserData(){
    setLoading(true);
    try {
      setLoading(false);
      const response = await axios({
        method: "get",
        url: URL + "/api/insta/user",
        withCredentials: true
      });
      console.log('response',response)
  
      if (response.data.success) {
        setUserData(response.data.data);
      }
    } catch (error) {
      navigate("/signin");
      setLoading(false);

    }
  }

  // logout
  async function handleLogout() {
    setLogoutloading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/insta/logout",
        withCredentials: true
      });
      if (response.data.success) {
        navigate("/signin");
      }
      setLogoutloading(false);
    } catch (error) {
      setLogoutloading(false);
    }
  }

  return (
    <>  
    {
      loading ? ('loading......') : 
    
    (<div className='w-[800px] h-[500px] border-4 border-slate-300 flex flex-col justify-center items-center space-y-4 bg-gray-400 text-black rounded-sm'>

      <img className='rounded-full w-[300px] ' src="https://media.istockphoto.com/id/1329326793/photo/asian-handsome-business-man-wearing-white-shirt-communicating-working-typing-on-laptop.jpg?s=612x612&w=0&k=20&c=dK7p_An1NjuwduFJAOmTB-asbkVcGwjsQMFocVH7xYY=" alt="" />

      <h1 className='font-bold text-2xl'>{userData.userName}</h1>
      <h3 className='font-semibold'>{userData.bio}</h3>
      <h4>{userData.email}</h4>
      <h4>followers : 5000</h4>

    </div>)
}

<button
            type="button"
            onClick={() => handleLogout()}
            className="absolute bottom-10   items-center flex gap-4 right-10 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Logout
            {logoutLoading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 animate-spin ml-2"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </button>
    </>
  )
}

export default Home
