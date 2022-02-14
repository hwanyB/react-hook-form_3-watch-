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
`;
const ProfileImg = styled.img`
  max-width: 350px;
  cursor: ${(props) => props.isEditingProfile === true && "pointer"};
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
`;
const Email = styled.p`
  font-weight: 300;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 50px;
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
`;

export default function UserProfile({ refreshUser }) {
  const user = authService.currentUser;

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSaveBtnClick = async () => {
    if (user.displayName !== newDisplayName) {
      await user.updateProfile({
        displayName: newDisplayName,
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
            />
            <ProfileImg
              src={user.photoURL ? user.photoURL : `profileimg.png`}
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
              src={user.photoURL ? user.photoURL : `profileimg.png`}
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
