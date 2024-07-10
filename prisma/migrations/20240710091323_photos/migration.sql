-- AlterTable
ALTER TABLE `Order` MODIFY `totalPrice` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `ProductPhoto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photoUrl` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductPhoto` ADD CONSTRAINT `ProductPhoto_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
