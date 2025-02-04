PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_needs_prices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`need_id` integer NOT NULL,
	`local_id` integer NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
INSERT INTO `__new_needs_prices`("id", "need_id", "local_id", "amount", "created_at", "updated_at") SELECT "id", "need_id", "local_id", "amount", "created_at", "updated_at" FROM `needs_prices`;--> statement-breakpoint
DROP TABLE `needs_prices`;--> statement-breakpoint
ALTER TABLE `__new_needs_prices` RENAME TO `needs_prices`;--> statement-breakpoint
PRAGMA foreign_keys=ON;