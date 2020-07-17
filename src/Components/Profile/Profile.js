import React, {useEffect, useState} from 'react';
import './Profile.scss';
import ProfileBox from '../ProfileBox/ProfileBox';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import axios from 'axios';

function Profile(props){
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserInfo()
        getUserPosts()
      },[props.match.params.userId]);

    const getUserInfo = () => {
        axios.get(`/api/users/${props.match.params.userId}`)
        .then(res => {
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

    console.log(user)
    return(
        <div className='profile-container'>
            <div className='post-container'>
                {userPosts.map(post => (
                    <div key={post.post_id}>
                        {post.post_title}
                    </div>
                 ))}
            </div>

           <div className='user-info-container'> 
            
            <ProfileBox cake_day={user.cake_day} username={user.username} user_id={user.user_id}/>

            <div className='other-info-section'>
                <ul className='other-info-list'>
                    <li>Help</li>
                    <li>About</li>
                    <li>Communities</li>
                    <li>Top Posts</li>
                    <li>Terms</li>
                </ul>
            </div>
           </div>
           
            
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(Profile);