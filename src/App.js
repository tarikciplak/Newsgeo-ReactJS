import React, { useEffect } from 'react'
import NavBar from './components/NavBar';
import NewsList from './components/NewsList';
import Map from './components/Map'
import styled from 'styled-components'

const Container = styled.div`
display: grid;
height: 100vh;
grid-template-rows: 0.1fr 0.9fr;
grid-template-columns:0.35fr 0.35fr 0.5fr 0.5fr;
grid-template-areas:
    "nav nav nav nav"
    "sidebar sidebar map map";
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 0.3fr 0.3fr 0.5fr ;
    grid-template-areas:
      "nav nav"
      "sidebar sidebar"
      "sidebar sidebar"
      "map map"
      ;
  }
      
`
const App = () => {
  return (
    <>
      <Container>
        <NavBar />
        <NewsList />
        <Map />
      </Container>
    </>
  )
}


export default App
