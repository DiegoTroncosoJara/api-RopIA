import { Router } from "express";

export class BaseRouter {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  // Debes implementar este método en las subclases
  registerRoutes() {
    throw new Error("registerRoutes() must be implemented in subclass");
  }

  getRouter() {
    return this.router;
  }
}
