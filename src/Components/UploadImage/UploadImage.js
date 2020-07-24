import React, {useState, useEffect} from 'react';
import './UploadImage.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {MdClose} from 'react-icons/md';
import LinearProgress from '@material-ui/core/LinearProgress';

    
    
function PostImage(props) {
    const [img_preview, setImgPreview] = useState('');
    const [img_file, setImgFile] = useState(null);
    const [user_banner, setUserBanner] = useState('');
    const [user_image, setUserImage] = useState('');
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        if(user_banner !== ''){
            handleCreateProfileImage()
        }
    }, [user_banner])

    useEffect(() => {
        if(user_image !== ''){
            handleCreateProfileImage()
        }
    }, [user_image])

    //insert aws url into profile image in DB
    const handleCreateProfileImage = () => {
        if(props.bannerUpload) {
            console.log('bannre_image', user_banner)
            axios.put(`/api/users/${props.user.user_id}/bannerImage`, {user_banner})
            .then(res => {
                props.getUserInfo()
                console.log('succcessful profile image uploaded')
                setUserBanner('')
                setLoading(false)
                props.handleCloseForm()
            })
            .catch(err => {
                console.log(err)
            })
        } 
            else if(props.profileUpload){
                console.log('user_image', user_image)
                axios.put(`/api/users/${props.user.user_id}/profileImage`, {user_image})
                .then(res => {
                    props.getUserInfo()
                    console.log('succcessful profile image uploaded')
                    setUserImage('')
                    setLoading(false)
                    props.handleCloseForm()
                })
                .catch(err => {
                    console.log(err)
                })
            }
    }

    // Image Preview Handler
    const handleImagePreview = (e) => {
            let image_as_base64 = URL.createObjectURL(e.target.files[0])
            let image_as_files = e.target.files[0];
            setImgPreview(image_as_base64)
            setImgFile(image_as_files)
    }

    // Image/File Submit Handler
    const handleSubmitFile = async () => {
        setLoading(true)
        if (img_file !== null){
            let formData = new FormData();
            formData.append('upl', img_file);
            await axios.post(
                '/upload',
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },                    
                }
            )
            .then(res => {
                if(props.bannerUpload){
                    setUserBanner(res.data)
                } 
                else if(props.profileUpload){
                   setUserImage(res.data) 
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    
    return (
        <div className='upload-container'>
            <div className='upload-form-container'>
                {loading ? null : <MdClose className='upload-close-btn' onClick={() => {props.handleCloseForm()}}/> }
                <div className='upload-form-content-container'>
                    {loading ? 
                        <div className='loading-image'>
                            <LinearProgress />
                            <div style={{width: '100%', textAlign: 'center', marginTop: '50px', fontSize: '40px'}}>Uploading your {props.bannerUpload ? `banner` : `profile`} image now!</div>
                        </div> 
                    : 
                        <div style={{width: '100%'}}>
                            {props.bannerUpload ? <div className='upload-title'>Upload your Banner image</div> : null}
                            {props.profileUpload ? <div className='upload-title'>Upload your Profile image</div> : null}
                            <div className='preview-image-container'>
                                {img_preview === '' ? '' : <img className='preview-image' src={img_preview} alt="image preview"/>}
                            </div>
                            <div className='input-container'>
                            <input type='file' onChange={handleImagePreview} className='input-selector'/>
                            <button onClick={handleSubmitFile} className='post-image-btn'>
                                Post Image
                            </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
           
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(PostImage);
   
