import prisma from '../config/db.js';

// Guest: Create Booking
export const createBooking = async (req, res) => {
  try {
    const { roomId, startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 1. Check if room exists
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // 2. Check Overlap (Double security)
    const existingBooking = await prisma.booking.findFirst({
      where: {
        roomId,
        status: { not: 'CANCELLED' },
        AND: [
          { startDate: { lt: end } },
          { endDate: { gt: start } }
        ]
      }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room is not available for these dates' });
    }

    // 3. Calculate total price (simplified logic)
    const days = (end - start) / (1000 * 60 * 60 * 24);
    const totalPrice = days * room.price;

    // 4. Create Booking
    const booking = await prisma.booking.create({
      data: {
        guestId: req.user.id,
        roomId,
        startDate: start,
        endDate: end,
        totalPrice
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Guest: Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({ where: { id: parseInt(id) } });

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.guestId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const updated = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status: 'CANCELLED' }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Owner: Get Bookings for their rooms
export const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        room: { ownerId: req.user.id }
      },
      include: { guest: { select: { name: true, email: true } }, room: true }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Dashboard Stats
export const getAdminStats = async (req, res) => {
    try {
        const totalRooms = await prisma.room.count();
        const totalBookings = await prisma.booking.count();
        const totalUsers = await prisma.user.count();
        
        res.json({ totalRooms, totalBookings, totalUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}