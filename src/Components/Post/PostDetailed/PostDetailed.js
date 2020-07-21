import React, {useEffect, useState} from 'react'
import Comments from './Comments/Comment'

function PostDetailed(props){

    useEffect(() => {
        console.log('postDetailed')
    })

    return(
        <div>
            <div className='post-detailed-posts'>
                
            </div>
            <Comments 
                postId={props.match.params.postId}
            />
        </div>
    )
}

export default PostDetailed