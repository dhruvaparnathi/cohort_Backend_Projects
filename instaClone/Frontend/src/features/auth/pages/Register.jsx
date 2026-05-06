import React from "react";
import "../styles/form.scss";
import axios from "axios";
import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e){
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/register",{
            username,
            email,
            password
        },{
            withCredentials: true
        })
        .then(res=>{
            console.log(res.data)
        })
    }

  return (
    <main className="auth">
      <section className="auth-container">
        <div className="auth-left">
          <h1>Create Account</h1>
          <p>
            Join us today and start connecting with your friends instantly.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                onInput={(e)=>{ setUsername(e.target.value) }}
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
              onInput={(e)=>{ setEmail(e.target.value) }}
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
              onInput={(e)=>{ setPassword(e.target.value) }}
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>

            <button type="submit">Create Account</button>
          </form>

          <p className="switch-auth">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>

        <div className="auth-right">
          <div>
            <h2>Welcome Back 👋</h2>
            <p>
              Build your profile, follow friends and explore amazing content.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;