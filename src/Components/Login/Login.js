import React, { useState } from 'react';
import './Login.scss';
import {MdClose} from 'react-icons/md';
import reddit from './reddit-background.jpeg';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

function Login(props) {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const { username, password } = inputs;
    const [submitted, setSubmitted] = useState(false);
    const [] = useState(false);

    const termsAlert = () => {
        alert('we own everything')
    }

    const policyAlert = () => {
        alert(`there isn't one`)
    }

    //input fields 
    const useStylesReddit = makeStyles((theme) => ({
        root: {
          border: '1px solid #878A8C',
          overflow: 'hidden',
          fontFamily: 'IBM Plex Sans',
          borderRadius: 4,
          backgroundColor: '#fcfcfb',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          '&:hover': {
            backgroundColor: '#fff',
          },
          '&$focused': {
            backgroundColor: '#fff',
          },
        },
        focused: {},
      }));
      
      function RedditTextField(props) {
        const classes = useStylesReddit();
      
        return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
      }

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
                            <RedditTextField
                                label="Username"
                                variant="filled"
                                id="reddit-input"
                                type="text"
                            />
                            <br/>
                            <RedditTextField
                                className='password-field'
                                label="Password"
                                variant="filled"
                                id="reddit-input"
                                type="password"    
                            />
                            <button className='login-form-btn'>LOG IN</button>
                         </div>

                         <div className='switch-to-signup'>
                            New to Reddit? 
                            <span className='signup-link'>SIGN UP</span>
                         </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login;