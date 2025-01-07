CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE `needs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` text,
	`title` text NOT NULL,
	`description` text,
	`priority` integer DEFAULT 1,
	`type` text DEFAULT 'only',
	`value` real DEFAULT 0,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
