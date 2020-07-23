import React, {useEffect, useState} from 'react';
import './Profile.scss';
import ProfileBox from '../ProfileBox/ProfileBox';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import axios from 'axios';
import ClassicPost from '../Post/ClassicPost/ClassicPost';
import LinearProgress from '@material-ui/core/LinearProgress';



function Profile(props){
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(null);


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
        setLoading(true)
        axios.get(`/api/users/${props.match.params.userId}/profileInfo `)
        .then(res => {
            setUserPosts(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div className='profile-container'>
            <div className='post-container'>
                {loading === true ? 
                <LinearProgress /> :
                userPosts.length === 0 ? 
                <div className='no-post-msg'>No posts yet... Starting Echoing</div>
                :
                userPosts.map(post => (
                    <ClassicPost key={post.post_id} 
                    title={post.post_title} 
                    chamber={post.subforum_name}
                    username={post.username}
                    subforumId={post.subforum_id}
                    upvote={post.upvote}
                    downvote={post.downvote}
                    vote_tracker={post.vote_tracker}
                    post_id={post.post_id}
                    />
                 ))}
            </div>

           <div className='user-info-container'> 
            
            <ProfileBox 
                cake_day={user.cake_day} 
                username={user.username} 
                user_id={user.user_id} 
                user_image={user.user_image} 
                user_banner={user.user_banner}
            />

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