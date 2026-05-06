import React from "react";
import "../styles/form.scss";

const Login = () => {

    


  return (
    <main className="auth">
      <section className="auth-container">
        <div className="auth-left">
          <h1>Welcome Back</h1>
          <p>Login to continue your journey with us.</p>

          <form>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>

            <button type="submit">Login</button>
          </form>

          <p className="switch-auth">
            Don’t have an account? <a href="/register">Create one</a>
          </p>
        </div>

        <div className="auth-right">
          <div>
            <h2>Hello Again 🚀</h2>
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