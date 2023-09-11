const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        } else {
            console.log(req.headers.authorization);
            return res.status(401).json({ message: 'No Token Found' });
        }
        next();
    } catch (error) {
        console.log(error, 'secret:', SECRET_KEY);
        return res.status(401).json({ message: 'Unauthorized User' });
    }
}

module.exports = auth;