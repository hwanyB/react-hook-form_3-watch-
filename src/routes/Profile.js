import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserProfile from "components/UserProfile";
import { authService, dbService } from "fbase";
import GetMyTweets from "components/GetMyTweets";

const Base = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px 250px 100px 250px;

  background-color: #e8f4ff;
  margin: 0 auto;
  box-sizing: border-box;
`;

export default function Profile({ userObj, refreshUser }) {
  const user = authService.currentUser;
  const [myTweets, setMyTweets] = useState([]);

  const getMyTweets = async () => {
    const myTweet = await dbService
      .collection("tweets")
      .where("creatorId", "==", user.uid)
      .get();

    const myTweetsArr = myTweet.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMyTweets(myTweetsArr);
  };

  useEffect(() => {
    getMyTweets();
  }, [myTweets]);

  return (
    <Base>
      <UserProfile refreshUser={refreshUser}></UserProfile>
      {myTweets.map((myTweet) => (
        <GetMyTweets key={myTweet.id} myTweetsObj={myTweet} />
      ))}
    </Base>
  );
}
