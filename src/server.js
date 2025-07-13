import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth, clerkClient } from "@clerk/express";

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

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

// Endpoint seguro para asignar rol
app.post("/api/set-role", requireAuth(), async (req, res) => {
  const { userId, role } = req.body;

  console.log("🔐 userId:", userId);

  // Validación del rol
  if (!["cliente", "proveedor"].includes(role)) {
    return res.status(400).json({ error: "Rol inválido" });
  }

  try {
    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });
    console.log("✅ Metadata actualizada:", user.publicMetadata);
    res.json({ success: true, publicMetadata: user.publicMetadata });
  } catch (err) {
    console.error("❌ Error en la actualización:", err);
    res.status(500).json({ error: "Fallo asignando rol" });
  }
});

app.post("/api/aux", async (req, res) => {
  console.log("dale loco");

  console.log("ENTRANDO AUX", req.auth.session.userId);
});

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
