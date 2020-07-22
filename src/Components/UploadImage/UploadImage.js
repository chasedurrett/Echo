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
                            Uploading your {props.bannerUpload ? `banner` : `profile`} image now!
                        </div> 
                    : 
                        <div style={{marginTop: '50px'}}>
                            {props.bannerUpload ? <div>This is banner upload</div> : null}
                            {props.profileUpload ? <div>This is profile upload</div> : null}
                            {img_preview === '' ? '' : <img style={{width: '300px', height: 'auto'}} src={img_preview} alt="image preview"/>}
                            <input type='file' onChange={handleImagePreview} />
                            <button onClick={handleSubmitFile} style={{height: '100px'}}>
                                Post Image
                            </button>
                        </div>
                    }
                </div>
            </div>
           
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(PostImage);
   
