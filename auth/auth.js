const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const header = req.headers.authorization;

    if(!header)
        return res.status(401).json({message:"access denied"});

    const parts = header.split(" ");

    if(parts.length !== 2 || parts[0] !== "Bearer")
        return res.status(401).json({message:"invalid token format"});

    const token = parts[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;   

        next();
    }
    catch(err){
        return res.status(401).json({message:"invalid token"});
    }
}

module.exports = auth;
