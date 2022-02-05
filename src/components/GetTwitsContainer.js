import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const Base = styled.div`
  font-family: "Noto Sans KR", sans-serif;

`;
const TweetWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 30px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;
const ProfileImgWrapper = styled.div``;
const ProfileImg = styled.img``;
const UserName = styled.div``;
const Tweet = styled.div`
    font-weight: 300;
    text-align: left;
`;

export default function GetTwitsContainer() {
    const [tweets, setTweets] = useState([]);
    const getTweets = async () => {
        const dbTweets = await dbService.collection("tweets").get();
        dbTweets.forEach((document) => {
            const tweetObject = {
                ...document.data(),
                id: document.id,
            };
            setTweets((prev) => [tweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getTweets();
    }, []);
  return (
    <Base>
      {tweets.map((tweet) => (
        <TweetWrapper key={tweet.id}>
          <ProfileImgWrapper>
            <ProfileImg />
          </ProfileImgWrapper>
          <UserName></UserName>
          <Tweet>{tweet.tweet}</Tweet>
        </TweetWrapper>
      ))}
    </Base>
  );
}
