import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';

const Header = () => {
    return (
        
        <header>
            <html dir="rtl" lang="he">
<Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
    <Container>

  <Navbar.Brand href="/">Couponzy</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/coupons"><i className='fas fa-receipt'></i>קופונים</Nav.Link>
      <Nav.Link href="/login"><i className='fas fa-user'></i>התבחר</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
</html>     
   </header>
   
    )
}

export default Header
