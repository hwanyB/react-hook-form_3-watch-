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
  @media screen and (max-width: 1500px) {
    padding: 150px 120px;
  }
  @media screen and (max-width: 800px) {
    padding: 100px 50px;
  }
  @media screen and (max-width: 500px) {
    padding: 100px 20px;
  }
`;

export default function Profile({ userObj, refreshUser }) {
  const user = authService.currentUser;
  const [myTweets, setMyTweets] = useState([]);



  useEffect(() => {
    let isMounted = true;

    const getMyTweets = async () => {
      const myTweet = await dbService
        .collection("tweets")
        .where("creatorId", "==", user.uid)
        .get();

      const myTweetsArr = myTweet.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (isMounted) {
        setMyTweets(myTweetsArr);
      }
    };

    getMyTweets();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Base>
      <UserProfile refreshUser={refreshUser}></UserProfile>
      {myTweets.map((myTweet) => (
        <GetMyTweets key={myTweet.id} myTweetsObj={myTweet} />
      ))}
    </Base>
  );
}
