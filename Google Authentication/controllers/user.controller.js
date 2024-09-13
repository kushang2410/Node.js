const DataAuth = require("../models/user.schema");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const home = async (req, res) => {
  let data = await DataAuth.find();
  console.log('All users:', data);
  res.send(data);
};

const indexPage = (req, res) => {
  console.log('User data:', req.user);
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
  console.log('Request body:', req.body);
  console.log('File uploaded:', req.file);

  const { name, email, password } = req.body;
  const profilePhoto = req.file ? req.file.filename : '';

  try {
      const existingUser = await DataAuth.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new DataAuth({ name, email, password: hashedPassword, profilePhoto });
      await newUser.save();
      console.log('New user saved:', newUser);
      res.redirect('/login');
  } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).send('Internal Server Error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await DataAuth.findOne({ email : email });
  try {
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
          if (passwordMatch) {
              console.log("Login successful:", user);
              return res.cookie('user', user.id).redirect('/');
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
  const message = ''; 
  const email = req.query.email;
  return res.render('authentication-login', { email ,message });
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

  if (await bcrypt.compare(OldPassword, data.password)) {
      if (NewPassword === ConfirmPassword) {
          const hashedPassword = await bcrypt.hash(NewPassword, 10);
          await DataAuth.findByIdAndUpdate(id, { password: hashedPassword });
          console.log("Password Changed Successfully");
          return res.redirect('/login');
      } else {
          console.log("Passwords do not match");
          return res.redirect('/ChangePassword');
      }
  } else {
      console.log("Old Password Not Matched");
      return res.redirect('/ChangePassword');
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
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await DataAuth.findOneAndUpdate({ email: email }, { password: hashedPassword }, { new: true });

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


module.exports = { home, signup, indexPage, buttonPage, typographyPage, iconPage, alertPage, cardPage, formPage, login, loginPage, signupPage, logout, ChangePassword, ChangePasswordPage, forgotPage, resetPasswordPage, resetPassword, VerifyOTP };
