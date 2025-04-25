import { Response, Request, NextFunction } from "express";
import  jwt from "jsonwebtoken";
import {AppDataSource} from "../dataSource/dataSource";
import { User } from "../entities/User.entity";

const JWT_SECRET_KEY = "hi";

export class AuthMiddleware {
  static async authentify(req: Request, res: Response,next:NextFunction):Promise<any> {
    try {
      const header = req.headers.authorization;
      if (!header || !header.startsWith("Bearer "))
        return res
          .status(401)
          .json({ message: "Unauthorized - No token provided" });

      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
        userId: string;
        role: string;
      };

      if (!decoded?.userId || !decoded?.role) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token payload" });
      }

      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { id: decoded.userId } });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - User not found" });
      }

      (req as any).currentUser = user;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  }
  static async authorize(req: Request, res: Response) {}
}
