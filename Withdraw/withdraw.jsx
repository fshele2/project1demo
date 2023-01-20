import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./withdraw";

 const Withdraw = (e) => {
    const [acId, setAcId] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        fetch('http://localhost:3000/withdraw', {
            method : 'PUT',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ acId, amount })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            throw new Error("Error in withdraw")
        })
        .then(json => {
            setSuccess("Withdraw success");
            console.log(json);
        })
        .catch(error => {
            setError("Error in withdraw");
            console.log(error);
        });
    }

    return (
        <>
            <div className='wthcont'>
                <h1> Withdraw Amount </h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='number' 
                        placeholder='Account Id' 
                        name='acId' 
                        value={acId}
                        onChange={e => setAcId(e.target.value)}
                    />
                    <input 
                        type='number' 
                        placeholder='Amount' 
                        name='amount' 
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                    <input type='submit' value='Withdraw' />
                </form>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>

            <button onClick={() => navigate('/dashboard')}>Home</button>
        </>
    )
}
export default Withdraw