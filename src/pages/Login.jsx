import React from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../assets/logo.avif'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import Lottie from 'lottie-react'

function Login() {
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
            const { username,  password} = values;
            const {data} = await axios.post(loginRoute, {  
                username,                
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
        const { username, password, confirmPassword } = values;
        if(password ===""){
            toast.error("Password and Confirm Password should be same",toastOptions);
            return false;
        }
        else if(username.length===""){
            toast.error("Username should be atleast 3 characters",toastOptions);
            return false;
        }
        else{
            toast.success("Login Successfull",toastOptions);
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
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='brand'>
                 
                <h1>Login </h1>
            </div>

    
            <input type="text" placeholder="Username"  name='username' onChange={(e)=>{
                handleChange(e)
            }} />
            

            <input type="password" placeholder="password"  name='password' onChange={(e)=>{
                handleChange(e)
            }} />

            

            <button type="submit" >Login</button>
            <span>Don't have an account ? <Link to="/">Register</Link></span>
        </form>
        <div className='imager' style={{width:510 } }>
           <img className='img pt-12' src={logo} />
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
    gap: 10rem;
    
    
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
export default Login