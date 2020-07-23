import React, {useState} from 'react';
import './ProfileBox.scss';
import {FaPen} from 'react-icons/fa';
import {GiCakeSlice} from 'react-icons/gi';
import {connect} from 'react-redux';
import defaultImage from './default-profile-image.jpg';
import UploadImage from '../UploadImage/UploadImage';
import {RiSettings4Line} from 'react-icons/ri';
import {MdClose} from 'react-icons/md';
import axios from 'axios';
import { logoutUser } from "../../redux/reducer";


function ProfileBox(props) {
    const [uploadFormOpen, setUploadFormOpen] = useState(false);
    const [bannerUpload, setBannerUpload] = useState(false);
    const [profileUpload, setProfileUpload] = useState(false);
    const [deleteFormOpen, setDeleteFormOpen] = useState(false);

    const handleUploadFormClose = () => {
        setUploadFormOpen(false)
        setBannerUpload(false)
        setProfileUpload(false)
    }

    const deleteUser = () => {
        axios.delete(`/auth/delete/users/${props.user.user_id}`)
        .then(res => {
            console.log('successfully deleted user')
        })
        .catch(err => {
            console.log(err)
        })
    }


    const logout = () => {
        axios
        .delete("/auth/logout")
        .then(() => {
            console.log("logout hit");
            props.logoutUser();
            window.location.reload(false);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
        <div className='user-info-section'>
            {props.user_banner ? <img className='banner-image' src={props.user_banner}></img> : null }

            {props.subforum_banner ? <img className='banner-image' src={props.subforum_banner}></img> : null }
            
            {/* ensure that edit btns only appear when viewing a profile page */}
            {props.user.user_id ===  props.user_id && !props.subforum_name ?
                <div className='edit-profile-banner' onClick={() => {setUploadFormOpen(true); setBannerUpload(true)}}>
                    <FaPen className='profile-pic-edit'/>
                </div>
            : null } 

            <div className='profile-image-section'>
                {!props.subforum_name ?
                <img src={props.user_image ? props.user_image : defaultImage} className='profile-image'></img> 
                :  <img src={props.subforum_image ? props.subforum_image : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"} className='profile-image'></img>}
                
                
                {props.user.user_id === props.user_id && !props.subforum_name?
                    <div className='edit-profile-image' onClick={() => {setUploadFormOpen(true); setProfileUpload(true)}}>
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
            
            <div className='settings-container' onClick={() => {setDeleteFormOpen(true)}}>
                <RiSettings4Line className='settings-icons'/>
            </div>
        </div>

        {deleteFormOpen ? 
        <div className='delete-form-container'>
            <div className='delete-form-content'>
            <MdClose className='upload-close-btn' onClick={() => {setDeleteFormOpen(false)}}/>
            <div className='delete-btn-container'>
                <div className='question'>Do you want to DELETE your account?</div>
                <div>
                <button className='delete-yes-btn' onClick={() => {
                    deleteUser()
                    logout()
                }}>
                    YES
                </button>
                <button className='delete-no-btn' onClick={() => {setDeleteFormOpen(false)}}>
                    NO 
                </button>
                </div>
            </div>
            </div>
        </div>
        : null
        }
        
        {uploadFormOpen ? 
            <UploadImage 
                handleCloseForm={handleUploadFormClose} 
                getUserInfo={props.getUserInfo}
                bannerUpload={bannerUpload}
                setBannerUpload={setBannerUpload}
                profileUpload={profileUpload}
                setProfileUpload={setProfileUpload}
            /> 
        : null}
        </div>

    )

}

const mapStateToProps = state => state

export default connect(mapStateToProps, {logoutUser})(ProfileBox);