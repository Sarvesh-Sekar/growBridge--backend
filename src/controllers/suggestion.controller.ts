import { Request, Response } from "express";
import { User } from "../entities/User.entity";
import { Startup } from "../entities/Startup.entity";
import { AppDataSource } from "../dataSource/dataSource";
import { Investor } from "../entities/Investor.entity";
import { In } from "typeorm";

export class suggestionController {
  static async getStartupSuggestions(req: Request, res: Response):Promise<any> {
    try {
      const { userId } = req.body;
      const investorRepo = AppDataSource.getRepository(Investor);
      const investor = await investorRepo.findOne({
        where: { userId: userId },
      });
      const interests = investor?.interests!;
      const startupRepo = AppDataSource.getRepository(Startup);
      const startups = await startupRepo.find({
        where: { type: In(interests) },
      });

      const suggestionResponse = startups?.map((startup) => ({
        startupName: startup.startupName,
        type: startup.type,
        category: startup.category,
        marketCap: startup.marketCap,
        returnRate: startup.returnRate,
        email: startup.email,
        contactNo: startup.contactNo,
      }));

      return res.status(200).json({ suggestions: suggestionResponse });
    } catch (error) {
      throw error;
    }
  }

  static async filterStartupSuggestions(req: Request, res: Response):Promise<any> {
    try {
      const { category, marketCap, returnRate, location } = req.body;
      const startupRepo = AppDataSource.getRepository(Startup);
      const filterResutls = await startupRepo
        .createQueryBuilder("startup")
        .where("startup.category = :category", { category: category })
        .andWhere("startup.marketCap = :marketCap", { marketCap: marketCap })
        .andWhere("startup.returnRate = :returnRate", {
          returnRate: returnRate,
        })
        .andWhere("startup.location = :location", { location: location })
        .getMany();

      const suggestionResponse = filterResutls?.map((startup) => ({
        startupName: startup.startupName,
        type: startup.type,
        category: startup.category,
        marketCap: startup.marketCap,
        returnRate: startup.returnRate,
        email: startup.email,
        contactNo: startup.contactNo,
      }));

      return res.status(200).json({ suggestions: suggestionResponse });
    } catch (error) {
      throw error;
    }
  }

  static async getInvestorSuggestions(req: Request, res: Response):Promise<any> {
    try {
      const { userId } = req.body;
      const startupRepo = AppDataSource.getRepository(Startup);
      const startup = await startupRepo.findOne({ where: { userId: userId } });
      const investorRepo = await AppDataSource.getRepository(Investor);
      const investors = await investorRepo
        .createQueryBuilder("investor")
        .where(":value = ANY(investor.interests)", { value: startup?.type })
        .getMany();

      const suggestionResponse = investors?.map((investor) => ({
        investorName: investor.investorName,
        investorType: investor.investorType,
        email: investor.email,
        contactNo: investor.contactNo,
      }));

      return res.status(200).json({ suggestions: suggestionResponse });
    } catch (error) {
      throw error;
    }
  }
}
