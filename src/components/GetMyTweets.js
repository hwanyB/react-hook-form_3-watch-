import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";

import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { CgClose } from "react-icons/cg";

const MyTweetsWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 30px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 8fr 1fr;
  min-height: ${(props) => props.isEditing && "300px"};

  @media screen and (max-width: 1200px) {
  }
`;
const Tweet = styled.div`
  margin: auto 0;
`;

const TweetPhoto = styled.img`
  width: 70%;
  border-radius: 30px;
  margin-bottom: 20px;
  @media screen and (max-width: 800px) {
    width: 80%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
const TweetTxt = styled.p`
  color: #000;
  font-weight: 300;
  text-align: left;
  font-size: 20px;
  word-wrap: break-word;
`;
const UpdateWrapper = styled.div`
  display: flex;
  justify-self: end;
  margin-left: 20px;
`;
const EditTweet = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
const DeletTweet = styled.div`
  cursor: pointer;
`;

const EditTweetForm = styled.form`
  width: 100%;
`;
const EditInput = styled.textarea`
  font-family: "Noto Sans KR", sans-serif;
  resize: none;

  border: 1px solid #2b9cff;
  box-sizing: border-box;
  outline: none;
  padding: 10px;
  font-size: 20px;
  font-weight: 300;
  border-radius: 30px;
  width: 100%;
  height: 70%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
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
  padding: 0 30px;
  margin-left: 20px;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export default function GetMyTweets({ myTweetsObj }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweetValue, setNewTweetValue] = useState(myTweetsObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      await dbService.doc(`tweets/${myTweetsObj.id}`).delete();
      await storageService.refFromURL(myTweetsObj.photoAttachmentUrl).delete();
    }
  };
  const toggleEditing = () => setIsEditing((prev) => !prev);
  const onEditSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${myTweetsObj.id}`).update({
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
    <MyTweetsWrapper isEditing={isEditing}>
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
      ) : myTweetsObj.photoAttachmentUrl ? (
        <Tweet>
          <TweetPhoto
            src={myTweetsObj.photoAttachmentUrl}
            alt={myTweetsObj.text}
          />
          <TweetTxt>{myTweetsObj.text}</TweetTxt>
        </Tweet>
      ) : (
        <Tweet>
          <TweetTxt>{myTweetsObj.text}</TweetTxt>
        </Tweet>
      )}
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
    </MyTweetsWrapper>
  );
}
