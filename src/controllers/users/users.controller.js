import Controllers from "../controller.manager.js";
import { usersService } from "../../services/users/users.service.js";

class UsersController extends Controllers {
  constructor() {
    super(usersService);
  }

  createUser = async (req, res, next) => {
    try {
      const data = await this.service.createUser(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { idUserClerk } = req.params;
      const data = await this.service.updateUser(idUserClerk, req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export const usersController = new UsersController();
