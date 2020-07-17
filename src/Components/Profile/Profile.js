import React, {useEffect, useState} from 'react';
import './Profile.scss';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import axios from 'axios';

function Profile(props){
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserInfo()
        getUserPosts()
      },[]);

    const getUserInfo = () => {
        console.log('hit getuserinfo function')
        axios.get(`/api/users/${props.match.params.userId}`)
        .then(res => {
            console.log('res.data', res.data)
            setUser(res.data[0])
        })
        .catch(err => {
            console.log(err)
        })
    }
    const getUserPosts = () => {
        axios.get(`/api/users/${props.match.params.userId}/profileInfo `)
        .then(res => {
            setUserPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    console.log(props.match.params.userId)
    console.log(user)
    return(
        <div className='profile-container'>
           Profile
           {user.username}
           {userPosts.map(post => {
            <div>{post.post_title}</div>
           })}
            
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(Profile);