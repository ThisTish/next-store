import {
	boolean,
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	pgEnum,
	serial,
	real,
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "next-auth/adapters"
import { createId } from '@paralleldrive/cuid2'
import { describe } from "node:test"
import { relations } from "drizzle-orm"


export const RoleEnum = pgEnum('roles', ['user', 'admin'])

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	password: text("password"),
	image: text("image"),
	twoFactorEnabled: boolean('twoFactorEnabled').default(false),
	role: RoleEnum('roles').default('user')
})

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
)

export const emailTokens = pgTable(
	"emailTokens",
	{
		id: text("id").notNull().$defaultFn(() => createId()),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
		email: text("email").notNull()
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.id, verificationToken.token],
		}),
	})
)

export const passwordResetTokens = pgTable(
	"passwordResetTokens",
	{
		id: text("id").notNull().$defaultFn(() => createId()),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
		email: text("email").notNull()
	},
	(verificationToken) => ({
		compositePk: primaryKey(
			verificationToken.id, verificationToken.token
		)
	})
)


export const twoFactorTokens = pgTable(
	"twoFactorTokens",
	{
		id: text("id").notNull().$defaultFn(() => createId()),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
		email: text("email").notNull(),
		userId: text("userId").references(() => users.id, { onDelete: "cascade" })
	},
	(verificationToken) => ({
		compositePk: primaryKey(verificationToken.id, verificationToken.token
		)
	})
)


export const products = pgTable(
	"products",
	{
		id: serial('id').primaryKey(),
		description: text('description').notNull(),
		title: text('title').notNull(),
		created: timestamp('created', { mode: 'date' }).notNull(),
		price: real('price').notNull()
	}
)

export const productVariants = pgTable('productVariants',{
	id: serial('id').primaryKey(),
	color: text('color').notNull(),
	productType: text('productType').notNull(),
	updated: timestamp('updated').defaultNow(),
	productId: serial('productId').notNull().references(() => products.id, {onDelete: 'cascade'})
})
export const variantImages = pgTable('variantImages',{
	id: serial('id').primaryKey(),
	url: text('url').notNull(),
	size: real('size').notNull(),
	name: text('name').notNull(),
	order: real('order').notNull(),
	variantId: serial('variantId').notNull().references(() => productVariants.id, {onDelete: 'cascade'})
})

export const variantTags = pgTable('variantTags',{
	id: serial('id').primaryKey(),
	tag: text('tag').notNull(),
	variantId: serial('variantId').notNull().references(() => productVariants.id, {onDelete: 'cascade'})
})

export const productRelations = relations(products, ({many}) => ({
	productVariants: many(productVariants, {relationName: 'productVariants'}),
}))

export const productVariantsRelations = relations(productVariants, ({many, one}) => ({
	product: one(products, {
		fields:[productVariants.productId],
		references: [products.id],
		relationName: 'productVariants'
	}),
	variantImages: many(variantImages, {relationName: 'variantImages'}),
	variantTags: many(variantTags, {relationName: 'variantTags'})
}))

export const variantImagesRelations = relations(variantImages, ({one}) => ({
	productVariants: one(productVariants,{
		fields: [variantImages.variantId],
		references: [productVariants.id],
		relationName: 'variantImages'
	})
}))

export const variantTagsRelations = relations(variantTags, ({one}) => ({
	productVariants: one(productVariants,{
		fields: [variantTags.variantId],
		references: [productVariants.id],
		relationName: 'variantImages'
	})
}))