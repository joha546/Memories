import jwt from 'jsonwebtoken'

// wants to like a post
// click the like button => auth middleware will check the token 
// if verified by middleware, his action will take place otherwise it won't.

const auth = async(req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = authHeader.split(" ")[1];

        const isCustomAuth = token.length<500;
        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;   // sub is google's name for specific id.
        }

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(401).json({ message: "Unauthorized access", error: error.message });
    }
    
}

export default auth;