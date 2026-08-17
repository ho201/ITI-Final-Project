const errorHandler = (err, req, res, next) => {
//   err  → الخطأ نفسه اهم حاجه لاني بعمل ان هوا ايرور من البراميتار ده
// req  → Request
// res  → Response
// next → Middleware اللي بعده
  console.error(err);

  const statusCode = err.statusCode || 500;//هنا بنحدد الـ HTTP Status Code.
  // لو إحنا عارفين نوع الخطأ، استخدم الـ status code بتاعه، وإلا اعتبره Server Error.

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong"
    // const err = new Error("Reminder not found"); مثلا 
  });
};
// الـ Error Handler لازم يكون بعد الـ Routes.

// لأننا عايزين الأخطاء اللي تحصل أثناء تنفيذ الـ Routes توصل له
module.exports = errorHandler;

// Express يفهم إن فيه Error ويدور على Error Handling Middleware.