import React, {useEffect} from 'react';
import './Home.scss';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

function Home(props){

    return(
        <div className={'home-container'}>
            Home Page
            {props.isLoggedIn ? <div>username is {props.user.username}</div> : ''}
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(Home);