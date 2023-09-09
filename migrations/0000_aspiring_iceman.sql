CREATE TABLE `article_links` (
	`article_id` text NOT NULL,
	`link_id` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`article_id`, `link_id`),
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`link_id`) REFERENCES `links`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`scope` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`latest_content_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `contents` (
	`id` text PRIMARY KEY NOT NULL,
	`article_id` text NOT NULL,
	`scope` text NOT NULL,
	`toc` text NOT NULL,
	`heading` text NOT NULL,
	`content` text NOT NULL,
	`raw` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `links` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_title_unique` ON `articles` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `links_text_unique` ON `links` (`text`);