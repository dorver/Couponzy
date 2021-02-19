import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export const Login = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:''
 
});

const { email, password } = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async e => {
    e.preventDefault();
        console.log('SUCCESS')
      };

    return <Fragment>
                <html dir="rtl" lang="ar">
             <h1 className="large text-primary">התברות</h1>
      <p className="lead"><i className="fas fa-user"></i>התחבר/י לחשבון שלך</p>
      <form  className="form" onSubmit={e => onSubmit(e)}> 
        <div className="form-group">
                  <input   
                  type="email"
                  placeholder="כתובת אימייל"
                  name="email" 
                  value={email}
                  onChange={e => onChange(e)}
                  required
                  />
                </div>
                <div className="form-group">
                  <input 
                  type="password" 
                  placeholder="סיסמה"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  minlength="6"
                   />
                </div>
                <input type="submit" value="התחבר/י" className="btn btn-primary" />
              </form>
              <p className="my-1">
                אין לך חשבון? <Link to="register">הרשם</Link>
              </p>
              </html>
           </Fragment> 

    
}

export default Login