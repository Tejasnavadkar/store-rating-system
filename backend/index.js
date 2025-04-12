import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js'
import storeRoutes from './src/routes/store.routes.js'
import userRoutes from './src/routes/user.routes.js'
// require('events').setMaxListeners(20);

const app = express();

app.use(cors());
app.use(express.json());

// Routes will be added here

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/store',storeRoutes)
app.use('/api/v1/user',userRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));