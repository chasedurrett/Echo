import React, {useEffect} from 'react';
import './Profile.scss';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

function Profile(props){

    return(
        <div className='profile-container'>
            Profile Page
            {props.isLoggedIn ? <div>username is {props.user.username}</div> : ''}
            
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(Profile);