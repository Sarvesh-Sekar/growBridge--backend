import { Investor } from "../entities/Investor.entity";
import { User } from "../entities/User.entity";
import { Request, Response } from "express";
import { AppDataSource } from "../dataSource/dataSource";

export class investorController {
  static async postInvestor(req: Request, res: Response): Promise<any> {
    try {
      const {
        investorName,
        investorType,
        interests,
        email,
        userId,
        contactNo,
        location,
        profileImage,
      } = req.body;

      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { id: userId } });

      if (!user) return res.status(400).json({ message: "User not found" });

      const investorRepo = AppDataSource.getRepository(Investor);
      const newInvestor = new Investor();
      newInvestor.investorName = investorName;
      newInvestor.contactNo = contactNo;
      newInvestor.investorType = investorType;
      newInvestor.email = email;
      newInvestor.profileImage = profileImage;
      newInvestor.interests = interests;
      newInvestor.userId = userId;
      newInvestor.location = location;

      await investorRepo.save(newInvestor);
      user.investor = newInvestor;

      await userRepo.save(user);

      return res
        .status(200)
        .json({ message: "Investor Details Added Successfully" });
    } catch (Error) {
      throw Error;
    }
  }
}
