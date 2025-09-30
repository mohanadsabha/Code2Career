/*
  Warnings:

  - You are about to drop the column `Role` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_owner_fkey`;

-- DropIndex
DROP INDEX `Course_owner_fkey` ON `course`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `Role`,
    ADD COLUMN `role` ENUM('STUDENT', 'ADMIN', 'COACH') NOT NULL DEFAULT 'STUDENT';

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_owner_fkey` FOREIGN KEY (`owner`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
