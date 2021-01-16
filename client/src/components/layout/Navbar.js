import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <html dir="rtl" lang="ar">
      <nav className="navbar bg-dark">
        <h1>
            <Link to='/'> <i className="fas fa-code"></i> Couponzy </Link>
        </h1>
        <ul>
            <li><a href="#!">עמוד הבית</a></li>
            <li><Link to='/register'>הרשם</Link></li>
            <li><Link to='/login'>התחבר</Link></li>
            <li><a href="#!">צור קשר</a></li>
        </ul>
    </nav>
    </html>
    )
}

export default Navbar