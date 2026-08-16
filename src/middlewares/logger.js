
// الـ Logger في المشروع وظيفته يتابع الـ HTTP Requests اللي داخلة للـ Backend، عشان تعرفي مين طلب إيه، وإمتى، والطلب أخد وقت قد إيه.
const logger = (req, res, next) => {
    const start = Date.now();
    console.log(`Request started: ${req.method} ${req.url}`);
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Request finished: ${req.method} ${req.url} - ${duration}ms`);
    });
    next();
}
module.exports = logger;