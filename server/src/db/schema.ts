import { pgTable, text, time, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  address: text().notNull().unique(),
});

export const complaintsTable = pgTable("complaints", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => usersTable.id),  
  type: text().notNull(),
  description: text().notNull(),
  image: text("image").array(),
  location: text().notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  status: text().notNull(),
  createdAt: time("created_at").defaultNow().notNull(),
  updatedAt: time("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  complaints: many(complaintsTable),
}));

export const complaintsRelations = relations(complaintsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [complaintsTable.userId],
    references: [usersTable.id],
  }),
}));
