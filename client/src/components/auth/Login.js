import React, { Fragment } from 'react';

export const Login = () => {
    return ( <Fragment>
        <html dir="rtl" lang="ar">
        {/* <!-- Alert --> */}
        <div class="alert alert-danger">
                פרטים שגואים
        </div>

            <h1 class="large text-primary">
                התחברות
              </h1>
              <p class="lead"><i class="fas fa-user"></i> התחבר לשחבונך</p>
              <form action="dashboard.html" class="form">
                <div class="form-group">
                  <input type="email" placeholder="כתובת אימייל" />
                </div>
                <div class="form-group">
                  <input type="password" placeholder="סיסמה" minlength="6" />
                </div>
                <input type="submit" value="התחבר/י" class="btn btn-primary" />
              </form>
              <p class="my-1">
                אין לך חשבון? <a href="login.html">הרשם</a>
              </p>
              </html>
    </Fragment>

    )
}

export default Login