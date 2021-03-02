import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CouponScreen from './screens/CouponScreen';

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
          <Route path='/' component={HomeScreen} exact />
          <Route path='/coupon/:id' component={CouponScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};
export default App;
