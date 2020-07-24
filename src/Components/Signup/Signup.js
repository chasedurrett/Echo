import React, { useState } from 'react';
import './Signup.scss';
import {MdClose} from 'react-icons/md';
import reddit from './reddit-background.jpeg';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/reducer';

function Signup(props) {
    const [user_email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [signupNext, setSignupNext] = useState(false);

    const registerUser = () => {
        axios.post('/auth/register', {user_email, username, password})
        .then(res => {
            console.log('returning axio promise')
            if(res.status === 200){
                setUsername('')
                setPassword('')
                setEmail('')
                setLoading(false)
                props.handleSignupFormClose()
                props.loginUser(res.data);
            }
            else {
                alert('username already exists')
                setLoading(false)
            }
        })
        .catch(err => {
            console.log(err)
            alert('username already exists')
            setLoading(false)
        })
    }

    //policy and user agreement alerts
    const termsAlert = () => {
        alert('we own everything')
    }
    const policyAlert = () => {
        alert(`there isn't one`)
    }

    return(
        <div className='signup-container'>
            <div className='signup-form-container'>
                <MdClose className='login-close-btn' onClick={() => {props.handleSignupFormClose()}}/>
                <div className='signup-form-content-container'>
                    <img className='reddit-img' src={reddit} alt='login-art'/>
                    {signupNext ? 
                        <div className='signup-form-content'>
                                <div className='signup-title'>Choose your username</div>
                                <div className='username-signup-text'>
                                    Your Username is how other community members will see you. 
                                    This name will be used to credit you for things you share on Echo! What should we call you?
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
                                            type='password'
                                            value={password}
                                            label="Password" 
                                            variant="outlined" 
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                 </div>

                                 <button className='signup-form-btn'
                                        onClick={() => {registerUser(); setLoading(true)}}
                                        >{loading ? <CircularProgress size={28} disableShrink style={{color: "white"}} /> : <span>SIGN UP</span>}
                                </button>

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
                    }
                        
                </div>
            </div>
        </div>
    )
}

export default connect(null, {loginUser})(Signup);