import React, { useEffect, useState , useRef} from 'react'
import {axiosClient} from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';


document.title = 'Login'
function Login() {
  const navigate = useNavigate();
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState(""); 
  // const [userdata , setUserdata] = useState({});
  const ref = useRef(null);
  
  // pervent login again
  useEffect (()=>{
    if(localStorage.getItem("User"))
    {
      navigate("/");
    }
  },[navigate]);


  const submitForm =async (e)=>{
      e.preventDefault();
      try {
        ref.current.staticStart();
        const response = await axiosClient.post('/auth/login',{
         email,
         password
        });
        // console.log(response.data);
        if(response.data.statusCode !== 201)
        {
          toast.error(response.data.message);
          return;
        }
        toast.success("Successfully Logged In !!")
        // setUserdata(response.data.message);
        localStorage.setItem('User',JSON.stringify(response.data.message));
        ref.current.complete();
        
        navigate('/');

      } catch (error) {
        console.log(error.message)
      }
  }

  return (
    <div className='bg-slate-800 w-screen h-screen flex flex-col md:flex-row'>
        <LoadingBar color='orange' ref={ref}></LoadingBar>

        <div className='left w-full md:w-2/5 h-1/2 md:h-screen flex justify-center items-center md:items-start'>
          <h1 className='text-white font-thin w-3/4 px-6 md:pl-10 text-4xl sm:text-5xl md:text-7xl leading-tight relative top-1/4 md:top-1/4 left-0 md:left-10 whitespace-pre-wrap text-center md:text-left'>
            <span className='font-medium text-yellow-500'>Outlay</span><br /> Manager App!!
          </h1>
        </div>

        <hr className='hidden xl:block w-0.5 h-3/4 mt-6 md:mt-24 bg-white'></hr>

        <div className='flex justify-center items-center w-full md:w-3/5 h-1/2 md:h-screen'>
          <div className='flex flex-col gap-7 w-4/5 md:w-3/5 h-auto md:h-2/3 pt-10 md:pt-28 items-center'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl text-white font-bold relative'>Login</h1>
            
            <input 
              placeholder='Email' 
              onChange={(e) => setEmail(e.target.value)} 
              className='w-full max-w-sm h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-2 focus:outline-white focus:outline-offset-4'
            />

            <input 
              placeholder='Password' 
              type='password' 
              onChange={(e) => setPassword(e.target.value)}
              className='w-full max-w-sm h-12 pl-6 rounded-2xl outline-none transition-all focus:outline-2 focus:outline-white focus:outline-offset-4'
            />

            <button 
              onClick={submitForm} 
              className='w-full max-w-sm h-12 justify-center text-lg rounded-2xl bg-yellow-600 text-center flex items-center font-bold'>
              Submit
            </button>

            <p className='text-white'>New User? Go to <a href='/signup' className='text-yellow-500 underline'>SignUp</a></p>
          </div>
        </div>
      </div>

  )
}

export default Login