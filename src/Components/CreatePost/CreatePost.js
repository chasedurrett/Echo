import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChooseSubforumDropdown from './ChooseSubforumDropdown/ChooseSubforumDropdown'

export default function CreatePost(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="create-post-container">
      <div className="post-form-container">
        <div className="subforum-drowdown-container">
            <ChooseSubforumDropdown/>
        </div>
        <div className="post-form-body">
          <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.tabBar}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Text" {...a11yProps(0)} />
                <Tab label="Image & Video" {...a11yProps(1)} />
                <Tab label="Link" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
              <TabPanel value={value} index={0} dir={theme.direction}>
                Text
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                Image & Video
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                Link
              </TabPanel>
          </div>
        </div>
      </div>
      <div className="post-info-container">
          Post rules and subreddit info goes here
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 800,
    height: 500,
    borderRadius: 8
  },
  tabBar: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    boxShadow: 'none',
    fontFamily: 'IBM Plex Sans'
  }
}));
