import { Request, Response } from "express";
import { Startup } from "../entities/Startup.entity";
import { AppDataSource } from "../dataSource/dataSource";

export class startupController {
  static async postStartup(req: Request, res: Response): Promise<any> {
    try {
      const {
        startupName,
        marketCap,
        type,
        burnRate,
        returnRate,
        runAway,
        email,
        contactNo,
        userId,
        location,
      } = req.body;
      const startupRepo = AppDataSource.getRepository(Startup);
      const category = await startupController.findCategory(
        burnRate,
        runAway,
        marketCap,
        returnRate
      );

      const newStartup = new Startup();
      newStartup.startupName = startupName;
      newStartup.type = type;
      newStartup.category = category;
      newStartup.marketCap = marketCap;
      newStartup.burnRate = burnRate;
      newStartup.returnRate = returnRate;
      newStartup.runAway = runAway;
      newStartup.email = email;
      newStartup.contactNo = contactNo;
      newStartup.userId = userId;
      newStartup.location = location;

      await startupRepo.save(newStartup);
      return res
        .status(200)
        .json({ message: "Startup Details Added Successfully" });
    } catch (error) {
      throw error;
    }
  }

  static findCategory(
    burnRate: number,
    runAway: number,
    marketCap: number,
    returnRate: number
  ) {
    var category = "";
    switch (true) {
      case burnRate > 2 && returnRate < 1 && marketCap < 25 && runAway > 12:
        category = "Born Child StartUp";
        break;
      case burnRate > 30 &&
        returnRate > 1 &&
        returnRate < 3 &&
        marketCap > 25 &&
        marketCap < 150 &&
        runAway > 6 &&
        runAway < 12:
        category = "High-Speed Growing";
        break;
      case burnRate > 45 && returnRate > 3 && marketCap > 150 && runAway > 12:
        category = "Grown/Mature Startup";
        break;
      case burnRate > 35 && returnRate < 0.5 && marketCap > 0 && runAway <6 :
        category = "Pivoting/Struggling";
        break;
    }

    return category;
  }
}
