CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`need_id` integer,
	`income_id` integer,
	`category_id` integer,
	`title` text,
	`description` text,
	`created_at` integer DEFAULT current_timestamp,
	`amount` real DEFAULT 0 NOT NULL,
	`priority` integer DEFAULT 1,
	`type` text DEFAULT 'unique',
	`recurrence` integer,
	`status` text DEFAULT 'pending',
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE `incomes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`description` text,
	`currency` text,
	`created_at` integer DEFAULT current_timestamp,
	`amount` real DEFAULT 0 NOT NULL,
	`type` text DEFAULT 'unique',
	`recurrence` integer,
	`status` text DEFAULT 'pending',
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE `locals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE `needs_prices` (
	`need_id` integer NOT NULL,
	`local_id` integer NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`income_id` integer,
	`expense_id` integer,
	`income_expense_id` integer,
	`created_at` integer DEFAULT current_timestamp,
	`amount` real DEFAULT 0 NOT NULL,
	`local_id` integer,
	`observation` text,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_needs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer,
	`title` text NOT NULL,
	`description` text,
	`priority` integer DEFAULT 1,
	`type` text DEFAULT 'unique',
	`recurrence` integer,
	`amount` real DEFAULT 0,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
INSERT INTO `__new_needs`("id", "category_id", "title", "description", "priority", "type", "recurrence", "amount", "created_at", "updated_at") SELECT "id", "category_id", "title", "description", "priority", "type", "recurrence", "amount", "created_at", "updated_at" FROM `needs`;--> statement-breakpoint
DROP TABLE `needs`;--> statement-breakpoint
ALTER TABLE `__new_needs` RENAME TO `needs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;