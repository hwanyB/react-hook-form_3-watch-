import React, { useState } from 'react';
import styled from 'styled-components';
import {HiPhotograph} from 'react-icons/hi';
import { dbService } from 'fbase';
import GetTwitsContainer from './GetTwitsContainer';

const Base = styled.div`
    width: 100%;
`;
const TwittingBase = styled.div`
  width: 100%;
  height: 250px;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 30px;
  /* display: flex; */
  /* justify-content: space-between; */
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;
`;
const ProfileImgWrapper = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin-right: 50px;
`;
const ProfileImg = styled.img`
    height: 50px;
`;
const TwittingForm = styled.form`
    /* width: 40%; */
    position: relative;
    /* margin-left: -250px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const TwittingInput = styled.input`
    border: none;
    outline: none;
    padding: 10px;
    font-size: 20px;
    font-weight: 300;
`;
const AddPhotoIcon = styled.div`
`;
const TweetBtn = styled.button`
  height: 35px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: #2b9cff;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 0 20px;
  align-self: flex-end;

`;


export default function TwittingContainer({ userObj, tweetObj, setTweet }) {

  const onTweetBtnClick = async (event) => {
    await dbService.collection("tweets").add({
      text: tweetObj,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <Base>
      <TwittingBase>
        <ProfileImgWrapper>
          <ProfileImg src='profileimg.jpg' />
        </ProfileImgWrapper>
        <TwittingForm>
          <TwittingInput
            value={tweetObj}
            onChange={onChange}
            type='text'
            placeholder="What's happening?"
            maxLength={120}
          />
          <AddPhotoIcon>
            <HiPhotograph color='#2B9CFF' size={30} />
          </AddPhotoIcon>
        </TwittingForm>
        <TweetBtn onClick={onTweetBtnClick}>Tweet</TweetBtn>
      </TwittingBase>
    </Base>
  );
}
