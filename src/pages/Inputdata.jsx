import React,{  useState } from 'react'
import Papa from 'papaparse';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
import { styled } from 'styled-components';


const Inputdata = () => {
  
  const [data,setData]=useState([]);

  const handleFileupload = (e)=>{
    const file = e.target.files[0];
    
    Papa.parse(file,{
        header:true,
        complete:(results)=>{
            setData(results.data);
        },
    });
  };

 


  return (
    <>
    <input type="file" accept='.csv'  onChange={handleFileupload} />
    <FormContainer>
        
        
        <br />
        {data.length?(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Visits</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row,index)=>(
                        <tr key={index}>
                            <td>{row.Name}</td>
                            <td>{row.Age}</td>
                            <td>{row.Visits}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ):null}
         

        <div className="flex flex-col md:flex-row items-center justify-center mt-8 md:space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mt-4 md:mt-0">
                    <BarChart 
                    width={600}
                    height={320}
                    data={data}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Name" />
                    <YAxis  />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Age" fill="#8884d8" />
                </BarChart>
             </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mt-4 md:mt-0">
                <BarChart
                    width={600}
                    height={320}
                    data={data}
                    margin={{
                    top: 6,
                    right: 30,
                    left: 20,
                    bottom: 6
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="Age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Visits" fill="lightblue" />
            </BarChart>
            </div>
           
        </div>
        </FormContainer>
        

      

     
       
    </>
   
  )
}

const FormContainer = styled.div`
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
    }
    th,
    td {
        text-align: left;
        padding: 16px;
        border: 1px solid #ddd;
    }
    thead,tr:nth-child(even) {
        background-color: #f2f2f2;
    } 
    
  

`;

export default Inputdata
/*
import React, { useState } from 'react';
import { inputRoute } from '../utils/APIRoutes';
function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(inputRoute, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('CSV file uploaded successfully.');
      } else {
        setMessage('Error uploading CSV file.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while uploading the CSV file.');
    }
  };

  return (
    <div>
      <h2>CSV File Upload</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default FileUpload;*/
