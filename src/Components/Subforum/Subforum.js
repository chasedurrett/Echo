import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import CardPost from '../Post/CardPost/CardPost'
import "./Subforum.scss";
import ProfileBox from '../ProfileBox/ProfileBox';
import LinearProgress from '@material-ui/core/LinearProgress';

function Subforum(props) {

  const [posts, setPosts] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subforum, setSubforum] = useState({})

  useEffect(() => {
    getPosts();
    getSubforum();
  }, [props.match.params.subforumId]);

  const getPosts = () => {
    setLoading(true)
    axios.get(`/api/subforums/${props.match.params.subforumId}/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setButtonsDisabled(false)
        setLoading(false)
      });
  };

  const getSubforum = () => {
    axios.get(`/api/subforum/${props.match.params.subforumId}`)
    .then(res => {
      setSubforum(res.data[0])
    })
    .catch(err => console.log(err))
  }

  console.log(posts)

  return (
  
    loading ? <LinearProgress style={{marginTop: '80px'}}/> : 
    <div className="subforum-container">

      <div className='subforum-posts-map'>
      {posts.map(post => (
          <div>
            <CardPost key={post.post_id}
            post={post}
            getPosts={getPosts}
            setButtonsDisabled={setButtonsDisabled}
            buttonsDisabled={buttonsDisabled}
            />
          </div>
      ))}
      </div>

      <div className='subforum-profile-box-section'>
        <ProfileBox 
        cake_day={subforum.cake_day}
        subforum_name={subforum.subforum_name}
        subforum_owner_id={subforum.subforum_owner_id}
        subforum_id={subforum.subforum_id}
        />
      </div>
      
 
    </div>
  
  )
}

export default Subforum;
