import React from 'react';
import './Home.scss';

function Home(){

    useEffect(() => {
        console.log('use effect to grab curent user hit')
        props.getUser()
      },);

    return(
        <div className={'home-container'}>
            Home Page
            
        </div>
    )
}

export default Home;