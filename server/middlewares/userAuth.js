import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.json({ success: false, message: "Not Logged In" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode.id) {
      return res.json({
        success: false,
        message: "Not Authorised Login Again",
      });
    } 
    
    req.userId = tokenDecode.id;
    return next();
  } catch (error) {
    return res.json({success: false, message: error.message});
  }
};

export default userAuth;
