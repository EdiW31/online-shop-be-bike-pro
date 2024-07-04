/*
  Warnings:

  - You are about to alter the column `id` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `Order_id_key` ON `Order`;

-- DropIndex
DROP INDEX `Product_id_key` ON `Product`;

-- AlterTable
ALTER TABLE `Order` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Product` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
