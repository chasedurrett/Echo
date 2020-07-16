import React, {useEffect} from "react";
import './Post.scss';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';


function Post(props) {

  useEffect(() => {
    console.log('use effect to grab curent user hit on post page')
    props.getUser()
  },[]);

  return (
    <div className='post-container'>
      post page
    </div>
  )
}

export default Post;
