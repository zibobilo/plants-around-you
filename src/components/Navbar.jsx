import React from "react"
import styled from 'styled-components'

// styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  border: 10px solid grey;
  padding:20px;
`;


class Navbar extends React.Component {
  render() {
    return (
    <Title>Create Biodiversity</Title>
    )
  }
}

export default Navbar;