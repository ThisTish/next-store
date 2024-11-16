CREATE TABLE IF NOT EXISTS "passwordResetTokens" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "passwordResetTokens_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
DROP TABLE "passwordResetToken";