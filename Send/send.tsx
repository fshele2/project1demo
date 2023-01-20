import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Send: React.FC<any> = () => {
  const [error, setError] = useState("");

  const [depositAmount, setdepositAmount] = useState(0);
  const [depositID, setDepositId] = useState(0);

  const [accountBalance, setemail] = useState("");
  const [accountHolder, setfirstName] = useState("");
  const [accountId, setlastName] = useState("");
  const [transactionAmount, setpassword] = useState("");
  const [users, setuserId] = useState(0);

  const appState = useSelector<any, any>((state) => state);

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:5556/data/accounts/deposit/" +
          depositID +
          "/" +
          depositAmount,
        {}
      );

      console.log(response);
      if (response.status === 200) {
        console.log(response);

        setemail(response.data.accountBalance);
        setfirstName(response.data.accountHolder);
        setlastName(response.data.accountId);
        setpassword(response.data.transactionAmount);
        setuserId(response.data.users);

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
    if (input.target.name === "deposit") {
      setdepositAmount(input.target.value);
    } else {
      setDepositId(input.target.value);
    }
  };

  return (
    <div className="login">
      {error && <p className="error-message">{error}</p>}

      <div className="textlogin">
        <h1>Welcome to Revature Financial Center</h1>
        <h2 className="withdraw">deposit Window: {appState.user.username}</h2>
        <h2 className="withdraw">1 accountBalance: {accountBalance}</h2>
        <h2 className="withdraw">2 accountHolder: {accountHolder}</h2>
        <h2 className="withdraw">3 accountId: {accountId}</h2>
        <h2 className="withdraw">4 transactionAmount: {transactionAmount}</h2>
        <h2 className="withdraw">5 users: {users}</h2>
      </div>

      <div className="savve">
        <input className="savve"
          type="number"
          name="deposit"
          placeholder="deposit"
          onChange={gatherInput}
        />
      </div>

      <div className="">
        <input
          type="number"
          name="id"
          placeholder="id"
          onChange={gatherInput}
        />
      </div>

      <button className="button-container"onClick={login}>
        deposit
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
export default Send;
