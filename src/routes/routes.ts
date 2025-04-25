import express from "express";
import { suggestionController } from "../controllers/suggestion.controller";
import { startupController } from "../controllers/startup.controller";
import { investorController } from "../controllers/investor.controller";
import { UserController } from "../controllers/User.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

router.post(
  "/getStartupSuggestions",
  AuthMiddleware.authentify,
  suggestionController.getStartupSuggestions
);
router.post(
  "/getStartupFilters",
  AuthMiddleware.authentify,
  suggestionController.filterStartupSuggestions
);

router.post(
  "/postStartup",
  AuthMiddleware.authentify,
  startupController.postStartup
);
router.post(
  "/postInvestor",
  AuthMiddleware.authentify,
  investorController.postInvestor
);

router.post(
  "/getInvestorSuggestions",
  AuthMiddleware.authentify,
  suggestionController.getInvestorSuggestions
);

export default router;
