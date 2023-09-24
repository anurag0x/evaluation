const rateLimiter=require("express-rate-limit")
const limiter=rateLimiter({
    windowMs:10*60*1000,
    max:70
})
module.exports=limiter