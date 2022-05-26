CREATE TABLE `lasy_shop`.`shopping_cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT NULL,
  `address` MEDIUMTEXT NULL,
  `phone` INT NULL,
  `full_name` VARCHAR(255) NULL,
  `status` INT NULL,
  `is_deleted` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`));

ALTER TABLE `lasy_shop`.`shopping_cart` ADD INDEX `fk_user_shopping_cart_idx` (`user_id` ASC);
ALTER TABLE `lasy_shop`.`shopping_cart`
ADD CONSTRAINT `fk_user_shopping_cart`
  FOREIGN KEY (`user_id`)
  REFERENCES `lasy_shop`.`user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `lasy_shop`.`order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` INT NULL DEFAULT 0,
  `product_id` INT NULL,
  `shopping_cart_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_order_idx` (`product_id` ASC),
  INDEX `fk_shopping_cart_order_idx` (`shopping_cart_id` ASC),
  CONSTRAINT `fk_product_order`
    FOREIGN KEY (`product_id`)
    REFERENCES `lasy_shop`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shopping_cart_order`
    FOREIGN KEY (`shopping_cart_id`)
    REFERENCES `lasy_shop`.`shopping_cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


ALTER TABLE `lasy_shop`.`user` 
CHANGE COLUMN `phone` `phone` VARCHAR(100) NULL DEFAULT NULL ;

ALTER TABLE `lasy_shop`.`shopping_cart` 
CHANGE COLUMN `phone` `phone` VARCHAR(100) NULL DEFAULT NULL ;

ALTER TABLE `lasy_shop`.`product` 
ADD COLUMN `out_of_stock` INT NULL DEFAULT 0 AFTER `viewd`;

ALTER TABLE `lasy_shop`.`order` 
ADD COLUMN `color` VARCHAR(100) NULL AFTER `shopping_cart_id`,
ADD COLUMN `size` VARCHAR(100) NULL AFTER `color`;
