import jwt from 'jsonwebtoken'
const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token) {
        return res.status(401).json({ error: 'token is required'})
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET) 
        // console.log('td', tokenData)
        req.userId = tokenData.userId
        req.role = tokenData.role     
        next()
    } catch(err) {
        return res.status(401).json({ error: err.message })
    }
}

export default authenticateUser