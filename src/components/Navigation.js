import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { BiLogOut } from 'react-icons/bi';
import { BsTwitter } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { authService } from 'fbase';

const Base = styled.nav`
  position: fixed;

  top: 0;
  width: 100%;
  height: 80px;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
`;
const NavList = styled.ul`
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 250px;
  align-items: center;
`;
const NavItem = styled.li`
  
`;
const StyledLink = styled(Link)`
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  text-decoration: none;
`;


export default function Navigation() {
    const onLogoutClick = () => authService.signOut();
  return (
    <Base>
      <NavList>
        <NavItem>
          <StyledLink onClick={onLogoutClick} to='/auth'>
            <BiLogOut size={30} color='#2B9CFF' />
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to='/'>
            <BsTwitter size={30} color='#2B9CFF' />
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to='/profile'>
            <FaUserAlt size={30} color='#2B9CFF' />
          </StyledLink>
        </NavItem>
      </NavList>
    </Base>
  );
}
