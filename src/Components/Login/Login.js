import React, { useState } from 'react';
import './Login.scss';
import {MdClose} from 'react-icons/md';
import reddit from './reddit-background.jpeg';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = () => {
        axios.post('/auth/login', {username, password})
        .then(res => {
            if(res.status === 200){
                alert('successfully logged in')
                setUsername('')
                setPassword('')
            }
            else {
                alert('something went wrong not good status')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    //policy and user agreement alerts
    const termsAlert = () => {
        alert('we own everything')
    }
    const policyAlert = () => {
        alert(`there isn't one`)
    }

    //input fields 
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
              margin: theme.spacing(1),
              width: '25ch',
            },
          },
      }));
    const classes = useStyles();


    return (
        <div className='login-container'>
            <div className='login-form-container'>
                <MdClose className='login-close-btn' onClick={() => {props.handleLoginFormClose()}}/>
                <div className='login-form-content-container'>
                    <img className='reddit-img' src={reddit} alt='login-art'/>
                
                    <div className='login-form-content'>
                        <div className='login-title'>Login</div>
                        <div className='policy-text'>By continuing, you agree to our
                            <span className='lol-alert' onClick={() => {termsAlert()}}> User Agreement</span> <br/>
                            and <span className='lol-alert' onClick={() => {policyAlert()}}>Privacy Policy</span>.
                        </div>
                        <div className='login-input'>
                             <TextField 
                                value={username}
                                id="outlined-basic" 
                                label="Username" 
                                variant="outlined" 
                                onChange={(e) => setUsername(e.target.value)}
                             />
                            <br/>
                            <TextField 
                                value={password}
                                id="outlined-basic" 
                                label="Password" 
                                variant="outlined"
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                             />
                            <button className='login-form-btn'
                            onClick={() => {registerUser()}}
                            >LOG IN</button>
                         </div>

                         <div className='switch-to-signup'>
                            New to Echo? 
                            <span className='signup-link'>SIGN UP</span>
                         </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login;