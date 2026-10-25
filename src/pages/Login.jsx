
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login({ setUserName }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Handle successful login
  const onSubmit = (data) => {
    setUserName(data.username);
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo */}
        <div className="login-logo">
          <img src="/ShopKart/images/logo.png" alt="ShopKart" />
        </div>

        <h2>Welcome Back!</h2>

        <p className="login-subtitle">
          Login to continue shopping with ShopKart
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
              })}
            />

            {errors.username && (
              <p className="form-error">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="form-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
