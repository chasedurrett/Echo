import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

    
    
function PostImage(props) {
    const [img_preview, setImgPreview] = useState('')
    const [img_file, setImgFile] = useState(null)
    const [user_banner, setUserImage] = useState('')

    //insert aws url into profile image in DB
    const handleCreateProfileImage = () => {
        console.log('user id of user logged in', props.user.user_id)
        console.log('user_image', user_banner)
        axios.put(`/api/users/${props.user.user_id}/bannerImage`, {user_banner})
        .then(res => {
            console.log('succcessful profile image uploaded')
        })
        .catch(err => {
            console.log(err)
        })
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
                setUserImage(res.data)
                console.log(`Success` + res.data);
                handleCreateProfileImage()
                //need to set state first then do the handleCreateProfileImage 
            })
            .catch(err => {
                console.log(err);
            })
            
        }
    }
    
    return (
        <div style={{marginTop: '100px'}}>
            {img_preview === '' ? '' : <img style={{width: '300px', height: 'auto'}} src={img_preview} alt="image preview"/>}
            <input type='file' onChange={handleImagePreview} />
            <button onClick={handleSubmitFile}>
                Post Image
            </button>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(PostImage);
   
