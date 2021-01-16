import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <html dir="rtl" lang="ar">
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Couponzy</h1>
            <p className="lead">
              התחבר כמוכר בחנות ופרסם קופונים 
            </p>
            <p className="lead">
                התחבר כלקוח ותהנה ממגוון קופונים
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">הרשם</Link>
              <Link to="/login" className="btn btn">התחבר</Link>
            </div>
          </div>
        </div>
      </section>
      </html>
    )
}

export default Landing