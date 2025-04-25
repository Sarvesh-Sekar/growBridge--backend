import { Investor } from "../entities/Investor.entity";
import { Request, Response } from "express";
import { AppDataSource } from "../dataSource/dataSource";

export class investorController {
  static async postInvestor(req: Request, res: Response):Promise<any> {
    try {
      const { investorName, investorType, interests, userId, location } =
        req.body;
      const investorRepo = AppDataSource.getRepository(Investor);
      const newInvestor = new Investor();
      newInvestor.investorName = investorName;
      newInvestor.investorType = investorType;
      newInvestor.interests = interests;
      newInvestor.userId = userId;
      newInvestor.location = location;

      await investorRepo.save(newInvestor);

      return res
        .status(200)
        .json({ message: "Investor Details Added Successfully" });
    } catch (Error) {
      throw Error;
    }
  }
}
