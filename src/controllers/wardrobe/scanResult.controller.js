import Controllers from "../controller.manager.js";
import { scanResultService } from "../../services/wardrobe/scanResult.service.js";

class ScanResultController extends Controllers {
  constructor() {
    super(scanResultService);
  }

  // createFase = async (req, res, next) => {
  //   try {
  //     const data = await this.service.createFase(req.body);
  //     res.json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // cerrarFase = async (req, res, next) => {
  //   try {
  //     const data = await this.service.cerrarFase(req.body);
  //     res.json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  createScanner = async (req, res, next) => {
    try {
      await this.service.createScanner(req.body);
      res.status(200).send();
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
}

export const scanResultController = new ScanResultController();
