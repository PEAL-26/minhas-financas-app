PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`need_id` integer,
	`income_id` integer,
	`category_id` integer,
	`title` text NOT NULL,
	`description` text,
	`date` integer NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`priority` integer DEFAULT 1,
	`type` text DEFAULT 'unique',
	`recurrence` integer,
	`status` text DEFAULT 'pending',
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
INSERT INTO `__new_expenses`("id", "need_id", "income_id", "category_id", "title", "description", "date", "amount", "priority", "type", "recurrence", "status", "created_at", "updated_at") SELECT "id", "need_id", "income_id", "category_id", "title", "description", "date", "amount", "priority", "type", "recurrence", "status", "created_at", "updated_at" FROM `expenses`;--> statement-breakpoint
DROP TABLE `expenses`;--> statement-breakpoint
ALTER TABLE `__new_expenses` RENAME TO `expenses`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_incomes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`currency` text,
	`date` integer NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`type` text DEFAULT 'unique',
	`recurrence` integer,
	`status` text DEFAULT 'pending',
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
INSERT INTO `__new_incomes`("id", "title", "description", "currency", "date", "amount", "type", "recurrence", "status", "created_at", "updated_at") SELECT "id", "title", "description", "currency", "date", "amount", "type", "recurrence", "status", "created_at", "updated_at" FROM `incomes`;--> statement-breakpoint
DROP TABLE `incomes`;--> statement-breakpoint
ALTER TABLE `__new_incomes` RENAME TO `incomes`;--> statement-breakpoint
ALTER TABLE `transactions` ADD `title` text NOT NULL;