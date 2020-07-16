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

    const getPosts = () => {
        
    }

    const getChambers = () => {

    }

    const getUsers = () => {

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