import React, {useEffect} from 'react';
import './Home.scss';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

function Home(props){

    useEffect(() => {
        console.log('use effect to grab curent user hit')
        props.getUser()
      },[]);


    return(
        <div className={'home-container'}>
            Home Page
            {props.isLoggedIn ? <div>username is {props.user.username}</div> : ''}
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(Home);