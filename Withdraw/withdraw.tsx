import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./withdraw.css";

const Withdraw: React.FC<any> = () => {
  const [error, setError] = useState("");

  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const [accountB, setaccountBalance] = useState(0);
  const [accountHolder, setaccountHolder] = useState("");
  const [accountId, setaccountId] = useState(0);
  const [transactionAmount, settransactionAmount] = useState(0);
  const [users, setusers] = useState("");

  const appState = useSelector<any, any>((state) => state);

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:5556/data/accounts/withdraw/" +
          appState.user.id +
          "/" +
          withdrawAmount,
        {}
      );

      console.log(response);
      if (response.status === 200) {
        console.log(response.data.accountBalance);
        setaccountBalance(response.data.accountBalance);
        setaccountHolder(response.data.accountHolder);
        setaccountId(response.data.accountId);
        settransactionAmount(response.data.transactionAmount);
        setusers(response.data.users);

        //if the account logged in successfully, their userId won't be 0.
        if (response.data == null) {
          console.log("Error");
        } else {
          //populate our account object from above with the incoming data from the server
        }
      } else {
        console.log("ERROR" + response);
      }
    } catch (error) {
      const err = error as Error;
      setError("account Already Found");
    }
  };

  const gatherInput = (input: any) => {
    if (input.target.name === "withdraw") {
      setWithdrawAmount(input.target.value);
    }
  };

  return (
    <div className="login">
      {error && <p className="error-message">{error}</p>}

      <div className="textlogin">
        <h1 className="welcome">Welcome to Revature Financial Center</h1>
        <h2 className=".dashboard-menu">Withdraw Window: {appState.user.username}</h2>
        <h2 className="window">1 Window: {accountB}</h2>
        <h2 className="window">2 Window: {accountHolder}</h2>
        <h2 className="window">3 Window: {accountId}</h2>
        <h2 className="window">4 Window: {transactionAmount}</h2>
        <h2 className="window">5 Window: {users}</h2>
      </div>

      <div className="withdraw">
        <input className="withdraw"
          type="number"
          name="withdraw"
          placeholder="withdraw"
          onChange={gatherInput}
        />
      </div>

      <button className="login-button" onClick={login}>
        Withdraw
      </button>
      <button
        className="dashboard-button"
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </button>
    </div>
  );
};
export default Withdraw;
