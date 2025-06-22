CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"create_at" time DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
