import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { clerkMiddleware, requireAuth, clerkClient } from '@clerk/express'

const app = express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(requireAuth())

// Endpoint seguro para asignar rol
app.post('/api/set-role', requireAuth(), async (req, res) => {
  console.log('req: ', req)

  console.log('ENTRANDO', req.auth.session.userId)
  const userId = req.auth.session.userId
  const { role } = req.body
  if (!['cliente', 'proveedor'].includes(role)) {
    return res.status(400).json({ error: 'Rol inválido.' })
  }
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role }
    })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Fallo asignando rol' })
  }
})

app.post('/api/aux', async (req, res) => {
  console.log('dale loco')

  console.log('ENTRANDO AUX', req.auth.session.userId)
})

const PORT = process.env.PORT || 8084
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`)
})
