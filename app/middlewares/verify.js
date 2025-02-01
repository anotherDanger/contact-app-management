export const verifyToken = ((req, res, next) => {
    const token = req.headers['authorization'];

    if(!token)
    {
        return res.status(403).send('Access Denied!');
    };

    next();
})