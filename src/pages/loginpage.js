import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth"
import './pages.css';
import { useState } from "react";
import Loader from "./Loader";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onLogin = async (data) => {
    setLoading(true)
    console.log("Form Data:", data);
    const body = {
      email: data.email,
      password: data.password,
    }
    try {
      const apires = await authService.authlogin(body)
      console.log(apires?.data)
      localStorage.setItem("auth", "true");
      localStorage.setItem("token",apires?.data?.token);
      setLoading(false)
      navigate("/main/home");
    } catch {
      setLoading(false)
      window.alert("Something went wrong, please try again");
    }
  };
  const CreateAccount = () => navigate('/Register')
  if (loading) {
    return <Loader />
  } else {
    return (
      <form onSubmit={handleSubmit(onLogin)} className="container">
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <div className="actionbuttons">
          <button className="blackbutton" onClick={CreateAccount}>Create Account</button>
          <button type="submit">Login</button>

        </div>
      </form>
    );
  }
}
