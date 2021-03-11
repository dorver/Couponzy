import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <html dir='rtl' lang='he'>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>Couponzy</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                {userInfo && (
                  <LinkContainer to='/myCoupons'>
                    <Nav.Link>
                      <i className='fas fa-receipt'></i>הקופונים שלי
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo ? (
                  <NavDropdown title={userInfo.firstName} id='username'>
                    <LinkContainer to='profile'>
                      <NavDropdown.Item>פרופיל</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/userLogin'>
                      <NavDropdown.Item onClick={logoutHandler}>
                        התנתק/י
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/userLogin'>
                    <Nav.Link>
                      <i className='fas fa-user'></i>התחבר/י
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isSeller && (
                  <NavDropdown title='מוכר' id='sellermenu'>
                    <LinkContainer to='seller/couponlist'>
                      <NavDropdown.Item>קופונים</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </html>
    </header>
  );
};

export default Header;
