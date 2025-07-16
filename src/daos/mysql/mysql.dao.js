export default class MysqlDao {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) throw new Error("No encontrado");
      return await item.update(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) throw new Error("No encontrado");
      await item.destroy();
      return { message: "Eliminado correctamente" };
    } catch (error) {
      throw new Error(error);
    }
  }

  async bulkUpdate(where, params) {
    try {
      const [updatedCount] = await this.model.update(
        params, // los nuevos valores
        { where } // la condición
      );
      return updatedCount; // opcional: te devuelvo cuántos registros se actualizaron
    } catch (error) {
      throw new Error(error);
    }
  }

  async bulkCreate(data) {
    try {
      return await this.model.bulkCreate(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
