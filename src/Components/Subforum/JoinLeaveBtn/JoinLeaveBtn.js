import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JoinLeaveBtn.scss';

function JoinLeaveBtn(props) {
    const [hasJoined, setHasJoined] = useState(false)
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        getCurrentUser();
        checkJoined(props.subforumId);
    }, [])

    function getCurrentUser() {
        axios.get('/auth/users/current')
        .then((res) => {
            setCurrentUser(res.data)
        }).catch(err => console.log(err))
    }
    
    function checkJoined(subforum_id){
        axios.get(`/api/joined-subforum-or-not/${subforum_id}`)
        .then((res) => {
          if(res.statusCode === 200){
            console.log(`User may join chamber. Showing JOIN button.`)
          } else if (res.statusCode === 500) {
            setHasJoined(true)
            console.log(`User has already joined this chamber. Showing JOINED button.`)
          }
        })
      }

      function joinSubforum(subforum_id) {
        axios.post(`/api/subforums/${subforum_id}/users`)
        .then(() => {
          setHasJoined(true)
          console.log(`Successfully joined chamber.`)
        })
        .catch(err => console.log(err))
      }
      
      function leaveSubforum(subforum_id){
          console.log(subforum_id)
        axios.delete(`/api/subforums/${subforum_id}/users/`)
        .then(() => {
            setHasJoined(false)
          console.log(`Left subforum # ${subforum_id}.`)
        })
        .catch(err => console.log(err))
      }

      console.log(props)

      return (
        <div className="join-btn-container">

        { hasJoined ? <button className="leave-btn" onClick={() => {leaveSubforum(props.subforumId)}}>JOINED</button> : <button className="join-btn" onClick={() => {joinSubforum(props.subforumId)}}>JOIN</button> }

      </div>
      )
}

export default JoinLeaveBtn;