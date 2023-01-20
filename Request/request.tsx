import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./request.css";

const Request: React.FC<any> = () => {
  const [error, setError] = useState("");

  const appState = useSelector<any, any>((state) => state);
  const [accountRequest, accoutnSet] = useState("");
  const [personMoney, setPersonMoney] = useState(0);
  const [memoSent, setMemoSent] = useState("");

  const user = {
    accountHolderRequest: accountRequest,
    accountHolderRecipientRequest: "",
    memoRequest: memoSent,
    transactionAmount: personMoney,
  };

  user.accountHolderRecipientRequest = appState.user.username;
  console.log(appState.user.username);

  console.log(user);

  const [requestId, setrequestId] = useState(0);
  const [accountHolderRequest, setaccountHolderRequest] = useState("");
  const [accountHolderRecipientRequest, setaccountHolderRecipientRequest] =
    useState("");
  const [memoRequest, setmemoRequest] = useState("");
  const [requestTransactionType, setrequestTransactionType] = useState("");
  const [transactionAmount, settransactionAmount] = useState(0);
  const [account, setaccount] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5556/data/requests/newRequest",
        user
      );

      console.log(response);
      if (response.status === 202) {
        console.log("Resposn");
        console.log(response);

        setrequestId(response.data.requestId);
        setaccountHolderRequest(response.data.accountHolderRequest);
        setaccountHolderRecipientRequest(
          response.data.accountHolderRecipientRequest
        );
        setmemoRequest(response.data.requestTransactionType);
        settransactionAmount(response.data.transactionAmount);
        setaccount(response.data.account);

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
    if (input.target.name === "receiver") {
      accoutnSet(input.target.value);
    } else if (input.target.name === "amount") {
      setPersonMoney(input.target.value);
    } else {
      setMemoSent(input.target.value);
    }
  };

  return (
    <div className="login">
      {error && <p className="error-message">{error}</p>}

      <div className="textlogin">
        <h1>Welcome to Revature Financial Center</h1>
        <h2>Request Window: {appState.user.username}</h2>
        <h2>1 requestId: {requestId}</h2>
        <h2>2 accountHolderRequest: {accountHolderRequest}</h2>
        <h2>
          3 accountHolderRecipientRequest: {accountHolderRecipientRequest}
        </h2>
        <h2>4 memoRequest: {memoRequest}</h2>
        <h2>5 requestTransactionType: {requestTransactionType}</h2>
        <h2>5 transactionAmount: {transactionAmount}</h2>
        <h2>5 account: {account}</h2>
      </div>

      <div className="receiver">
        <input
          type="text"
          name="receiver"
          placeholder="receiver"
          onChange={gatherInput}
        />
      </div>

      <div className="">
        <input
          type="number"
          name="amount"
          placeholder="amount"
          onChange={gatherInput}
        />
      </div>

      <div className="memo">
        <input
          type="text"
          name="memo"
          placeholder="memo"
          onChange={gatherInput}
        />
      </div>

      <button className="button-container"onClick={login}>
        Request
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
export default Request;
