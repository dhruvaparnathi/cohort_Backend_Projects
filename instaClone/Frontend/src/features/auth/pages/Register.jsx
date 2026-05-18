import React from "react";
import "../styles/form.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../../shared/components/Loader";

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const { handleRegister, loading } = useAuth();

    if(loading){
      return <Loader message="Creating your account..." />
    }

    async function handleSubmit(e){
        e.preventDefault()
        setError("")

        try {
          await handleRegister(username, email, password);
          navigate('/');
        } catch (err) {
        // console.error(err); // unnecessary debug log
        setError("Registration failed. Please try again.");
        }
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
                onChange={(e)=>{ setUsername(e.target.value) }}
                value={username}
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                onChange={(e)=>{ setEmail(e.target.value) }}
                value={email}
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                onChange={(e)=>{ setPassword(e.target.value) }}
                value={password}
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>

            <button type="submit">Create Account</button>
          </form>

          {error && <p className="error-message">{error}</p>}

          <p className="switch-auth">
            Already have an account? <Link to="/login">Login</Link>
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