-- AlterTable
ALTER TABLE `Users` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
