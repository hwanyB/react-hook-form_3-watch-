import React, { useEffect, useState } from 'react'
import { authService, firebaseInstance } from 'fbase';
import styled, { keyframes } from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

const authWrapperFade = keyframes`
  0% {
    display: none;
  }
  100% {
    display: block;
  }
`;

const Base = styled.div`
    margin: 0;
    padding: 0;
    width: 50%;
`;

const AuthWrapper = styled.div`
  width: 100%;
  height: 100vh;
  animation: ${authWrapperFade} 1.8s 5s forwards;
  margin: 0;
  padding: 30px 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;
const TopLogo = styled.img`
  width: 36px;
`;
const GreetingWrapper = styled.div`
`;
const GreetingTop = styled.h1`
  color: #000;
  font-size: 70px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 10px;
  
`;
const GreetingBottom = styled.h2`
  color: #2B9CFF;
  font-size: 40px;
  font-weight: 500;
  margin: 0;

`;





const AuthForm = styled.form`
  font-family: "Noto Sans KR", sans-serif;
  margin: 0;
  padding: 0;
  .backicon{
    margin-bottom: 10px;
    margin-left: -25px;
    cursor: pointer;
    display: inline;
  }
`;

const BackText = styled.p`
  display: inline;
  color: #2B9CFF;
  font-weight: 500;
  font-size: 13px;
  margin-top: -30px;
`;

const CreateAccountWithEmail = styled.button`
  width: 380px;
  height: 35px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: #2B9CFF;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  /* &:hover {
    
  } */
`;
const DivisionWapper = styled.div`
  width: 380px;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
`;
const DivisionLine = styled.span`
  width: 160px;
  height: 1px;
  content: "";
  display: block;
  background-color: #000;
  margin-top: 12px;
`;
const DivisionText = styled.p`
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  padding: 0;
`;
const CreateAccountWithGoogle = styled.input`
  display: block;
  width: 380px;
  height: 35px;
  border-radius: 50px;
  border: 1px solid #000;
  cursor: pointer;
  background-color: transparent;
  color: #000;
  font-size: 16px;
  font-weight: 300;
  /* &:hover {
    
  } */
`;
const CreateAccountWithGithub = styled.input`
  display: block;
  width: 380px;
  height: 35px;
  border-radius: 50px;
  border: 1px solid #000;
  cursor: pointer;
  background-color: transparent;
  color: #000;
  font-size: 16px;
  font-weight: 300;
  margin-top: 10px;
  /* &:hover {
    
  } */
`;
const LoginWapper  = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LoginText  = styled.p`
    line-height: 35px;
`;
const Arrow = styled.span`
  margin-top: 10px;
`;
const LoginButton = styled.button`
  height: 35px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: #2B9CFF;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  padding: 0 30px;
  /* &:hover {
    
  } */
`;

const EmailInput = styled.input`
  display: block;
  width: 380px;
  height: 35px;
  border-radius: 50px;
  border: 1px solid #000;
  color: #000;
  font-size: 20px;
  font-weight: 300;
  outline: none;
  padding: 0 30px;
  box-sizing: border-box;

`;
const PasswordInput = styled.input`
  display: block;
  width: 380px;
  height: 35px;
  border-radius: 50px;
  border: 1px solid #000;
  color: #000;
  font-size: 20px;
  font-weight: 300;
  outline: none;
  padding: 0 30px;
  margin: 10px 0 25px 0;
  box-sizing: border-box;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 13px;
  font-weight: 300;
  margin: 5px 0 20px 0;
`;

const SuccessSignupText = styled.p`
  color: #2B9CFF;
  font-size: 13px;
  font-weight: 300;
`;










export default function AuthContainer() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authWrapperDp, setAuthWrapperDp] = useState(false);
  const [isOpenSignupForm, setIsOpenSignupForm] = useState(false);
  const [backText, setBackText] = useState(false);
  const [successSigup,setSuccessSignup] = useState("");
  const [btnTxt, setBtnTxt] = useState("가입하기");
  const [bottomBtnTxt, setBottomBtnTxt] = useState("로그인");

  useEffect (() => {
    setTimeout(() => {
      setAuthWrapperDp(true);
    }, 5000);
  });

  const onClickCreateAccountWithEmailBtn = (e) => {
    e.preventDefault();
    setIsOpenSignupForm(prev => !prev);
    setBtnTxt("가입하기");
    setBottomBtnTxt('로그인');
  }
  const onClickLoginBtn = (e) => {
    e.preventDefault();
    setIsOpenSignupForm(true);
    setBtnTxt("로그인");
    setBottomBtnTxt('가입하기');
  }

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onClickSignInBtn = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (btnTxt === "가입하기") {
        //create account
        setSuccessSignup("가입이 완료되었습니다.");
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else if(btnTxt === "로그인") {
        //log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const backTextFade = () => {
    setBackText(prev => !prev);
  }



  const onSocialClick = async (e) => {
    e.preventDefault();
    const {
      target: { name },
    } = e;

    let provider;
    if(name === 'google'){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }else if(name === 'github'){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
      const data = await authService.signInWithPopup(provider);
  }
  return (
    <Base>
        {authWrapperDp && (
          <AuthWrapper>
            <TopLogo src='logoblue.png' />
            <GreetingWrapper>
              <GreetingTop>지금 일어나고 있는 일.</GreetingTop>
              <GreetingBottom>트위터에서 찾아보세요 !</GreetingBottom>
            </GreetingWrapper>
            {isOpenSignupForm ? (
              <AuthForm>
                <FaArrowLeft
                  onClick={onClickCreateAccountWithEmailBtn}
                  size={24}
                  color='#2B9CFF'
                  className='backicon'
                  onMouseEnter={backTextFade}
                  onMouseLeave={backTextFade}
                />
                {backText && <BackText>뒤로가기</BackText>}
                <EmailInput
                  name='email'
                  type='text'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={onChange}
                />
                <PasswordInput
                  name='password'
                  type='password'
                  placeholder='Password'
                  required
                  value={password}
                  onChange={onChange}
                />
                <ErrorText>{error}</ErrorText>
                <CreateAccountWithEmail onClick={onClickSignInBtn}>
                  {btnTxt}
                </CreateAccountWithEmail>
                <SuccessSignupText>{successSigup}</SuccessSignupText>
              </AuthForm>
            ) : (
              <AuthForm>
                <CreateAccountWithEmail
                  onClick={onClickCreateAccountWithEmailBtn}
                >
                  이메일로 가입하기
                </CreateAccountWithEmail>
                <DivisionWapper>
                  <DivisionLine />
                  <DivisionText>또는</DivisionText>
                  <DivisionLine />
                </DivisionWapper>
                <CreateAccountWithGoogle
                  type='submit'
                  value='Google 계정으로 가입하기'
                  name='google'
                  onClick={onSocialClick}
                />
                <CreateAccountWithGithub
                  type='submit'
                  value='Github 계정으로 가입하기'
                  name='github'
                  onClick={onSocialClick}
                />
              </AuthForm>
            )}
            <LoginWapper>
              <LoginText>{bottomBtnTxt === "로그인" ? "이미 트위터에 가입하셨나요 ?" : "트위터 계정이 없으신가요?"}</LoginText>
              <Arrow>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='263.441'
                  height='15.319'
                  viewBox='0 0 263.441 15.319'
                >
                  <line
                    id='선_2'
                    data-name='선 2'
                    x2='256.218'
                    transform='translate(0 7.339)'
                    fill='none'
                    stroke='#000'
                    stroke-width='1'
                  />
                  <path
                    id='패스_2'
                    data-name='패스 2'
                    d='M2450.5,871l6.552,7.094-6.552,7.558'
                    transform='translate(-2194.283 -870.661)'
                    fill='none'
                    stroke='#000'
                    stroke-width='1'
                  />
                </svg>
              </Arrow>
              <LoginButton onClick={bottomBtnTxt === "가입하기" ? onClickCreateAccountWithEmailBtn : onClickLoginBtn}>
                {bottomBtnTxt}
              </LoginButton>
            </LoginWapper>
          </AuthWrapper>
        )}
    </Base>
  )
}
