import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth, clerkClient } from "@clerk/express";
import path from "path";
import sequelize from "./db/connection.js";
import "./daos/models/index.js";

import uploadRouter from "./routes/upload.router.js";
import scanRouter from "./routes/scanResult.router.js";
import locationRouter from "./routes/location.router.js";

const app = express();
app.use(
  cors({
    origin: "*", // para pruebas
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
// app.use(clerkMiddleware());
// app.use(requireAuth());

app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use("/api/scan", scanRouter);
app.use("/api/archivo", express.static(path.resolve("archivo")));
app.use("/api/files", uploadRouter);
app.use("/api/location", locationRouter);

// Endpoint seguro para asignar rol
// Endpoint seguro para asignar rol
app.post("/api/set-role", requireAuth(), async (req, res) => {
  try {
    const { userId, role } = req.body;

    // Obtener el usuario autenticado desde Clerk
    const authenticatedUserId = req.auth.userId;

    console.log("🔐 Authenticated userId:", authenticatedUserId);
    console.log("📝 Requested userId:", userId);

    // Verificar que el usuario solo pueda actualizar su propio perfil
    if (authenticatedUserId !== userId) {
      return res.status(403).json({
        error: "No puedes actualizar el perfil de otro usuario",
      });
    }

    // Validación del rol
    if (!["cliente", "proveedor"].includes(role)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    // Actualizar metadata
    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
        roleAssignedAt: new Date().toISOString(),
        onboardingCompleted: true,
      },
    });

    console.log("✅ Metadata actualizada:", user.publicMetadata);

    res.json({
      success: true,
      publicMetadata: user.publicMetadata,
    });
  } catch (err) {
    console.error("❌ Error en la actualización:", err);

    // Log más detallado del error
    if (err.errors) {
      console.error("Clerk errors:", err.errors);
    }

    res.status(500).json({
      error: "Fallo asignando rol",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

sequelize.sync({ alter: true }).then(() => {
  console.log("📌 Modelos sincronizados con MySQL.");
});

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
