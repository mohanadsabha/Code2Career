import express from 'express';
import { createRoom, getRooms, updateRoom } from '../controllers/roomController.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public: Browse
router.get('/', getRooms);

// Owner: Create & Update
router.post('/', verifyToken, authorize(['OWNER']), createRoom);
router.put('/:id', verifyToken, authorize(['OWNER']), updateRoom);

export default router;