import { Router } from "express";
import path from "path";
import fs from "fs";
import { uploadWardrobeScanner } from "../helper/uploadFiles.js";
import FilesStorage from "../daos/models/user/filesStorage.model.js";

const router = Router();

router.post("/", uploadWardrobeScanner.array("archivos"), async (req, res) => {
  try {
    const { clerk_user_id } = req.query;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No se subieron archivos" });
    }

    const relativePath = req.carpetaDestino.replace(/\\/g, "/"); // En caso de Windows

    // Guarda cada archivo en la base de datos
    for (const file of req.files) {
      await FilesStorage.create({
        clerk_user_id: clerk_user_id,
        path: relativePath,
        original_name: file.originalname,
        name_stored: file.filename,
        type_extension: file.mimetype,
      });
    }

    const filesNames = req.files.map((f) => f.filename);

    res.status(200).json({
      message: "Archivos subidos y registrados correctamente",
      path: relativePath,
      files: filesNames,
    });
  } catch (err) {
    console.error("Error al subir archivos:", err);
    res.status(500).json({ message: "Error interno al guardar archivos" });
  }
});

// router.get("/:idTrackingFase", async (req, res) => {
//   const { idTrackingFase } = req.params;

//   try {
//     // Busca todos los archivos asociados a ese tracking
//     const archivos = await ArchivosTrackingFase.findAll({
//       where: { id_tracking_fase: idTrackingFase },
//     });

//     if (!archivos || archivos.length === 0) {
//       return res.status(404).json({ message: "No se encontraron archivos" });
//     }

//     // Asumiendo que todos los archivos tienen la misma ruta (como debe ser en tu lógica de upload)
//     const folderPath = path.join(archivos[0].ruta);

//     if (!fs.existsSync(folderPath)) {
//       return res.status(404).json({ message: "La carpeta física no existe" });
//     }

//     const baseUrl = `${req.protocol}://${req.get("host")}/${folderPath}`;

//     const archivosConUrl = archivos.map((archivo) => ({
//       nombre_original: archivo.nombre_original,
//       nombre_almacenado: archivo.nombre_almacenado,
//       url: `${baseUrl}/${archivo.nombre_almacenado}`,
//       tipo_ext: archivo.tipo_ext,
//       fecha_subida: archivo.fecha_subida,
//     }));

//     return res.status(200).json({ archivos: archivosConUrl });
//   } catch (error) {
//     console.error("Error al obtener archivos:", error);
//     return res
//       .status(500)
//       .json({ message: "Error al obtener archivos", error: error.message });
//   }
// });

export default router;
