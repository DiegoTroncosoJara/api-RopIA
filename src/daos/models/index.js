import User from "./user/user.model.js";
import ScanResult from "./wardrobe/scanResult.model.js";
import WardrobeItem from "./wardrobe/wardrobeItem.model.js";
import Provider from "./provider/provider.model.js";
import Location from "./location/location.model.js";
import Services from "./services/services.model.js";

// RELACIONES CON SCAN RESULT
User.hasMany(ScanResult, { foreignKey: "user_id" });
ScanResult.belongsTo(User, { foreignKey: "user_id" });
WardrobeItem.hasMany(ScanResult, { foreignKey: "wardrobe_item_id" });
ScanResult.belongsTo(WardrobeItem, { foreignKey: "wardrobe_item_id" });

// RELACIONES CON WARDROBEITEM
User.hasMany(WardrobeItem, { foreignKey: "user_id" });
WardrobeItem.belongsTo(User, { foreignKey: "user_id" });

// RELACION PROVEEDOR Y USUARIO
User.hasOne(Provider, { foreignKey: "user_id" });
Provider.belongsTo(User, { foreignKey: "user_id" });

// RELACION PROVEEDOR Y LOCATIONS
Provider.hasMany(Location, { foreignKey: "provider_id" });
Location.belongsTo(Provider, { foreignKey: "provider_id" });

// RELACION PROVEEDOR Y SERVICES: Un proveedor puede tener varios servicios
Provider.hasMany(Services, { foreignKey: "provider_id" });
Services.belongsTo(Provider, { foreignKey: "provider_id" });

// RELACION LOCATIONS CON SERVICES
Location.hasMany(Services, { foreignKey: "id_location", as: "services" });
Services.belongsTo(Location, { foreignKey: "id_location", as: "location" });

export { User, ScanResult, WardrobeItem, Provider, Location, Services };
