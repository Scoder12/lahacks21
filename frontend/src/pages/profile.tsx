import React, { useRef, useState } from "react";
// import Avatar from "../assets/avatar.png";

const profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [occupation, setOccupation] = useState("");
  const [country, setCountry] = useState("");
  const [skills, setSkills] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [profileImg, setProfileImg] = useState<File | undefined | null>();

  const inputImg = useRef<HTMLInputElement>(null);

  const handleInputImgClick = () => {
    if (!inputImg.current) return;
    inputImg.current.click();
  };

  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setProfileImg(fileList[0]);
  };

  return (
    <div className="profile">
      <h2 className="header">Customize your profile</h2>
      <form>
        <div className="all-inputs-cont">
          <div className="inputs-cont">
            <div className="small-inputs-cont">
              <input
                placeholder="First"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                placeholder="Last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                placeholder="University"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
              <input
                placeholder="Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
              <input
                placeholder="Occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
            <input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              placeholder="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <input
              placeholder="Profile URL"
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div className="input-img-cont" onClick={handleInputImgClick}>
              <img
                className="profile-img"
                src="https://motivateagirl.org/wp-content/uploads/2018/03/human.png"
                alt="Profile"
              />
              <p className="upload-img">Upload Photo</p>
            </div>
            <input
              className="input-img"
              ref={inputImg}
              type="file"
              multiple={false}
              onChange={handleProfileImgChange}
            />
          </div>
        </div>
        <button className="submit-btn" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default profile;
