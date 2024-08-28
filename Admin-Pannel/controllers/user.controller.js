const DataAuth = require("../models/user.schema");
const nodemailer = require('nodemailer');

const home = async (req, res) => {
  let data = await DataAuth.find();
  res.send(data);
};

const indexPage = (req, res) => {
  return res.render('index', { user: req.user });
};

const buttonPage = async (req, res) => {
  return res.render('ui-buttons', { user: req.user });
};

const formPage = (req, res) => {
  return res.render('ui-forms', { user: req.user });
};

const alertPage = (req, res) => {
  return res.render('ui-alerts', { user: req.user });
};

const cardPage = (req, res) => {
  return res.render('ui-card', { user: req.user });
};

const typographyPage = (req, res) => {
  return res.render('ui-typography', { user: req.user });
};

const iconPage = (req, res) => {
  return res.render('icon-tabler', { user: req.user });
};

const signup = async (req, res) => {
    try {
      const { name, email, password ,phone} = req.body;
      const profilePhoto = req.file ? req.file.filename : null;
  
      await DataAuth.create({ name, email, password, profilePhoto, phone });
  
      console.log("User signed up successfully");
      return res.redirect('/login');
    } catch (error) {
      console.log("Error during sign-up:", error);
    }
  };

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let User = await DataAuth.findOne({ email: email });

    if (User) {
      if (User.password === password) {
        console.log("Login successful:", User);
        return res.cookie('user', User.id).redirect('/');
      } else {
        console.log("Wrong password for user:", email);
        return res.redirect('/login');
      }
    } else {
      console.log("User not found with email:", email);
      return res.redirect('/login');
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

const loginPage = (req, res) => {
  return res.render('authentication-login');
};

const signupPage = (req, res) => {
  return res.render('authentication-register');
};

const logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.error('Error during logout:', err);
    }
    res.redirect('/login');
  });
};

const ChangePassword = async (req, res) => {
    return res.render('ChangePassword');
};

const ChangePasswordPage = async (req, res) => {
  const { OldPassword, NewPassword, ConfirmPassword } = req.body;
  const { id } = req.user;
  let data = await DataAuth.findById(id);

  if (OldPassword == data.password) {
    if (NewPassword == ConfirmPassword) {
      await DataAuth.findByIdAndUpdate(id, { password: NewPassword });
      console.log("Password Change Successfully");
      return res.redirect('/login');
    } else {
      console.log("Please Enter Same password");
      return res.redirect('/ChangePassword');
    }
  } else {
    console.log("Password Not Matched");
  }
};

const OTP = Math.floor(100000 + Math.random() * 900000);

const resetPassword = (req, res) => {
  const email = req.body.email;
  console.log(`Generated OTP: ${OTP} for email: ${email}`);

  const transporter = nodemailer.createTransport({
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
      user: 'kushangtanawala@gmail.com',
      pass: 'bmwg dyfv jqyx sjkm'
    },
  });

  const mailOptions = {
    from: 'kushangtanawala@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Your OTP for password reset is: <h1>${OTP}</h1></p>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error occurred while sending email:', err);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Password reset email sent');
    }
  });
};

const VerifyOTP = (req, res) => {
  const { otp } = req.body;
  console.log(`Received OTP: ${otp}, Expected OTP: ${OTP}`);
  if (otp == OTP) {
    res.send("OTP Verified");
  } else {
    res.send("OTP Not Verified");
  }
};

const resetPasswordPage = async (req, res) => {
  const { newPassword, confirmPassword, email } = req.body;

  if (newPassword !== confirmPassword) {
    return res.send("Passwords do not match");
  }

  try {
    const updatedUser = await DataAuth.findOneAndUpdate({email: email ,password: newPassword ,new: true});

    if (updatedUser) {
      console.log("Password updated successfully");
      return res.redirect('/login');
    } else {
      console.log("User not found");
      return res.send("User not found");
    }
  } catch (err) {
    console.log("Error updating password:", err);
    return res.send("Error updating password");
  }
};

const forgotPage = (req, res) => {
  return res.render('forgotpassword');
};

module.exports = {home,signup , indexPage, buttonPage,typographyPage,iconPage,alertPage,cardPage, formPage , login, loginPage,signupPage, logout,ChangePassword,ChangePasswordPage,resetPassword,VerifyOTP,forgotPage,resetPasswordPage}