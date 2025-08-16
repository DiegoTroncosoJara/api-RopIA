import MysqlDao from "../mysql.dao.js";
import { Services } from "../../models/index.js";

class ServicesDaoMysql extends MysqlDao {
  constructor() {
    super(Services);
  }
}

export const servicesDao = new ServicesDaoMysql();
