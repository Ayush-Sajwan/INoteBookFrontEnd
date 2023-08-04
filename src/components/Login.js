import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [details, setDeatils] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setDeatils({ ...details, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: details.email, password: details.password })
        });
        if (response.status === 400) {
            alert("Invalid Credentials");
        }
        else {


            const data = await response.json();
            localStorage.setItem("token", data.authToken);
            navigate("/");

        }
    }


    return (
        <div className="container">
            <h1 className='text-center my-3'>Login to INotebook</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={details.email} onChange={onChange} className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" value={details.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
