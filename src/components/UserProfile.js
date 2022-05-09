import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./AuthContainer";
import { authService } from "fbase";

const Base = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  width: 100%;
`;
const ProfieWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 30px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;
  margin-top: 150px;
  @media screen and (max-width: 800px) {
    margin-top: 100px;
  }
`;

const ProfileImgWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: gray;
  margin: 0 auto;
  margin-top: -150px;
  object-fit: cover;
  object-position: center center;
  overflow: hidden;
  @media screen and (max-width: 800px) {
    width: 200px;
    height: 200px;
    margin-top: -150px;
  }
`;
const ProfileImg = styled.img`
  max-width: 350px;
  cursor: ${(props) => props.isEditingProfile === true && "pointer"};
  @media screen and (max-width: 800px) {
    width: 200px;
    height: 200px;
  }
`;
const AddProfileImgInput = styled.input`
  display: none;
`;
const DisplayName = styled.h1`
  font-weight: 900;
  font-size: 50px;
  margin-top: 50px;
  height: 80px;
  line-height: 80px;
  @media screen and (max-width: 800px) {
    font-size: 35px;
    line-height: 35px;
    height: 50px;
    margin-top: 30px;
  }
`;
const Email = styled.p`
  font-weight: 300;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 50px;
  @media screen and (max-width: 800px) {
    font-size: 15px;
    margin-bottom: 30px;
  }
`;
const EditProfileBtn = styled(Button)``;
const SaveBtn = styled(Button)``;
const CancleEditBtn = styled(Button)`
  background-color: #c8c8c8;
  margin-left: 10px;
`;
const NameInput = styled.input`
  font-family: "Noto Sans KR", sans-serif;
  display: block;
  margin: 0 auto;
  margin-top: 50px;
  font-weight: 900;
  font-size: 50px;
  border: 1px solid #2b9cff;
  outline: none;
  border-radius: 50px;
  text-align: center;
  padding: 0;
  height: 80px;
  line-height: 80px;
  width: 100%;
  @media screen and (max-width: 800px) {
    font-size: 35px;
    line-height: 35px;
    height: 50px;
    margin-top: 30px;
  }
`;

export default function UserProfile({ refreshUser }) {
  const user = authService.currentUser;

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const [newPhoto, setNewPhoto] = useState(user.photoURL);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onUploadPhoto = async (e) => {
    const {
      target: { files },
    } = e;
    const file = files[0];
    const reader = new FileReader();
    if(file) {
      const blob = new Blob([file], { type: file.type });
      reader.readAsDataURL(blob);
    
      // reader.onload = () => {
      //   const result = reader.result;
      //   setNewPhoto(result);
      // }
    }
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setNewPhoto(result);
    };
  }
  const onSaveBtnClick = async () => {
    if (user.displayName !== newDisplayName) {
      await user.updateProfile({
        displayName: newDisplayName,
        photoURL: newPhoto
      });
    }
    refreshUser();
    setIsEditingProfile(false);
  };

  const onEditBtnClick = () => {
    setIsEditingProfile(true);
  };
  const onCloseBtnClick = () => {
    setIsEditingProfile(false);
  };
  const onAddProfileImgClick = () => {
    if (isEditingProfile) {
      document.getElementById("AddProfileImg").click();
    }
  };

  return (
    <Base>
      {isEditingProfile ? (
        <ProfieWrapper>
          <ProfileImgWrapper>
            <AddProfileImgInput
              type='file'
              accept='image/*'
              id='AddProfileImg'
              onChange={onUploadPhoto}
            />
            <ProfileImg
              src={user.photoURL ? newPhoto : `${process.env.PUBLIC_URL}/profileimg.png` }
              onClick={onAddProfileImgClick}
              isEditingProfile={isEditingProfile}
            />
          </ProfileImgWrapper>
          <NameInput
            type='text'
            placeholder='name'
            onChange={onChange}
            value={newDisplayName}
            autoFocus
          />
          <Email>{user.email}</Email>

          <SaveBtn onClick={onSaveBtnClick}>Save</SaveBtn>
          <CancleEditBtn onClick={onCloseBtnClick}>Cancel</CancleEditBtn>
        </ProfieWrapper>
      ) : (
        <ProfieWrapper>
          <ProfileImgWrapper>
            <ProfileImg
              src={user.photoURL ? user.photoURL : `${process.env.PUBLIC_URL}/profileimg.png`}
            />
          </ProfileImgWrapper>
          <DisplayName>
            {user.displayName ? user.displayName : user.email}
          </DisplayName>
          <Email>{user.email}</Email>
          <EditProfileBtn onClick={onEditBtnClick}>Edit Profile</EditProfileBtn>
        </ProfieWrapper>
      )}
    </Base>
  );
}
