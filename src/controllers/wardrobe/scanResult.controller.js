import Controllers from "../controller.manager.js";
import { scanResultService } from "../../services/wardrobe/scanResult.service.js";

class ScanResultController extends Controllers {
  constructor() {
    super(scanResultService);
  }

  createScanner = async (req, res, next) => {
    try {
      const data = await this.service.createScanner(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getWardrobeItems = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = await this.service.getWardrobeItems(userId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  updateWardrobeItemAction = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const updatedItem = await this.service.updateWardrobeItemAction(
        req.body,
        userId
      );
      res.status(200).json({
        message: "Action updated successfully",
        item:
          Array.isArray(updatedItem) && updatedItem.length > 0
            ? updatedItem[0]
            : null,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const scanResultController = new ScanResultController();
