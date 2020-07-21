import React from 'react';
import './ClassicPost.scss';
import {BsDot} from 'react-icons/bs';
import {FaCommentAlt} from 'react-icons/fa';

function ClassicPost(props) {


    return (
        <div className='classic-post-container'>
            <div className='counter-container'>
                <div>
                    
                </div>
            </div>
            <div className='post-info-container'>
                <div className='classic-title'>{props.title}</div>
                <div className='classic-chamber'>
                    c/{props.chamber}
                    <BsDot className='dot'/>
                    <span className='classic-author'>Posted by u/{props.username}</span>
                    <FaCommentAlt className='classic-comment'/>
                </div>
            </div>
        </div>
    )
}

export default ClassicPost;