import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile: React.FC<any> = () => {
  const [error, setError] = useState("");
  const appState = useSelector<any, any>((state) => state);

  const account = {
    firstname: "",
    lastname: "",
    passwor: "",
    usId: 0,
    usname: "",
  };

  //useState hooks to declare some state that will hold username and password
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [passwor, setpasswor] = useState("");
  const [usId, setusId] = useState(0);
  const [usname, setusname] = useState("");

  //we'll use this object to switch components whenever appropriate
  //this is what lets us navigate to different components with events - no more manual URL changes!
  const navigate = useNavigate();

  /* when the account updates the username/password this will be called thanks to onChange
  the username OR password state will get updated based on the name of the input that's changing */

  const login = async () => {
    //send an HTTP POST request with axios, and store the response in a variable that we can use
    console.log("START  1");
    console.log(appState.user.id);
    try {
      const response = await axios.get(
        "http://localhost:5556/data/users/findById/" + appState.user.id
      );
      console.log(response.data.userId);
      console.log(response.status);
      if (response.status === 200) {
        console.log(response.data.firstName);

        account.firstname = response.data.firstName;
        account.lastname = response.data.lastName;
        account.passwor = response.data.password;
        account.usId = response.data.userId;
        account.usname = response.data.username;

        setfirstname(account.firstname);
        setlastname(account.lastname);
        setpasswor(account.passwor);
        setusId(account.usId);
        setusname(account.usname);

        //if the account logged in successfully, their userId won't be 0.
        if (response.data.userId == null) {
          console.log("Error");
        } else {
          //populate our account object from above with the incoming data from the server
        }
      } else {
        console.log("ERROR" + response);
      }
    } catch (error) {
      const err = error as Error;
      setError("Login to view your account");
      navigate("/");
    }
  };

  return (
    <div className="login">
      {error && <p className="error-message">{error}</p>}

      <div className="textlogin">
        <h1>Welcome to Revature Financial Center</h1>
        <h2>{appState.user.id}</h2>
      </div>

      <button className="login-button" onClick={login}>
        View User Information
      </button>
      <button
        className="dashboard-button"
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </button>

      <div className="account-display">
        <table>
          <tr>
            <td>&nbsp;</td>
            <td>firstname</td>
            <td>lastname</td>
            <td>username</td>
            <td>passwor</td>
            <td>ID</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{usname}</td>
            <td>{passwor}</td>
            <td>{usId}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default UserProfile;
