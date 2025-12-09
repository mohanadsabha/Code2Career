import prisma from '../config/db.js';

// Owner: Create Room
export const createRoom = async (req, res) => {
  try {
    const { name, price, capacity, description } = req.body;
    const room = await prisma.room.create({
      data: {
        name, price, capacity, description,
        ownerId: req.user.id
      }
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Guest/Public: Get Rooms (With Filters & Availability)
export const getRooms = async (req, res) => {
  try {
    const { minPrice, maxPrice, capacity, checkIn, checkOut } = req.query;

    const where = {};

    // Price Filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Capacity Filter
    if (capacity) {
      where.capacity = { gte: parseInt(capacity) };
    }

    // Availability Filter (Prevent Overlap Logic)
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      // Exclude rooms that have a booking overlapping with requested dates
      where.bookings = {
        none: {
          status: { not: 'CANCELLED' }, // Ignore cancelled bookings
          AND: [
            { startDate: { lt: end } },
            { endDate: { gt: start } }
          ]
        }
      };
    }

    const rooms = await prisma.room.findMany({ where });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Owner: Update Room
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.room.findUnique({ where: { id: parseInt(id) }});

    if(room.ownerId !== req.user.id) return res.status(403).json({message: "Not your room"});

    const updated = await prisma.room.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};