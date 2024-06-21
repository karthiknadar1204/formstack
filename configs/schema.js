const { pgTable, serial, varchar, text } = require("drizzle-orm/pg-core");

export const JsonForms=pgTable('JsonForms',{
    id:serial('id').primaryKey(),
    jsonform:text('jsonform').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull()
})