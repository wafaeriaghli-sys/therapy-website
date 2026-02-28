import { db } from "./db";
import { contactMessages, bookings, type InsertContactMessage, type InsertBooking, type ContactMessage, type Booking } from "@shared/schema";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }
}

export const storage = new DatabaseStorage();
