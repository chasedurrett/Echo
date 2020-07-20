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
            <Typography>{children}</Typography>
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

    const classes = useStyles();

    const location = useLocation();
    console.log(location.search);
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
        console.log(res.data)
        setPosts(res.data);
        setLoading(false)
      })
    }

    async function getChambers(){
      setChambers([])
      setLoading(true)
      await axios.get(`http://localhost:4000/api/search/subforums/${searchParam}`)
      .then((res) => {
        
        if(res.status === 200){
          setChambers(res.data)
          setLoading(false)
        } 
 
        console.log(res.data)
        setChambers(res.data)
      })
    }

    async function getUsers(){
      setUsers([])
      console.log('getUsers hit')
      setLoading(true)
      await axios.get(`http://localhost:4000/api/search/users/${searchParam}`)
      .then((res) => {
        console.log(res.data)
        setUsers(res.data)
        setLoading(false)
      })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="Search classes.root">

            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="tabslist">
                    <Tab label="Posts" {...a11yProps(0)} />
                    <Tab label="Chambers" {...a11yProps(1)} />
                    <Tab label="Users" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
            <div>
            {loading === true ? <CircularProgress /> : posts.length === 0 ? <div>No results found.</div>
            : posts.map((post) => (
            <div>{post.post_title}</div>
            ))
            }
            </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
            {loading === true ? <CircularProgress /> : chambers.length === 0 ? <div>No results found.</div>
            : chambers.map((chamber) => (
            <div>{chamber.subforum_name}</div>
            ))
            }
            </TabPanel>

            <TabPanel value={value} index={2}>
            <div>
            {loading === true ? <CircularProgress /> : users.length === 0 ? <div>No results found.</div>
            : users.map((user) => (
            <div>{user.username}</div>
            ))
            }
            </div>
            </TabPanel>

        </div>
    )
}

export default Search;