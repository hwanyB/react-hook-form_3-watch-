import React, { useState } from 'react';
import styled from 'styled-components';
import {HiPhotograph} from 'react-icons/hi';
import { dbService, storageService } from 'fbase';
import { CgClose } from 'react-icons/cg';
import { v4 as uuid4} from "uuid";
import { Button } from './AuthContainer';


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

const PrevieWrapper = styled.div`
    display: flex;
`;

const PhotoPreview = styled.img`
    width: 50px;
`;
const CacleAdd = styled.div`
    cursor: pointer;
    margin-left: 20px;
`;
const TwittingInput = styled.input`
    border: none;
    outline: none;
    padding: 10px;
    font-size: 20px;
    font-weight: 300;
`;
const AddPhotoIcon = styled.div`
    cursor: pointer;
`;
const PhotoInput = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    display: none;
`;
const TweetBtn = styled(Button)`
  align-self: flex-end;
`;


export default function TwittingContainer({ userObj, tweetObj, setTweet }) {
    const [photoAttachment, setPhotoAttachment] = useState("");

  const onTweetBtnClick = async (event) => {
      let photoAttachmentUrl = "";
      if(photoAttachment !== ""){
        const photoAttachmentRef = storageService.ref().child(`${userObj.uid}/${uuid4()}`);
        const response = await photoAttachmentRef.putString(photoAttachment, "data_url");
        photoAttachmentUrl =  await response.ref.getDownloadURL();
    }
    const tweet = {
      text: tweetObj,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      photoAttachmentUrl,
    };
      await dbService.collection("tweets").add(tweet);
    setTweet("");
    setPhotoAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onAddPhotoChange =  (event) => {
    const {
        target : { files },
    } = event;
    const Photos = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setPhotoAttachment(result);
    }
    reader.readAsDataURL(Photos);
  }

  const onAddPhotoClick = () => {
      document.getElementById("photoInput").click();
  }

  const onCancleAddClick = () => {
      setPhotoAttachment(null);
  }

  return (
    <Base>
      <TwittingBase>
        <ProfileImgWrapper>
          <ProfileImg src='profileimg.png' />
        </ProfileImgWrapper>
        <TwittingForm>
          {photoAttachment && (
            <PrevieWrapper>
              <PhotoPreview src={photoAttachment} />
              <CacleAdd onClick={onCancleAddClick}>
                <CgClose color='#2B9CFF' size={25} />
              </CacleAdd>
            </PrevieWrapper>
          )}

          <TwittingInput
            value={tweetObj}
            onChange={onChange}
            type='text'
            placeholder="What's happening?"
            maxLength={120}
          />
          <AddPhotoIcon>
            <PhotoInput
              type='file'
              accept='image/*'
              id='photoInput'
              onChange={onAddPhotoChange}
            />
            <HiPhotograph onClick={onAddPhotoClick} color='#2B9CFF' size={30} />
          </AddPhotoIcon>
        </TwittingForm>
        <TweetBtn onClick={onTweetBtnClick}>Tweet</TweetBtn>
      </TwittingBase>
    </Base>
  );
}
