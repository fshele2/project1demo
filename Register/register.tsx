import axios from "axios";
import "./register.css";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const register = {
    id: 0,
    username: "",
    password: "",
    lastName: "",
    firstName: "",
    email: "",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password || !firstName || !lastName || !email) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5556/data/users/registerUser",
        { firstName, lastName, email, username, password }
      );
      if (response.status === 202) {
        console.log("Registration Complete");
        console.log(response);

        register.id = response.data.id;
        register.username = response.data.username;
        register.password = response.data.password;
        register.firstName = response.data.firstName;
        register.lastName = response.data.lastName;
        register.email = response.data.email;
        navigate("/");
      } else if (response.status === 400) {
        console.log("");
      }
    } catch (error) {
      if (error instanceof Error) {
        const err = error as Error;
        setError("Registration not complete please try again");
      }
    }
  };

  return (
    <div className="Register">
      {error && <p className="error-message">{error}</p>}
      <div className="register-container">
        <h2>Register Here</h2>

        <form onSubmit={handleSubmit}>
          <div className="labels">
            <input
              value={username}
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)} required
            />
          </div>

          <div className="labels">
            <input
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} required
            />
          </div>

          <div className="labels">
            <input
              value={firstName}
              type="text"
              placeholder="firstName"
              onChange={(e) => setfirstName(e.target.value)} required
            />
          </div>

          <div className="labels">
            <input
              value={lastName}
              type="text"
              placeholder="Lastname"
              onChange={(e) => setLastname(e.target.value)} required
            />
          </div>

          <div className="labels">
            <input
              value={email}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} required
            />
          </div>

          <button className="reg-button">Register</button>
        </form>

        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default Register;