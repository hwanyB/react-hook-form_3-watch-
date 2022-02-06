import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';


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
  display: flex;
  justify-content: space-between;
`;
const ProfileImgWrapper = styled.div`
    
`;
const ProfileImg = styled.img``;
const UserName = styled.div``;
const Tweet = styled.div`
    font-weight: 300;
    text-align: left;
`;
const UpdateWrapper = styled.div`
    display: flex;
`;
const EditTweet = styled.div`
    margin-right: 10px;
`;
const DeletTweet = styled.div``;

export default function GetTwitsContainer({ useObj }) {
    const [tweets, setTweets] = useState([]);
    // const getTweets = async () => {
    //     const dbTweets = await dbService.collection("tweets").get();
    //     dbTweets.forEach((document) => {
    //         const tweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setTweets((prev) => [tweetObject, ...prev]);
    //     });
    // };
    useEffect(() => {
        dbService.collection('tweets').onSnapshot((snapshot) => {
            const tweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArr);
        })
    }, []);
  return (
    <Base>
      {tweets.map((tweet) => (
        <TweetWrapper key={tweet.id}>
          <ProfileImgWrapper>
            <ProfileImg />
            <UserName></UserName>
          </ProfileImgWrapper>
          <Tweet>{tweet.text}</Tweet>
          <UpdateWrapper>
            <EditTweet>
                <MdModeEditOutline color='#2B9CFF' size={25} />
            </EditTweet>
            <DeletTweet>
                <MdDelete color='#2B9CFF' size={25} />
            </DeletTweet>
          </UpdateWrapper>
        </TweetWrapper>
      ))}
    </Base>
  );
}
