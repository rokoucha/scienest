CREATE TABLE `thumbnails` (
	`id` text PRIMARY KEY NOT NULL,
	`article_id` text NOT NULL,
	`url` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE articles ADD `thumbnail_id` text;--> statement-breakpoint
CREATE UNIQUE INDEX `thumbnails_article_id_unique` ON `thumbnails` (`article_id`);