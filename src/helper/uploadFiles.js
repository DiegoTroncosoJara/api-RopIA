import multer from "multer";
import path from "path";
import fs from "fs";

// Asegura que la carpeta exista
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Factory de storage para lógica personalizada
function createStorage(destinationFn) {
  return multer.diskStorage({
    destination: destinationFn,
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  });
}

function wardrobeScannerStorage(req, file, cb) {
  const { clerk_user_id } = req.query;
  if (!clerk_user_id) {
    return cb(new Error("Falta id user clerk para guardar archivos"), null);
  }
  const carpetaDestino = path.join("archivo", clerk_user_id);

  ensureDirExists(carpetaDestino);
  req.carpetaDestino = carpetaDestino;
  cb(null, carpetaDestino);
}

export const uploadWardrobeScanner = multer({
  storage: createStorage(wardrobeScannerStorage),
  limits: { fileSize: 100 * 1024 * 1024 },
});
