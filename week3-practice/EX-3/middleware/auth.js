export function authToken(req, res, next) {
    const token = req.query.token;
    const TOKEN = 'xyz123';

    if (!token || token !== TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    next();
}