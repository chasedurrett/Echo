import React, { useState, useEffect } from 'react'
import axios from 'axios'


const HomeDashNoUser = () => {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = () => {
        axios.get('/api/subforums/posts/no-user')
        .then(res => {
            if(res.status === 200){
                setAllPosts(res.data)
            }
        })
        .catch(err => console.log(err))
    }



    console.log(allPosts)
    return(
        <div className="home-dashboard-container">
            Dash with no user logged in

        </div>
    )
}

export default HomeDashNoUser