const { verifyToken } = require("../config/jwt");
const responseHandler = require("../utils/responseHandler");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return responseHandler(res, 401, "No token provided. Access denied.");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);//التحقق من الـ Token
//     Token
//       ↓
// verifyToken()
//      ↓
// jwt.verify()
//     ↓
// Payload

    const user = await User.findById(decoded.id).select("-password");//هنا بنستخدم الـ id اللي جاي من الـ Token.
    // رجّع كل بيانات المستخدم ماعدا password.
    if (!user) {
      return responseHandler(res, 401, "User no longer exists.");
    }

    req.user = user;//إحنا بنضيف المستخدم على الـ Request.
    // فكل دواء بيتربط بالمستخدم اللي عامل Login.
    // وبالتالي الـ Controllers بعد كده تقدر تعرف مين المستخدم اللي عمل الـ Request.
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {//لو الـ JWT انتهت صلاحيته.
      return responseHandler(res, 401, "Token has expired. Please log in again.");
    }
    if (err.name === "JsonWebTokenError") {//Token غير صحيح
      return responseHandler(res, 401, "Invalid token. Access denied.");
    }
    next(err);
  }
  // catch (err) {
  //   next(err);
  // }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return responseHandler(
        res,
        403,
        `Role '${req.user.role}' is not authorized to access this resource.`
      );
    }
    next();
  };
};
// 401 Unauthorized المستخدم مش authenticated.
// 403 Forbidden المستخدم Authenticated بالفعل، لكن مش مسموح له يعمل العملية دي
// 401 → أنت مش داخل/مش authenticated
// 403 → أنت داخل لكن مش مسموح لك

module.exports = { protect, authorizeRoles };
