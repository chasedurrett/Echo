import React, {useEffect, useState} from 'react'
import {GoArrowUp, GoArrowDown} from 'react-icons/go'
import axios from 'axios'
import './Comment.scss'

function Comments(props) {

    const [comments, setComments] = useState([])
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    useEffect(() => {
        getComments()
    }, [props.postId, props.loader])

    const getComments = () => {
        axios.get(`/api/posts/${props.postId}/comments`)
        .then(res => {
            console.log(res.data)
            setComments(res.data)
            setButtonsDisabled(false)
        })
    }

    console.log(comments)

    const upVote = (commentId) => {
        setButtonsDisabled(true)
        console.log(`upvoting`);
        axios.post(`/api/posts/${props.postId}/comments/${commentId}/upvote`)
          .then(res => {
            getComments()
          })
          .catch(err => console.log(err))
          ;
      };
    
      const downVote = (commentId) => {
        setButtonsDisabled(true)
        console.log(`downvoting`);
        axios.post(`/api/posts/${props.postId}/comments/${commentId}/downvote`)
          .then(res => {
            getComments()
          });
      };
    
      const deleteVote = (commentId) => {
        setButtonsDisabled(true)
        console.log(`deleting vote`);
        axios.delete(`/api/posts/${props.postId}/comments/${commentId}/remove-vote`)
          .then(res => {
            getComments()
          });
      };

    const mappedComments = comments.map((element, index) => {
        console.log(element)
        return (
            <div key={element.comment_id}>
                <div className='vote-tracker'>
                        {element.comment}
                    <div>
                        {element.upvote === true ? (
                            <GoArrowUp
                            alt='upvote'
                            className='vote-arrow voted'
                            onClick={() => buttonsDisabled ? null : deleteVote(element.comment_id)}
                            />
                            )  : (
                                <GoArrowUp
                                alt="upvote"
                                className="vote-arrow"
                                onClick={() => buttonsDisabled ? null :  upVote(element.comment_id)}
                                />
                                )     
                            }
                    </div>
                    <div className='voteCount'>{element.vote_tracker}</div>
                    <div>
                        {element.downvote === true ? (
                            <GoArrowDown
                            alt="upvote"
                            style={{ maxWidth: 50 }}
                            className="vote-arrow voted"
                            onClick={() => buttonsDisabled ? null :  deleteVote(element.comment_id)}
                            />
                            ) : (
                                <GoArrowDown
                                alt="downvote"
                                className="vote-arrow"
                                onClick={() => buttonsDisabled ? null :  downVote(element.comment_id)}
                                />
                                )}
                    </div>

                </div>
            </div>
        )
    })

    return (
        <div className='comments-container'>
            {mappedComments}
        </div>
    )
}

export default Comments