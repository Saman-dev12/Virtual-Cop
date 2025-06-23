import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { address: string };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const walletAddress = req.cookies['wallet-address'];
  
    if (walletAddress) {
      req.user = { address: walletAddress };
      return next();
    }
  
    return res.status(401).json({ message: "Unauthorized" });
  };
  