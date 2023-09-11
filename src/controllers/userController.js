const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json('User Already Exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            username: username,
            password: hashedPassword
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY);
        return res.status(201).json({ user: result, token: token });
    } catch (error) {
        console.log('ErrorMsg', error.message);
        return res.status(500).json('Something went wrong');
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json('User Not Found');
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ message: 'Invalid Credential' });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY);
        return res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong');
    }
}

module.exports = { signup, signin };