import React from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.jpg'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import Lottie from 'lottie-react'   
import logo1 from '../assets/logo1.avif'

function Register() {
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''

    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            const { username, email, password} = values;
            const {data} = await axios.post(registerRoute, {  
                username,
                email,
                password,
            });

            if(data.status===false){
                toast.error(data.msg,toastOptions);
            }
            if(data.status===true){
                localStorage.setItem("chat-user",JSON.stringify(data.user));
                navigate('/home');
            }
        }
    }
    //validation function 
    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        if(password !== confirmPassword){
            toast.error("Password and Confirm Password should be same",toastOptions);
            return false;
        }
        else if(username.length<3){
            toast.error("Username should be atleast 3 characters",toastOptions);
            return false;
        }
        else if(password.length<6){
            toast.error("Password should be atleast 6 characters",toastOptions);
            return false;
        }
        else if(email===""){
            toast.error("Invalid Email",toastOptions);
            return false;
        }
        else{
            toast.success("Registered Successfully",toastOptions);
            return true;
        }
      
    }
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        console.log(values);

    }

    

  return (
    <>
    <FormContainer>
    
        <div className='imager' style={{width:580 } }>
           <img src={logo1} alt="logo1" style={{width:580 }}/>
        </div>    
        <div>
            
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className='brand'>
                      
                        <h1>Register </h1>
                    </div>
                   
                   
                        <input type="text" placeholder="Username"  name='username' onChange={(e)=>{
                            handleChange(e)
                        }} />
                        

                        <input type="email" placeholder="email"  name='email' onChange={(e)=>{
                            handleChange(e)
                        }} />
                    
                    <div className='flex flex-row gap-12'>
                        <input type="password" placeholder="password"  name='password' onChange={(e)=>{
                            handleChange(e)
                        }} />

                        <input type="password" placeholder="confirm password"  name='confirmPassword' onChange={(e)=>{
                            handleChange(e)
                        }} />
                    </div>

                    <button type="submit" >Register</button>
                    <span>Already have an account ? <Link to="/login-page">Login</Link></span>
                </form>
           
        </div>
    
    </FormContainer>
    <ToastContainer />


    </>
  )
}


const  FormContainer = styled.div`
    height: 80vh;
    width: 70vw;    
    display: flex;
    flex-direction: row;
    justify-content: start;    
    gap: 13rem;
    
    
    .brand{
        display: flex;        
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{           
            height: 5rem;
        }
        h1{
            color:white;
            font-size: 1.5rem;
            text-transform: uppercase;
        }
    }
    form{
        display: flex;
        flex-direction: column;            
        gap: 2rem;
        background-color: #1a1a1a;
        align-items: center;
        justify-content: center;
        border-radius:2rem;
        padding: 3rem 5rem;        
        input{            
            background-color: transparent;
            padding: 1rem;
            border:0.1rem solid #997af0;
            border-radius: 0.4rem;
            color:white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border:0.1rem solid #997af0;
                outline: none;
            }
                      
        }
        button{
            background-color: #997af0;
            padding: 1rem;
            border:0.1rem solid #997af0;
            border-radius: 0.4rem;
            color:white;
            width: 100%;
            font-size: 1rem;
            cursor: pointer;
            &:focus{
                border:0.1rem solid #997af0;
                outline: none;
            }
            &:hover{
                background-color: #99e6ff;
                color:black;
                border:0.1rem solid #99e6ff;
            }
        }
        span{
            color:white;
            text-align: center;
            a{
                color: #997af0;
                text-decoration: none;
            }
        }        
    }                
`;
export default Register