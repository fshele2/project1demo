import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./transfer.css";

const Transfer = () => {
    const [fromAcId, setFromAcId] = useState('');
    const [toAcId, setToAcId] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        fetch('http://localhost:3000/transfer', {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ fromAcId, toAcId, amount })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            throw new Error("Error in transfer")
        })
        .then(json => {
            setSuccess("Transfer success");
            console.log(json);
        })
        .catch(error => {
            setError("Error in transfer");
            console.log(error);
        });
    }

    return (
        <>
            <div className='trfcont'>
                <h1> Transfer Money </h1>
                <form onSubmit={handleSubmit}>
                    <input className='withdraw'
                        type='number' 
                        placeholder='From Account Id' 
                        name='fromAcId' 
                        value={fromAcId}
                        onChange={e => setFromAcId(e.target.value)}
                    />
                    <input className='withdraw'
                        type='number' 
                        placeholder='To Account Id' 
                        name='toAcId' 
                        value={toAcId}
                        onChange={e => setToAcId(e.target.value)}
                    />
                    <input className='withdraw'
                        type='number' 
                        placeholder='Amount' 
                        name='amount' 
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                    <input className='add' type='submit' value='Transfer' />
                </form>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>

            <button onClick={() => navigate('/dashboard')}>Home</button>
        </>
    )
}
export default Transfer