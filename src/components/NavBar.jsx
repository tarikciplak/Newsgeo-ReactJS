import React, { useState } from "react";
import styled from "styled-components";
import { SearchIcon, NewsImage } from "../utilities/icons/icons";
import AddNews from "./AddNews";
import { Logo } from "../utilities/motions/motion";

const MainDiv = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: white;
  z-index: 2021;
  display: flex;
  grid-area: nav;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.3);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const LeftSide = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MidSide = styled.div``;

const RightSide = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  color: #1a73e8;
  align-items: center;
  padding: 0px 20px;
  border: 2px solid #1a73e8;
  border-radius: 4px;
  overflow: visible;
  &:hover {
    color: #174ea6;
    background: rgba(26, 115, 232, 0.04);
    text-decoration: none;
  }
  @media (max-width: 1000px) {
    border-radius: 50%;
    padding: 4px 4px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  min-width: 200px;
  flex-direction: row;
  width: 50rem;
  height: 55px;
  background-color: #f1f3f4;
  border: 1px solid transparent;
  border-radius: 8px;
  margin-left: auto;
  max-width: 720px;
  position: relative;
  margin-right: auto;
  @media (max-width: 1000px) {
    width: 15rem;
    height: 35px;
  }
  &:hover {
    background: rgba(255, 255, 255, 1);
    border: 1px solid transparent;
    -webkit-box-shadow: 0 1px 1px 0 rgb(65 69 73 / 30%),
      0 1px 3px 1px rgb(65 69 73 / 15%);
    box-shadow: 0 1px 1px 0 rgb(65 69 73 / 30%),
      0 1px 3px 1px rgb(65 69 73 / 15%);
  }
`;
const SearchInput = styled.input`
  width: 60vh;
  outline: none;
  background-color: transparent;
  border: none;
`;

const SearchButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
  border-color: transparent;
  background-color: transparent;
  &:hover {
    transition-delay: 100ms;
    background-color: #c7cacc;
  }
`;

const NavBar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <MainDiv>
        <LeftSide>
          <Logo></Logo>
          <span
            style={{ marginLeft: "5px", fontSize: "1.35rem", opacity: "0.6" }}
          >
            Haberler
          </span>
        </LeftSide>
        <MidSide>
          <SearchBar>
            <SearchButton>
              <SearchIcon />
            </SearchButton>
            <SearchInput placeholder="Konu,konum ve kaynak ara" />
          </SearchBar>
        </MidSide>

        <RightSide>
          <Button onClick={() => setShow(true)}>
            <NewsImage />
          </Button>
        </RightSide>
      </MainDiv>
      <AddNews button={Button} show={show} onClose={() => setShow(false)} />
    </>
  );
};

export default NavBar;
