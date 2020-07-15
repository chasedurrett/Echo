import React, {useEffect} from 'react';
import './Home.scss';
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'

function Home(props){

    useEffect(() => {
        console.log('use effect hit')
        props.getUser()
      });

    return(
        <div className={'home-container'}>
            Home Page
            
        </div>
    )
}


export default connect(null, {getUser})(Home);