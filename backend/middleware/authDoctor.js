import jwt from "jsonwebtoken";

// Protects routes that only a logged-in DOCTOR can access.
// Expects header: dtoken: <jwt>   (kept separate from "token" used by users,
// and from "atoken" used by the admin, so the three logins never mix)
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({ success: false, message: "Not Authorized, please login again" });
    }
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
