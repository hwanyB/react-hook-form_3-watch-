import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import styled from "styled-components";
import Myprofile from 'components/Myprofile';

const Base = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px 250px 0 250px;
  background-color: #e8f4ff;
  margin: 0 auto;
  box-sizing: border-box;
`;
const EditProfileForm = styled.form`

`;
const NameInput = styled.input`

`;

const SubmitInput = styled.input`

`;


export default function Profile({ userObj }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName ? newDisplayName : userObj.email)
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt")
      .get();
  }
  useEffect(() => {
    getMyTweets();
  }, [])


  const onChange = (event) => {
    const {
      target:{ value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName){
      const response = await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  }
  return (
    <Base>
      <Myprofile newDisplayName={newDisplayName} userObj={userObj} />
      <EditProfileForm onSubmit={onSubmit}>
        <NameInput
          type='text'
          placeholder='name'
          onChange={onChange}
          value={newDisplayName}
          autoFocus
        />
        <SubmitInput type='submit' value='Update Profile' />
      </EditProfileForm>
    </Base>
  );
}
