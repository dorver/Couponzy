import React, { Fragment, useState } from 'react';
import axios from 'axios';


export const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        phoneNumber:'',
        birthday:'',
        gender:''
    });

    const { name, email, password, password2, phoneNumber, birthday, gender } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async e => {
        e.preventDefault();
        if(password != password2) {
            console.log('passwords do not much')
        } else {
            const newUser = {
                name,
                email,
                password,
                phoneNumber,
                birthday,
                gender
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const body = JSON.stringify(newUser);

                const res = await axios.post('/api/user/registerUser', body, config);
                console.log(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        }
    }

    return <Fragment>
                <html dir="rtl" lang="ar">
             <h1 className="large text-primary">הרשמה</h1>
      <p className="lead"><i className="fas fa-user"></i> יצירת משתמש חדש</p>
      <form  className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
           type="text"
           placeholder="שם"
           name="name"
           value={name}
           onChange={e => onChange(e)} 
           required 
          />
        </div>
        <div>
          <input 
          type="text" 
          placeholder="מספר טלפון" 
          name="phoneNumber" 
          value={phoneNumber} 
          onChange={e => onChange(e)} 
          />
        </div>
        <div className="form-group">
            <label for="birthday">תאריך לידה</label>
                <div>            
                    <input
                    type="date" 
                    dir="rtl" 
                    id="birthday" 
                    name="birthday" 
                    value={birthday} 
                    onChange={e => onChange(e)} 
                    />
                </div>
        </div>
        <div className="form-group">
            <p>מגדר </p>
            <input type="radio" id="male" name="gender" value={gender} onChange={e => onChange(e)}/>
            <label for="male">זכר</label><br/>
            <input type="radio" id="female" name="gender" value={gender} onChange={e => onChange(e)}/>
            <label for="female">נקבה</label><br/>
            <input type="radio" id="other" name="gender" value={gender} onChange={e => onChange(e)}/>
            <label for="other">אחר</label>
        </div> 
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
                  //required
                  minlength="6"
                   />
                </div>
                <div className="form-group">
                  <input
                  type="password" 
                  placeholder="הכנס\י שוב סיסמה" 
                  name='password2'
                  value={password2}
                  onChange={e => onChange(e)}
                  //required
                  minlength="6" 
                  />
                </div>
                <input type="submit" value="הרשם" className="btn btn-primary" />
              </form>
              <p className="my-1">
                כבר יש לך חשבון? <a href="login.html">התחבר/י</a>
              </p>
              </html>
           </Fragment> 
        
    
}

export default Register