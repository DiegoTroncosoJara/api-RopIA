import User from "./user/user.model.js";
import ScanResult from "./wardrobe/scanResult.model.js";
import WardrobeItem from "./wardrobe/wardrobeItem.model.js";

// RELACIONES CON SCAN RESULT
User.hasMany(ScanResult, { foreignKey: "user_id" });
ScanResult.belongsTo(User, { foreignKey: "user_id" });
WardrobeItem.hasMany(ScanResult, { foreignKey: "wardrobe_item_id" });
ScanResult.belongsTo(WardrobeItem, { foreignKey: "wardrobe_item_id" });

// RELACIONES CON WARDROBEITEM
User.hasMany(WardrobeItem, { foreignKey: "user_id" });
WardrobeItem.belongsTo(User, { foreignKey: "user_id" });

export { User, ScanResult, WardrobeItem };
