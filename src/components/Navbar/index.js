import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "../../utils/Themes";

const Nav = styled.div`
background-color : ${({theme}) => theme.card_light};
height : 80px;
display : flex;
justify-content : center;
align-items: center;
font-size: 1rem;
position: sticky;
top: 0
z-index:10;
@media screen and (max-width: 960px) {
  transition: 0.8s all ease;
}`;

const NavContainer = styled.div`
display : flex;
justify-content : space-between;
height : 60px;
z-index: 1;
width: 100%;
padding: 0 24px;
max-width : 1200px;
`;

const NavLogo = styled.div`
width : 80%;
padding : 0 6px;
display: flex;
justify-self: flex-start;
cursor : pointer;
text-decoration : none;
align-items : center;
@media screen and (max-width: 600px) {
padding: 0 0px;
}
`;

const NavItems = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 32px;
    padding: 0 6px;
    list-style: none;

    @media screen and (max-width: 768px) {
      display: none;
    }
`;

const NavLink = styled.a`
color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    :hover {
      color: ${({ theme }) => theme.primary};
    }
`;

const ButtonContainer = styled.div`
  width: 80%;  
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GitHubButton = styled.a`
  background-color : transparent;
  color: ${({ theme }) => theme.primary};
  border: 1.8px solid ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.6s ease-in-out;
    :hover {
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};     
    }
    @media screen and (max-width: 768px) { 
    font-size: 14px;
    }
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
  }
`

const Navbar = () => {
 return <Nav>
  <NavContainer> 
  <ThemeProvider theme={darkTheme}>
    <NavLogo>Logo</NavLogo>
    <MobileIcon></MobileIcon>
    <NavItems>
      <NavLink href="#about">About</NavLink>
      <NavLink href="#skills">Skills</NavLink>
      <NavLink href="#experience">Experience</NavLink>
      <NavLink href="#projects">Projects</NavLink>
      <NavLink href="#education">Education</NavLink> 
    </NavItems>
    <ButtonContainer>
      <GitHubButton>Github Profile</GitHubButton>
    </ButtonContainer>
    </ThemeProvider>
    </NavContainer>
  </Nav>
}

export default Navbar;