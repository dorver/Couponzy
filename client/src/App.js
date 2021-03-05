import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CouponScreen from './screens/CouponScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000', {
  transport: ['websocket'],
});

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/userLogin' component={LoginScreen} />
          <Route path='/registerUser' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/coupon/:id' component={CouponScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};
export default App;
