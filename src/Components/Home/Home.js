import React, { useEffect } from "react";
import "./Home.scss";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import HomeDashUser from "./HomeDashUser/HomeDashUser";
import HomeDashNoUser from "./HomeDashNoUser/HomeDashNoUser";

function Home(props) {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  return (
    <div className={"home-container"}>
      {props.isLoggedIn ? <HomeDashUser /> : <HomeDashNoUser />}
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser })(Home);
