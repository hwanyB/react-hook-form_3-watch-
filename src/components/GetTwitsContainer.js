import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { CgClose } from "react-icons/cg";

const TweetWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 30px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  font-family: "Noto Sans KR", sans-serif;
`;
const ProfileImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: contain;
  margin-right: 50px;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
`;
const UserName = styled.p``;
const Tweet = styled.div`
  margin: auto 0;
`;

const TweetPhoto = styled.img`
  width: 50%;
  border-radius: 30px;
  margin-bottom: 20px;
`;
const TweetTxt = styled.p`
  color: #000;
  font-weight: 300;
  text-align: left;
  font-size: 20px;
`;

const UpdateWrapper = styled.div`
  display: flex;
  justify-self: end;
`;
const EditTweet = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
const DeletTweet = styled.div`
  cursor: pointer;
`;

const EditTweetForm = styled.form``;
const EditInput = styled.input`
  border: 1px solid #2b9cff;
  outline: none;
  padding: 10px;
  font-size: 20px;
  font-weight: 300;
  border-radius: 50px;
`;
const EditSubmit = styled.input`
  height: 35px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: #2b9cff;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 0 20px;
  margin-left: 20px;
`;

export default function GetTwitsContainer({ userObj, tweetObj }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweetValue, setNewTweetValue] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.photoAttachmentUrl).delete();
    }
  };
  const toggleEditing = () => setIsEditing((prev) => !prev);
  const onEditSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweetValue,
    });
    setIsEditing(false);
  };
  const onEditChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweetValue(value);
  };
  return (
    <TweetWrapper>
      <ProfileImgWrapper>
        <ProfileImg
          src={userObj.photoUrl ? userObj.photoUrl : "profileimg.png"}
        />
        <UserName></UserName>
      </ProfileImgWrapper>
      {/* {
          tweetObj.photoAttachmentUrl && (
              <Photo src={tweetObj.photoAttachmentUrl} alt={tweetObj.text} />
          )
      } */}
      {isEditing ? (
        <EditTweetForm onSubmit={onEditSubmit}>
          <EditInput
            type='text'
            value={newTweetValue}
            onChange={onEditChange}
            required
            autoFocus
          />
          <EditSubmit type='submit' value='Update Tweet' />
        </EditTweetForm>
      ) : tweetObj.photoAttachmentUrl ? (
        <Tweet>
          <TweetPhoto src={tweetObj.photoAttachmentUrl} alt={tweetObj.text} />
          <TweetTxt>{tweetObj.text}</TweetTxt>
        </Tweet>
      ) : (
        <Tweet>
          <TweetTxt>{tweetObj.text}</TweetTxt>
        </Tweet>
      )}
      {tweetObj.creatorId === userObj.uid && (
        <UpdateWrapper>
          <EditTweet onClick={toggleEditing}>
            {isEditing ? (
              <CgClose color='#2B9CFF' size={25} />
            ) : (
              <MdModeEditOutline color='#2B9CFF' size={25} />
            )}
          </EditTweet>
          <DeletTweet onClick={onDeleteClick}>
            <MdDelete color='#2B9CFF' size={25} />
          </DeletTweet>
        </UpdateWrapper>
      )}
    </TweetWrapper>
  );
}
