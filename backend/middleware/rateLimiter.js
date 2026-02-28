import rateLimit from "../src/config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("My-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    // ✅ If allowed, continue to next middleware
    next();

  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default ratelimiter;