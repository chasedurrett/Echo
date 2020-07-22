import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.scss';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';
import ClassicPost from '../Post/ClassicPost/ClassicPost';
import CircularProgress from '@material-ui/core/CircularProgress';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component='span'>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

function Search(props) {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [chambers, setChambers] = useState([]);
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(null);
    const [joined, setJoined] = useState(false);

    const classes = useStyles();

    const location = useLocation();
    let searchParam = location.search;

    useEffect(() => {
      getPosts();
      getUsers();
      getChambers();
    }, [searchParam]);

    async function getPosts(){
      setPosts([])
      setLoading(true)
      await axios.get(`http://localhost:4000/api/search/posts/${searchParam}`)
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch((err) =>{
        console.log('500 status if statement', err.message)
        setLoading(false)
      })
    }

    async function getChambers(){
      setChambers([])
      setLoading(true)
      await axios.get(`http://localhost:4000/api/search/subforums/${searchParam}`)
      .then((res) => {
        setChambers(res.data)
        setLoading(false)
      })
      .catch((err) =>{
        console.log('500 status if statement', err.message)
        setLoading(false)
      })  
    }

    async function getUsers(){
      setUsers([])
      setLoading(true)
      await axios.get(`http://localhost:4000/api/search/users/${searchParam}`)
      .then((res) => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch((err) =>{
        console.log('500 status if statement', err.message)
        setLoading(false)
      })  
      
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function joinSubforum(subforum_id) {
      axios.post(`/api/subforums/${subforum_id}/users`)
      .then(() => {
        setJoined(true)
        console.log(`Successfully joined chamber.`)
      })
      .catch(err => console.log(err))
    }
    
    function leaveSubforum(subforum_id){
      axios.delete(`/api/subforums/${subforum_id}/users/${props.user.user_id}`)
      .then(() => {
        console.log(`Left subforum # ${subforum_id}.`)
      })
      .catch(err => console.log(err))
    }
    
    function checkJoined(subforum_id){
      
    }

    return (
        <div className="Search classes.root">

            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="tabslist">
                    <Tab label="Posts" {...a11yProps(0)} />
                    <Tab label="Chambers" {...a11yProps(1)} />
                    <Tab label="Users" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <div className="content-container">

            <TabPanel value={value} index={0}>
              <div className="post-container">
                {loading === true ? <div className="loading-container"><CircularProgress/></div> : posts.length === 0 ? <div className="no-post-msg">No results found.</div>
                : posts.map((post) => (
                  <ClassicPost key={post.post_id} 
                      title={post.post_title} 
                      chamber={post.subforum_name}
                      username={post.username}
                  />
                    ))
                }
              </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <div className="chamber-container">
                {loading === true ? <div className="loading-container"><CircularProgress/></div> : chambers.length === 0 ? <div className="no-post-msg">No results found.</div>
                : chambers.map((chamber) => (
                  <div key={chamber.subforum_id} className="chamber-item">
                    <div className="img-and-title-container">
                      <div className="img-container">
                        <img src={chamber.subforum_img} className="subforum-img" />
                      </div>
                      <p className="subforum-title">{chamber.subforum_name}</p>
                    </div>
                    <div className="description">
                      <p>{chamber.description}</p>
                    </div>
                    <div className="btn-container">
                      { joined ? <button className="leave-btn" onClick={() => {leaveSubforum(chamber.subforum_id)}}>JOINED</button> : <button className="join-btn" onClick={() => {joinSubforum(chamber.subforum_id)}}>JOIN</button> }
                    </div>

                  </div>
                    ))
                }
              </div>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <div className="user-container">
                {loading === true ? <div className="loading-container"><CircularProgress/></div> : users.length === 0 ? <div className="no-post-msg">No results found.</div>
                : users.map((user) => (
                  <div key={user.user_id} className="user-item">
                    <div className="img-and-username-container">
                      <div className="img-container">
                        <img src={user.user_image} className="user-img" />
                      </div>
                      <p className="username">{user.username}</p>
                    </div>
                    <div className="description">
                    </div>
                    <div className="follow-btn-container">
                      <button className="follow-btn">FOLLOW</button>
                    </div>
                  </div>
                    ))
                }
              </div>
            </TabPanel>

            <div className='other-info-section'>
                <ul className='other-info-list'>
                    <li>Help</li>
                    <li>About</li>
                    <li>Communities</li>
                    <li>Top Posts</li>
                    <li>Terms</li>
                </ul>
            </div>

            </div>

        </div>
    )
}

export default Search;