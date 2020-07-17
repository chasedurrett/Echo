import React, {useEffect, useState} from 'react';
import './Profile.scss';
import {FaPen} from 'react-icons/fa'
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
            <div className='user-info-section'>
                <div className='edit-profile-banner'>
                    <FaPen className='profile-pic-edit'/>
                </div>
                <div className='profile-image-section'>
                    <div className='edit-profile-image'>
                        <FaPen className='profile-pic-edit'/>
                    </div>
                </div>
                <div className='user-info-username'>
                    u/{user.username}
                </div>
            </div>
           </div>
           
            
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(Profile);