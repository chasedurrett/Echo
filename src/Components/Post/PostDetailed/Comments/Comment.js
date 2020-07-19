import React, {useEffect, useState} from 'react'
import {GoArrowUp, GoArrowDown} from 'react-icons/go'
import axios from 'axios'
import './Comment.scss'

function Comments(props) {

    const [comments, setComments] = useState([])
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    useEffect(() => {
        getComments()
    }, [])

    const getComments = () => {
        axios.get(`/api/posts/${props.postId}/comments`)
        .then(res => {
            console.log(res.data)
            setComments(res.data)
            setButtonsDisabled(false)
        })
    }

    const upVote = (postId) => {
        setButtonsDisabled(true)
        console.log(`upvoting`);
        axios.post(`/api/subforums/${props.match.params.subforumId}/posts/${postId}/upvote`)
          .then(res => {
            getComments()
          })
          .catch(err => console.log(err))
          ;
      };
    
      const downVote = (postId) => {
        setButtonsDisabled(true)
        console.log(`downvoting`);
        axios.post(`/api/subforums/${props.match.params.subforumId}/posts/${postId}/downvote`)
          .then(res => {
            getComments()
          });
      };
    
      const deleteVote = (postId) => {
        setButtonsDisabled(true)
        console.log(`deleting vote`);
        axios.delete(`/api/subforums/${props.match.params.subforumId}/posts/${postId}/remove-vote`)
          .then(res => {
            getComments()
          });
      };

    const mappedComments = comments.map((element, index) => {
        console.log(element)
        return (
            <div className='vote-tracker'>
                <div>
                    {element.upvote === true ? (
                        <GoArrowUp
                            alt='upvote'
                            className='vote-arrow voted'
                            onClick={() => buttonsDisabled ? null : props.deleteVote(element.comment_id)}
                        />
                    )  : (
                        <GoArrowUp
                            alt="upvote"
                            className="vote-arrow"
                            onClick={() => buttonsDisabled ? null :  props.upVote(element.comment_id)}
                        />
                        )     
                    }
                </div>
            </div>
        )
    })

    return (
        <div>

        </div>
    )
}

export default Comments