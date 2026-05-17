import expressAsyncHandler from "express-async-handler";

export const adminMiddleware = expressAsyncHandler(async (req, res, next) => {
    if (!req.user) {
      res.status(401)
      throw new Error("Unauthorized")
    }

    if (req.user.role   !== "admin") {
      res.status(403); 
      throw new Error("Access denied. Admin only.")
    }

    next()
  }
)