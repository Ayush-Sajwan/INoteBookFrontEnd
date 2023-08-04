import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [details, setDeatils] = useState({ name: "", email: "", password: "", cpassword: "" });

  const onChange = (e) => {
    setDeatils({ ...details, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (details.password !== details.cpassword) {
      alert("Password in Both fields does not match")
    }
    else {

      const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ name:details.name,email: details.email, password: details.password })
      });
      if (response.status === 400) {
        alert("Credentials are not valid");
      }
      else {


        const data = await response.json();
        localStorage.setItem("token", data.authToken);
        navigate("/");

      }
    }
  }


  return (
    <div className="container">
      <h1 className='text-center my-3'>Signup to Inotebook</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input  value={details.name} onChange={onChange} className="form-control" name="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" value={details.email} onChange={onChange} className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name="password" value={details.password} onChange={onChange} className="form-control"  />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" name="cpassword" value={details.cpassword} onChange={onChange} className="form-control"  />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
