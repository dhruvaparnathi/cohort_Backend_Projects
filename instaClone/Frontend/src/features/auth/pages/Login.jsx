import { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const { handleLogin, loading } = useAuth();
  
  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

  function handleSubmit(e){
    e.preventDefault();

    handleLogin(username, password)
    .then(res=>{
      console.log(res);
    })
  }

  return (
    <main className="auth">
      <section className="auth-container">
        <div className="auth-left">
          <h1>Welcome Back</h1>
          <p>Login to continue your journey with us.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
              onInput={(e)=>setUsername(e.target.value)}
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
              onInput={(e)=>setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>

            <button type="submit">Login</button>
          </form>

          <p className="switch-auth">
            Don’t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>

        <div className="auth-right">
          <div>
            <h2>Hello Again 😇</h2>
            <p>
              Access your account and stay connected with your community.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;