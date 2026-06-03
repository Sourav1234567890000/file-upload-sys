const jwt = require("jsonwebtoken");
/* 

Security guard
1. Read token from Authorization header
2. If no token → return 401
3. Verify token with jwt.verify()
4. If invalid/expired → return 401
5. If valid → attach decoded data to req.user
6. Call next()
*/

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const verifyJWT = jwt.verify(
      token,
      process.env.JWT_ACCESSTOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: "Token invalid or expired" });
        }
        req.user = decoded;
        next();
      },
    );
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};

module.exports = { verifyToken, authorizeRole };
