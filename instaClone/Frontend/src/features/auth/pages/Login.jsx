import { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../../shared/components/Loader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const { handleLogin, loading } = useAuth();

  if(loading){
    return <Loader message="Logging you in..." />
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log('handleSubmit called with:', username, password);
    setError("");

    handleLogin(username, password)
      .then((res) => {
        console.log(res);
        if (res && res.user) {
          navigate('/');
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Login failed. Please check your credentials.");
      });
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
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>

            <button type="submit">Login</button>
          </form>

          {error && <p className="error-message">{error}</p>}

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
}

export default Login;