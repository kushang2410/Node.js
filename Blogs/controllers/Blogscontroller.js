const {BlogsDB,DataAuth} = require("../models/UserData");
const fs = require('fs');
const path = require('path');

const home = async (req, res) => {
    try {
        let data = await BlogsDB.find();
        console.log(data);
        return res.render('index', { blogs: data });
    } catch (err) {
        console.error(err);
    }
}
const AddData = async (req, res) => {
    try {
        const BlogsData = {
            Image: req.file ? `/uploads/${req.file.filename}` : '',
            Name: req.body.Name,
            Description: req.body.Description
        };
        await BlogsDB.create(BlogsData);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
const editPage = async (req, res) => {
    const { id } = req.params;
    try {
        const Blog = await BlogsDB.findById(id);
        res.render('edit', { Blog });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const Blog = await BlogsDB.findById(id);

        if (!Blog) {
            console.log('Blog not found');
            res.status(404).send('Blog not found');
            return;
        }

        const updatedData = {
            Image: req.file ? `/uploads/${req.file.filename}` : Blog.Image,
            Name: req.body.Name,
            Description: req.body.Description
        };

        if (req.file && Blog.Image) {
            const oldImagePath = path.join(__dirname, '..', Blog.Image);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error deleting old image:', err);
                } else {
                    console.log('Old image deleted successfully');
                }
            });
        }

        await BlogsDB.findByIdAndUpdate(id, updatedData, { new: true });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
const deleteData = async (req, res) => {
    let { id } = req.params;
    try {
        const Blog = await BlogsDB.findById(id);

        if (!Blog) {
            console.log('Blog not found');
            res.status(404).send('Blog not found');
            return;
        }

        if (Blog.Image) {
            const imagePath = path.join(__dirname, '..', Blog.Image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                } else {
                    console.log('Image deleted successfully');
                }
            });
        }

        await BlogsDB.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const signup = async(req,res)=>{
    try {
        const {email , password} = req.body;
         await DataAuth.create({email , password});
        console.log("User signed up successfully:");
        return res.redirect('/login');
    } catch (error) {
        console.log("Error during sign-up:", error);
    }
}
// const login = (req, res) => {
//     passport.authenticate('local', (err, user) => {
//         if (err) {
//             console.log("Error during authentication:", err);
//             return res.redirect('/login');
//         }
//         if (!user) {
//             console.log("Authentication failed");
//             return res.redirect('/login');
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 console.log("Error during login:", err);
//                 return res.redirect('/login');
//             }
//             console.log("Login successful:", user);
//             return res.redirect('/');
//         });
//     })(req, res);
// };


const logout =  (req, res) => {
    req.logOut((err)=>{
      if(err){
        console.log(err);
        return false;
      }
      console.log('logout Successfully');
      return res.redirect('/login')
    })
  };
const loginPage = (req,res)=>{
    return res.render('login');
}

const signupPage = (req,res)=>{
    return res.render('signup');
}

module.exports = { home, AddData, update, deleteData, editPage ,signup, loginPage, signupPage, logout};
