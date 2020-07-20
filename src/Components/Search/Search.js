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
    const classes = useStyles();

    useEffect( () => {
      async function grabResults() {
        await getPosts();
        await getChambers();
        await getUsers();
      }
      
      grabResults();
      console.log(posts)
      console.log(chambers)
      console.log(users)
    }, []);

    const location = useLocation();
    console.log(location.params);
    let searchParam = location.params;
    console.log(props);

    // propsSearch = (props) => {
    // if(!location.params){
    //   let searchParam = props.search
    //   }
    // }
    
    function getPosts(){
        axios.get(`http://localhost:4000/api/search/posts/${searchParam}`)
        .then((res) => {
          setPosts(res.data);
        })
    }

    function getChambers(){
      axios.get(`http://localhost:4000/api/search/subforums/${searchParam}`)
      .then((res) => {
        setChambers(res.data)
      })
    }

    function getUsers(){
      axios.get(`http://localhost:4000/api/search/users/${searchParam}`)
      .then((res) => {
        setUsers(res.data)
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
            Posts
            </TabPanel>

            <TabPanel value={value} index={1}>
            Chambers
            </TabPanel>

            <TabPanel value={value} index={2}>
            Users
            </TabPanel>

        </div>
    )
}

export default Search;