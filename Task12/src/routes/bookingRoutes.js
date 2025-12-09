import express from 'express';
import { createBooking, cancelBooking, getOwnerBookings, getAdminStats } from '../controllers/bookingController.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Guest
router.post('/', verifyToken, authorize(['GUEST']), createBooking);
router.put('/cancel/:id', verifyToken, authorize(['GUEST']), cancelBooking);

// Owner
router.get('/owner', verifyToken, authorize(['OWNER']), getOwnerBookings);

// Admin
router.get('/admin/stats', verifyToken, authorize(['ADMIN']), getAdminStats);

export default router;