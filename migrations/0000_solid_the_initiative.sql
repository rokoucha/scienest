CREATE TABLE `article_links` (
	`title` text NOT NULL,
	`from` text NOT NULL,
	`to` text,
	`created_at` text NOT NULL,
	PRIMARY KEY(`from`, `to`),
	FOREIGN KEY (`from`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`to`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`scope` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`latest_content_id` text,
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
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_title_unique` ON `articles` (`title`);