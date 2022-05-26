CREATE TABLE `lasy_shop`.`category_level_0` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `is_deleted` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`));

CREATE TABLE `lasy_shop`.`category_level_1` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `is_deleted` INT NULL DEFAULT 0,
  `category_level_0_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_category_leve1_idx` (`category_level_0_id` ASC),
  CONSTRAINT `fk_category_leve1`
    FOREIGN KEY (`category_level_0_id`)
    REFERENCES `lasy_shop`.`category_level_0` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `lasy_shop`.`category` 
ADD COLUMN `category_level_1_id` INT NULL AFTER `is_deleted`,
ADD INDEX `fk_category_idx` (`category_level_1_id` ASC);

ALTER TABLE `lasy_shop`.`category` 
ADD CONSTRAINT `fk_category`
  FOREIGN KEY (`category_level_1_id`)
  REFERENCES `lasy_shop`.`category_level_1` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

