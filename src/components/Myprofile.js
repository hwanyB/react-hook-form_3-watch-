import React, { useState } from 'react';
import styled from "styled-components";

const Base = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  width: 100%;
`;
const ProfieWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  padding: 20px;
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
`;
const ProfileImg = styled.img``;
const DisplayName = styled.h1`
    font-weight: 900;
    font-size: 50px;
    margin-top: 50px;
`;
const Email = styled.p`
    font-weight: 300;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 50px;
`;
const EditProfileBtn = styled.button`
  height: 35px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: #2b9cff;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  padding: 0 30px;
`;

export default function Myprofile({ newDisplayName, userObj }) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const onEditBtn = () => {
      setIsEditingProfile(true);
  }

  return (
    <Base>
        {
            isEditingProfile ? (
                <ProfieWrapper>
                    수정듕
                </ProfieWrapper>
            ) : (
                <ProfieWrapper>
            <ProfileImgWrapper>
                <ProfileImg />
            </ProfileImgWrapper>
            <DisplayName>{newDisplayName}</DisplayName>
            <Email>{userObj.email}</Email>
            <EditProfileBtn onClick={onEditBtn}>Edit Profile</EditProfileBtn>
        </ProfieWrapper>
            )
        }
    </Base>

  )
}
