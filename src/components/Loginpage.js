import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import decodeJwt from 'jwt-decode';



import img from './imgs/image3.png'

import './style.css'


const Loginpage = () =>{

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [role, setRole] = useState('')
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            history.push('/StudentProfile')
        } else {
          setLoading(false);
        }
      }, []);
    
      const onSubmit = e => {
        e.preventDefault();
    
        const user = {
          email: email,
          password: password,
          role: ''
        };
    
        fetch('http://127.0.0.1:8000/api/v1/users/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then(res => res.json())

          .then(token => {
            if (token.key) {
              const decodedToken = decodeJwt(token);
              localStorage.clear();
              localStorage.setItem('token', token.key);
              localStorage.setItem('permissions',decodedToken.permissions);
              const role = localStorage.getItem('permissions');
              if (role === 'Student'){
                history.push('/StudentProfile')
              }

                  
            } else {
              setEmail('');
              setPassword('');
              localStorage.clear();
              setErrors(true);
            }
          });
      };

   
      return (
        <div className="app-com">
            <div>
                <img align="left" src={img} alt="" width="200" height="200"/>
            </div>
            <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
          {loading === false && <h1>??????????</h1>}
          {errors === true && <h2>???? ???????? ???????? ???? ?????????????? ????????????</h2>}
          {loading === false && (
            <form onSubmit={onSubmit}>
              <input className="placeholder"
                name='email'
                type='email'
                value={email}
                required placeholder = "???? ??????????"
                onChange={e => setEmail(e.target.value)}
              />{' '}
              <br />
              <input className="placeholder"
                name='password'
                type='password'
                value={password}
                required placeholder = "??????????"
                onChange={e => setPassword(e.target.value)}
              />{' '}
              <br />
              <input className="buttonStyle" type='submit' value='??????????' />
            </form>
          )}
        </div>
      );
    };

export default Loginpage


