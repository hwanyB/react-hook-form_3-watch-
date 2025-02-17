import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TwittingContainer from "components/TwittingContainer";
import GetTwitsContainer from "components/GetTwitsContainer";
import { dbService } from "fbase";

const Base = styled.div`
  width: 100%;
  font-family: "Noto Sans KR", sans-serif;
  min-height: 100vh;
  padding: 100px 250px;
  background-color: #e8f4ff;
  margin: 0 auto;
  box-sizing: border-box;
  @media screen and (max-width: 1500px) {
    padding: 150px 120px;
  }
  @media screen and (max-width: 800px) {
    padding: 120px 50px;
  }
  @media screen and (max-width: 500px) {
    padding: 100px 20px;
  }
`;

export default function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const unsubscribe = dbService.collection("tweets").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
    });
    return () => unsubscribe();
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
