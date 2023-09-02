CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`scope` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`latest_content_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `contents` (
	`id` text PRIMARY KEY NOT NULL,
	`article_id` text NOT NULL,
	`scope` text NOT NULL,
	`text` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_title_unique` ON `articles` (`title`);