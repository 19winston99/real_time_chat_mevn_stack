import jwt from 'jsonwebtoken';

export const authenticateToken = async (req, res, next) => {
     /* IF TOKEN IS PASSED BY HEADERS

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) res.status(401).json({ status: 'error', message: 'unauthorized' }); */

    jwt.verify(req.cookies['jwt'], process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(401).json({status: 'error', message: 'Something went wrong', devMessage: error.message});
        }
        req.user = user;
        next();
    })
}