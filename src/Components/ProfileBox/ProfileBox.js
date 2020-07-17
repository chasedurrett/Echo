import React from 'react';
import './ProfileBox.scss';
import {FaPen} from 'react-icons/fa';
import {GiCakeSlice} from 'react-icons/gi';
import {connect} from 'react-redux';

function ProfileBox(props) {

    // console.log('user who is logged in', props.user.user_id)
    // console.log('page of user trying to view', props.user_id)
    return (
        <div className='user-info-section'>
            {/* ensure that edit btns only appear when viewing a profile page */}
            {props.user.user_id ===  props.user_id && !props.subforum_name ?
            <div className='edit-profile-banner'>
                <FaPen className='profile-pic-edit'/>
            </div>
            : null } 

            <div className='profile-image-section'>
                {/* <img src='' */}
                {props.user.user_id === props.user_id && !props.subforum_name?
                    <div className='edit-profile-image'>
                    <FaPen className='profile-pic-edit'/>
                </div>
                : null } 
            </div>
            
               {props.username ? 
                <div className='user-info-username'>
                    u/{props.username} 
                </div>
               : null}

               {props.subforum_name ? 
                <div className='subforum-info-name'>
                    {props.subforum_name} 
                </div>
                : null}
            <div className='user-info-cake-day-container'>
                <div className='user-info-cake-day'>
                    <div className='cake-day'>Cake day</div>
                    <div className='cake-day-date'>
                        <GiCakeSlice className='cake-icon'/>
                        {props.cake_day}
                    </div>
                </div>
            </div>
        </div>

    )

}

const mapStateToProps = state => state

export default connect(mapStateToProps)(ProfileBox);