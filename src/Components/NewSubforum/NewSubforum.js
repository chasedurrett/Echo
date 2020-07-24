import React, {useEffect, useState} from 'react'
import {MdClose} from 'react-icons/md';
import reddit from './reddit-background.jpeg';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import '../NewSubforum/NewSubforum.scss'

function NewSubforum(props){

    const [loading, setLoading] = useState(false)
    const [subforumName, setSubforumName] = useState('')
    const [description, setDescription] = useState('')

    const createSubforum = () => {
        let subforum_name = subforumName
        axios.post(`/api/subforums`, {subforum_name, description})
        .then(res => {
            setLoading(false)
            props.handleNewSubforumClose()
            window.location.reload(false)
        })
        .catch(err => console.log(err))
    }


return(
    <div className='signup-container'>
        <div className='signup-form-container'>
            <MdClose className='login-close-btn' onClick={() => {props.handleNewSubforumClose()}}/>
            <div className='signup-form-content-container'>
                <img className='reddit-img' src={reddit} alt='login-art'/>
                {/* {signupNext ?  */}
                    <div className='signup-form-content'>
                            <div className='signup-title'>Choose your Subforum name</div>
                            <div className='username-signup-text'>
                                Your Chamber name is how other community members will find you.
                            </div>
                            <hr/>

                            <div className='signup-userpass-input' style={{marginTop: 50}, {marginBottom: 100}}>
                                <div style={{marginBottom: 50}}>
                                    <TextField 
                                        value={subforumName}
                                        label="Chamber Name" 
                                        variant="outlined" 
                                        onChange={(e) => setSubforumName(e.target.value)}
                                        />
                                </div>
                                    <TextField 
                                        multiline='true'
                                        value={description}
                                        label="Description" 
                                        variant="outlined" 
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                             </div>

                             <button className='signup-form-btn'
                                    onClick={() => {createSubforum(); setLoading(true)}}
                                    >{loading ? <CircularProgress size={28} disableShrink style={{color: "white"}} /> : <span>Create Subforum</span>}
                            </button>

                            {/* <button 
                                className='back-btn'
                                onClick={() => {setSignupNext(false)}}>
                                Back
                            </button> */}
                
                    </div>
                {/* :
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
                } */}
                    
            </div>
        </div>
    </div>
)
}
export default NewSubforum