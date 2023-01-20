import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";

const Dashboard: React.FC<any> = (props: any) => {
  const navigate = useNavigate();
  const appState = useSelector<any, any>((state) => state);

  const [error, setError] = useState("");
  const user = {
    userId: 0,
    username: props.username,
    password: props.password,
  };

  console.log(user);

  const logout = () => {
    //setError("");
    appState.user.username = "";
    appState.user.password = "";
    appState.user.id = 0;
    navigate("/");
  };

  return (
    <div className="dashCont">
      <div className="welcome">
        <h1>Welcome {appState.user.username}</h1>
      </div>

                <h3 className="dashboard-menu">Dashboard</h3>
     
     
      <button className="button-container" onClick={() => navigate("/profile")}>
        View User Profile
      </button>

      <div >
        <button className="button-container" onClick={() => navigate("/transactions")}>
          View Transactions
        </button>
      </div>

      <div >
        <button className="button-container" onClick={() => navigate("/account")}>
          Accounts
        </button>
      </div>

      <div >
        <button className="button-container" onClick={() => navigate("/UserProfile")}>
          UserProfile
        </button>
      </div>

      <div className="depo">
        <button className="send" onClick={() => navigate("/edit")}>
          Edit Password
        </button>
      </div>

      <div className="depo">
        <button className="send" onClick={() => navigate("/editProfile")}>
          Edit Profile
        </button>
      </div>

      <div className="depo">
        <button className="withdraw" onClick={() => navigate("/withdraw")}>
          Withdraw
        </button>
      </div>

      <div >
        <button className="button-container" onClick={() => navigate("/transfer")}>
          Transfer Money between Accounts
        </button>
      </div>

      <div className="depo">
        <button className="request" onClick={() => navigate("/request")}>
          Request Money
        </button>
      </div>

      <div className="depo">
        <button className="send" onClick={() => navigate("/send")}>
          Send Money
        </button>
      </div>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
