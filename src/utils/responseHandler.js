const responseHandler = (res, statusCode, message, data = null) => {
const isSuccess = statusCode >= 200 && statusCode < 300;


// | Parameter    | معناه                                    |
// | ------------ | ---------------------------------------- |
// | `res`        | Response بتاع Express                    |
// | `statusCode` | HTTP status code                         |
// | `message`    | رسالة للمستخدم                           |
// | `data`       | البيانات اللي هنرجعها، والافتراضي `null` |

  res.status(statusCode).json({
    //يعني Express هيرجع HTTP Response بالـ status code اللي إحنا بعته.
    success: isSuccess,//دي بتقول للـ Frontend هل العملية نجحت ولا لأ.
    message,//دي الرسالة اللي الـ Controller بعتها.
    statusCode,
    data,//دي البيانات اللي عايزين نرجعها.
    timestamp: new Date().toISOString(),//بيحط وقت إنشاء الـ Response. 
  });
};

module.exports = responseHandler;