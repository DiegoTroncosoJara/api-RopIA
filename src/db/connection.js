import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306, // Asegurar que sea número
    dialect: "mysql",
    timezone: "+00:00",
    logging: false,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 50, // Aumenta el número máximo de conexiones
      min: 5, // Mantén algunas conexiones persistentes
      acquire: 60000,
      idle: 10000,
    },
  }
);

// Probar conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL establecida con éxito.");
  } catch (error) {
    console.error("❌ Error al conectar con MySQL:", error);
  }
};

testConnection();

export default sequelize;
