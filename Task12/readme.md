🎯 The objective of this task is to build a fully functional backend system that enables property owners, guests, and administrators to manage rooms and bookings efficiently. The system should support role-based access, allowing owners to create and manage rooms, guests to view availability and make or cancel bookings, and administrators to oversee all data. It must ensure accurate room availability, prevent overlapping bookings, maintain data integrity with timestamps, and provide filtering options for rooms by price and capacity. Overall, the goal is to deliver a reliable, secure, and well-structured backend that handles the complete lifecycle of rooms and reservations  



🧩Core Entities

      – responsible for creating and managing rooms.
      – contains essential details such as name, price, capacity, and status.
      – a visitor who browses and books available rooms.
      – a reservation that links a guest to a specific room over a defined date range.

🎯Requirements

1- Owners can:
Create new rooms.
Update existing room details.
View all bookings associated with their rooms.
2- Guests can:
Browse and view available rooms.
Make a booking by selecting check-in and check-out dates.
Cancel their own bookings.
3-System must:
Using Prisma for database
Add documents for code by using (postman or swagger)
Prevent overlapping bookings for the same room.
Display only rooms available within a selected date range.
Validate permissions for guests and owners.
Store basic timestamps, including createdAt and updatedAt.
Support room filtering by price and capacity.
Track booking status (PENDING, CONFIRMED, CANCELLED).
Provide endpoints for an admin dashboard.



Important NoteThis task dedicated specifically to this room booking management system, without including any other tasks or unrelated features. The repository should be clean, focused solely on this task, and have proper version control for the backend API implementation.
