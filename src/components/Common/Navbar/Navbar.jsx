import React from 'react'
import styled from 'styled-components'

const Nav = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  background: linear-gradient(to bottom, #080708 33%, rgba(8, 7, 8, 0.25) 75%, transparent);
  height: 100px;
  display: flex;
`

const Left = styled.div`

`;

const Branding = styled.div`

`;

const Right = styled.div`
  text-align: right;
`;

const Menu = styled.nav`

`;

const Navbar = () => {
  return (
    <Nav>
      <Left>
        <Branding></Branding>
      </Left>
      <Right>
        <Menu>

        </Menu>
      </Right>
    </Nav>
  )
}

export default Navbar