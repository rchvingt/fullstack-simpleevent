/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `session` MODIFY `expiresAt` DATETIME NOT NULL;
