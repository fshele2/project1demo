import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const Send = () => {
  const [senderBalance, setSenderBalance] = useState(1000);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(amount > senderBalance) {
      alert("Insufficient balance");
    } else if (!recipient) {
      alert("Please enter a recipient");
    } else {
      setSenderBalance(senderBalance - amount);
      alert(`Successfully sent $${amount} to ${recipient}`);
    }
    setRecipient('');
    setAmount(0);
  };

  return (
    <div>
      <h2>Send Money</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipient:
          <input
            type="text"
            name="recipient"
            onChange={e => setRecipient(e.target.value)}
            value={recipient}
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>

      <h3>Available balance: {senderBalance}</h3>
      
      
      <button onClick={() => navigate('/dashboard')}>Home</button>
      
    </div>
    
  );

};

export default Send