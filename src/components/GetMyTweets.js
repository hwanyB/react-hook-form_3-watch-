import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";

import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { CgClose } from "react-icons/cg";

const MyTweetsWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 30px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 8fr 1fr;
`;
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
  font-size: 20px;
  text-align: left;
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
    <MyTweetsWrapper>
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
