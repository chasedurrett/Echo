import React, { useState } from 'react';
import './Login.scss';
import {MdClose} from 'react-icons/md';
import reddit from './reddit-background.jpeg';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user_email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [ signupFormOpen, setSignupFormOpen] = useState(false)
    const [signupNext, setSignupNext] = useState(false);

    const loginUser = () => {
        axios.post('/auth/login', {username, password})
        .then(res => {
            if(res.status === 200){
                setUsername('')
                setPassword('')
                setLoading(false)
                props.handleLoginFormClose()
            }
            else {
                alert('something went wrong not good status')
                setLoading(false)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const registerUser = () => {
        axios.post('/auth/register', {user_email, username, password})
        .then(res => {
            console.log('returning axios promise')
            if(res.status === 200){
                setUsername('')
                setPassword('')
                setEmail('')
                setLoading(false)
                handleSignupFormClose()
                props.handleLoginFormClose()
            }
            else if(res.status === 409) {
                alert('username already exists')
                setLoading(false)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleSignupFormClose = () => {
        setSignupFormOpen(false)
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
                { signupFormOpen ? 
                    signupNext ? 
                        <div className='signup-form-content'>
                                <div className='signup-title'>Choose your username</div>
                                <div className='username-signup-text'>
                                    Your username is how other community members will see you. 
                                    This name will be used to credit you for things you share on Reddit. What should we call you?
                                </div>
                                <hr/>

                                <div className='signup-userpass-input'>
                                        <TextField 
                                            value={username}
                                            label="Username" 
                                            variant="outlined" 
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <TextField
                                            value={password}
                                            label="Password" 
                                            variant="outlined" 
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                 </div>
                                 <button className='signup-form-btn'
                                        onClick={() => {registerUser(); setLoading(true)}}
                                >{loading ? <CircularProgress size={28} disableShrink style={{color: "white"}} /> : <span>SIGN UP</span>}</button>

                                <button 
                                   className='back-btn'
                                    onClick={() => {setSignupNext(false)}}>
                                    Back
                                </button>
                        </div>
                    :
                        <div className='signup-form-content'>

                            
                                
                                    <div className='signup-title'>Sign up</div>
                                    <div className='policy-text'>By continuing, you agree to our
                                        <span className='lol-alert' onClick={() => {termsAlert()}}> User Agreement</span> <br/>
                                        and <span className='lol-alert' onClick={() => {policyAlert()}}>Privacy Policy</span>.
                                    </div>
                                    <div className='signup-input'>
                                        <TextField 
                                            value={user_email}
                                            label="Email" 
                                            variant="outlined" 
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <button className='signup-form-btn'
                                        onClick={() => {setSignupNext(true)}}
                                        >CONTINUE</button>
                                    </div>
                                
                            

                        </div>
                    


                :
                    <div className='login-form-content'>
                        <div className='login-title'>Login</div>
                        <div className='policy-text'>By continuing, you agree to our
                            <span className='lol-alert' onClick={() => {termsAlert()}}> User Agreement</span> <br/>
                            and <span className='lol-alert' onClick={() => {policyAlert()}}>Privacy Policy</span>.
                        </div>
                        <div className='login-input'>
                            <TextField 
                                value={username}
                                label="Username" 
                                variant="outlined" 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField 
                                value={password}
                                label="Password" 
                                variant="outlined"
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className='login-form-btn'
                            onClick={() => {loginUser(); setLoading(true)}}
                            >{loading ? <CircularProgress size={28} disableShrink style={{color: "white"}} /> : <span>LOG IN</span>}
                        </button>

                        <div className='switch-to-signup'>
                            New to Echo? 
                            <span className='signup-link'
                            onClick={() => {setSignupFormOpen(true)}}
                            >SIGN UP</span>
                        </div>
                    </div>

                }
                </div>
            </div>
        </div>
 
    )
}

export default Login;