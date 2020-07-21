import React from 'react';
import './ProfileBox.scss';
import {FaPen} from 'react-icons/fa';
import {GiCakeSlice} from 'react-icons/gi';
import {connect} from 'react-redux';
import defaultImage from './default-profile-image.jpg';


function ProfileBox(props) {

    // console.log('user who is logged in', props.user.user_id)
    // console.log('page of user trying to view', props.user_id)
    return (
        <div className='user-info-section'>
            {props.user_banner ? <img className='banner-image' src={props.user_banner}></img> : null }

            {props.subforum_banner ? <img className='banner-image' src={props.subforum_banner}></img> : null }
            
            {/* ensure that edit btns only appear when viewing a profile page */}
            {props.user.user_id ===  props.user_id && !props.subforum_name ?
                <div className='edit-profile-banner'>
                    <FaPen className='profile-pic-edit'/>
                </div>
            : null } 

            <div className='profile-image-section'>
                {!props.subforum_name ?
<<<<<<< HEAD
                <img src={props.user_image ? props.user_image : defaultImage} className='profile-image'></img> 
                :  <img src={props.subforum_image ? props.subforum_image : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"} className='profile-image'></img>}
                
                
=======

                <img src={props.user_image ? props.user_image : defaultImage} className='profile-image'></img> 
                :  <img src={props.subforum_image ? props.subforum_image : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"} className='profile-image'></img>}
                

>>>>>>> a8f4e747700142d0b65be79d42050466ab024733
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
                        c/{props.subforum_name}
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