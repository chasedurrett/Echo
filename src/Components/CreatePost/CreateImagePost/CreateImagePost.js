import React, { useState, useEffect } from "react";
import "./CreateImagePost.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { connect } from "react-redux";
import { MdClose } from "react-icons/md";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";

function CreateImagePost(props) {
  const [loading, setLoading] = useState(false);
  const [user_banner, setUserBanner] = useState("");
  const [user_image, setUserImage] = useState("");
  const [inputVal, setInputVal] = useState({
    post_title: "",
    post_content: "",
  });
  const [uploadFormOpen, setUploadFormOpen] = useState(false);
  const [bannerUpload, setBannerUpload] = useState(false);
  const [profileUpload, setProfileUpload] = useState(false);
  const classes = useStyles();

  // Image Preview Handler
  const handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];
    props.setImgPreview(image_as_base64);
    props.setImgFile(image_as_files);
  };

  // Image/File Submit Handler
  //   const handleSubmitFile = async () => {
  //     setLoading(true);
  //     if (img_file !== null) {
  //       let formData = new FormData();
  //       formData.append("upl", img_file);
  //       await axios
  //         .post("/upload", formData, {
  //           headers: {
  //             "Content-type": "multipart/form-data",
  //           },
  //         })
  //         .then((res) => {
  //           if (props.bannerUpload) {
  //             setUserBanner(res.data);
  //           } else if (props.profileUpload) {
  //             setUserImage(res.data);
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   };

  return (
    <div>
      <div className="">
        <div className="">
          {loading ? (
            <div className="">
              <LinearProgress />
              Uploading your {props.bannerUpload ? `` : ``} image now!
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              {props.bannerUpload ? (
                <div className="">Upload your Banner image</div>
              ) : null}
              {props.profileUpload ? (
                <div className="">Upload your Profile image</div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  minHeight: 200,
                }}
                className=""
              >
                {props.img_preview === "" ? (
                  ""
                ) : (
                  <img
                    style={{ height: 200, width: 300 }}
                    className=""
                    src={props.img_preview}
                    alt=""
                  />
                )}
              </div>
              <div className="">
                <input type="file" onChange={handleImagePreview} className="" />
                {/*<button onClick={handleSubmitFile} className="">
                  Post Image
                </button>*/}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateImagePost;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 800,
    height: 500,
    borderRadius: 8,
    boxShadow: "6px 6px 6px lightgrey",
    indicatorColor: "#0079d3",
    textColor: "#0079d3",
  },
  textArea: {
    width: "100%",
  },
}));
