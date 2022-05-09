import React, { useState } from "react";
import styled from "styled-components";
import { HiPhotograph } from "react-icons/hi";
import { dbService, storageService } from "fbase";
import { CgClose } from "react-icons/cg";
import { v4 as uuid4 } from "uuid";
import { Button } from "./AuthContainer";

const Base = styled.div`
  width: 100%;
`;
const TwittingBase = styled.div`
  position: relative;
  width: 100%;
  /* height: 250px; */
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
  @media screen and (max-width: 800px) {
    justify-content: space-between;
  }
`;
const ProfileImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin-right: 50px;
  @media screen and (max-width: 800px) {
    margin-right: 20px;
  }
`;
const ProfileImg = styled.img`
  height: 50px;
`;
const TwittingForm = styled.form`
  width: 100%;
  min-height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-overflow: clip;
  white-space: normal;
  word-wrap: break-word;
`;

const PrevieWrapper = styled.div`
  display: flex;
`;

const PhotoPreview = styled.img`
  width: 50px;
`;
const CancleAdd = styled.div`
  cursor: pointer;
  margin-left: 20px;
  line-height: 43px;
`;
const TwittingInput = styled.textarea`
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: 300;
  height: 100%;
  font-family: "Noto Sans KR", sans-serif;
  resize: none;
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
  @media screen and (max-width: 650px) {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  
`;

export default function TwittingContainer({ userObj, tweetObj, setTweet }) {
  const [photoAttachment, setPhotoAttachment] = useState("");

  const onTweetBtnClick = async (event) => {
    let photoAttachmentUrl = "";
    if (photoAttachment !== "") {
      const photoAttachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuid4()}`);
      const response = await photoAttachmentRef.putString(
        photoAttachment,
        "data_url"
      );
      photoAttachmentUrl = await response.ref.getDownloadURL();
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

  const onAddPhotoChange = (event) => {
    const {
      target: { files },
    } = event;
    const Photos = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setPhotoAttachment(result);
    };
    reader.readAsDataURL(Photos);
  };

  const onAddPhotoClick = () => {
    document.getElementById("photoInput").click();
  };

  const onCancleAddClick = () => {
    setPhotoAttachment(null);
  };

  return (
    <Base>
      <TwittingBase>
        <ProfileImgWrapper>
          <ProfileImg src={`${process.env.PUBLIC_URL}/profileimg.png`} />
        </ProfileImgWrapper>
        <TwittingForm>
          {photoAttachment && (
            <PrevieWrapper>
              <PhotoPreview src={photoAttachment} />
              <CancleAdd onClick={onCancleAddClick}>
                <CgClose color='#2B9CFF' size={25} />
              </CancleAdd>
            </PrevieWrapper>
          )}

          <TwittingInput
            value={tweetObj}
            onChange={onChange}
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
