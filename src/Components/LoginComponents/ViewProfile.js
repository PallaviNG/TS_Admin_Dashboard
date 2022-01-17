import React,{useState} from "react";
import { uploadProfile } from "../../Service/adminService";
import profilePhoto from "../Images/user-1.png";

function ViewProfile({ user }) {
  let [pFile, setPFile] = useState('');

  let onFileUpload = (event) => {
    let files = event.target.files[0];
    console.warn("Data file", files);

    let sendData = {
      myFile:event.target.files[0]
    };

    uploadProfile("upload-profile-pic",sendData).then((result) => {
      if(result===undefined) return false;
      console.log(result);
    });
    // let reader = new FileReader();
    // reader.readAsDataURL(files);
    // reader.onload = (e) => {
    //   console.warn(e.target.result);
    // };

    let endPoint = "upload-profile-image";
    const formData = {
      profilePic: event.target.result,
    };
    // return post(endPoint,formData)
    // .then(response => console.warn("result",response))
  };
  return (
    <div className="content">
      <div className="formComponent flex justify-content-center">
        <div className="profileContainer">
          <div className="profileHeader">
            <img src={profilePhoto} />
            <span className="upload_image" title="Change Profile Photo">
              <label for="profile_pic">
                <i className="fa fa-camera" aria-hidden="true"></i>
              </label>
              <input
                type="file"
                name="profile_pic"
                id="profile_pic"
                onChange={(event) => onFileUpload(event)}
              />
            </span>
          </div>
          <div className="profileBody ">
            <div>
              <label>Name</label>
              <p>{user.admin_name}</p>
            </div>
            <div>
              <label>Role</label>
              <p>{user.admin_role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
