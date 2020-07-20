import react, { useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'

const TopCommunitiesCard = () => {

  const [topCommunties, setTopCommunities] = useState([])

  const getTopCommunties = () => {
    axios.get('/api/subforums/')
      .then(res => {
        if (res.status === 200) {
          setTopCommunities(res.data)
        }
      })
  }

  const topCommuntiesMap = topCommunties.map(e => {
    return (
      <div>
        <div>
          {e.subforum_name}
        </div>
        <div>

        </div>
      </div>
    )
  })
  return <div>top TopCommunitiesCard</div>;
};

export default TopCommunitiesCard;
