import React, {useEffect, useState} from 'react'
import Comments from './Comments/Comment'
import axios from 'axios'
import '../PostDetailed/PostDetailed.scss'

function PostDetailed(props){

    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    useEffect(() => {
        console.log('postDetailed')
        getPostDetails()
    }, [props.match.params.postId])

    const getPostDetails = () => {
        axios.get(`/api/subforums/${props.match.params.subforumId}/posts/${props.match.params.postId}`)
        .then(res => {
            console.log('then')
            setPost(res.data)
            setLoading(false)
        })
    }

    console.log(post)

    return(
        <div>
            <div className='detailed-post-container'>
                {loading === true ? 
                'loading' 
                :
                <div>
                    {post[0].post_title}

                </div>
                }
            </div>
            <div className='comments-container'>
                <Comments 
                    postId={props.match.params.postId}
                />
            </div>
        </div>
    )
}

export default PostDetailed