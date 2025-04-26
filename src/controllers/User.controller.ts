import { Request, Response } from "express";
import { AppDataSource } from "../dataSource/dataSource";
import { User } from "../entities/User.entity";
import { AuthHelper } from "../helpers/auth.helpers";

export class UserController {
  static async signup(req: Request, res: Response):Promise<any> {
    try {
      const { email, password, role } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "All fields are required" });
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { email: email } });
      if (user)
        return res.status(400).json({ message: "User already exists" });
      const newUser = new User();
      const hashedPassword = await AuthHelper.encryptText(password);
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.role = role;

      await userRepo.save(newUser);
      return res.status(200).json({ message: "User Created Successfully" });
    } catch (error) {
      throw error;
    }
  }

  static async login(req: Request, res: Response):Promise<any> {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "All fields are required" });
      const userRepo = AppDataSource.getRepository(User);

      const user = await userRepo.findOne({ where: { email: email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = await AuthHelper.compareText(
        password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = await  AuthHelper.generateToken(user.id, user.role);
      console.log(token);
      return res.status(200).json({ token: token });
    } catch (error) {
      throw error;
    }
  }
}
