const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { connectDB } = require('./backend/config/db')

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Root route for health check
app.get('/', (req, res) => {
  res.send('Welcome Ceramic API Running')
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API routes are active' })
})

// Import routes from the backend folder
const authRoutes = require('./backend/routes/authRoutes')
const userRoutes = require('./backend/routes/userRoutes')
const categoryRoutes = require('./backend/routes/categoryRoutes')
const productRoutes = require('./backend/routes/productRoutes')
const stockMovementRoutes = require('./backend/routes/stockMovementRoutes')
const inventoryRoutes = require('./backend/routes/inventoryRoutes')
const supplierRoutes = require('./backend/routes/supplierRoutes')
const purchaseOrderRoutes = require('./backend/routes/purchaseOrderRoutes')
const warehouseRoutes = require('./backend/routes/warehouseRoutes')

// Register routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/movements', stockMovementRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/suppliers', supplierRoutes)
app.use('/api/orders', purchaseOrderRoutes)
app.use('/api/warehouses', warehouseRoutes)

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()
