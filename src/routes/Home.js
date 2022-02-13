import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TwittingContainer from "components/TwittingContainer";
import GetTwitsContainer from "components/GetTwitsContainer";
import { dbService } from "fbase";

const Base = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px 250px 100px 250px;
  background-color: #e8f4ff;
  margin: 0 auto;
  box-sizing: border-box;
`;

export default function Home({ userObj }) {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
      dbService.collection('tweets').onSnapshot((snapshot) => {
          const tweetArr = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
          setTweets(tweetArr);
      });
  }, []);


  return (
    <Base>
      <TwittingContainer
        userObj={userObj}
        tweetObj={tweet}
        setTweet={setTweet}
      />
      {tweets.map((tweet) => (
        <GetTwitsContainer
          key={tweet.id}
          userObj={userObj}
          tweetObj={tweet}
          setTweet={setTweet}
        />
      ))}
    </Base>
  );
}
