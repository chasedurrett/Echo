import React, {useState} from 'react';
import './ProfileBox.scss';
import {FaPen} from 'react-icons/fa';
import {GiCakeSlice} from 'react-icons/gi';
import {connect} from 'react-redux';
import defaultImage from './default-profile-image.jpg';
import UploadImage from '../UploadImage/UploadImage';


function ProfileBox(props) {
    const [uploadFormOpen, setUploadFormOpen] = useState(false);
    const [bannerUpload, setBannerUpload] = useState(false);
    const [profileUpload, setProfileUpload] = useState(false)

    const handleUploadFormClose = () => {
        setUploadFormOpen(false)
        setBannerUpload(false)
        setProfileUpload(false)
    }

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
                : null }

                {props.subforum_name ?
                    <img src={props.subforum_img ? props.subforum_img : defaultImage} className='profile-image'></img> 
                : null }
 
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

export default connect(mapStateToProps)(ProfileBox);