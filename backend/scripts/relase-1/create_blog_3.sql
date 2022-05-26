CREATE TABLE IF NOT EXISTS `lasy_shop`.`blog_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `is_deleted` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lasy_shop`.`blog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lasy_shop`.`blog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `view` INT NULL DEFAULT 0,
  `content` VARCHAR(45) NULL,
  `liked` INT NULL DEFAULT 0,
  `image` TINYTEXT NULL,
  `is_deleted` INT NULL DEFAULT 0,
  `status` INT NULL,
  `blog_category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_blog_blog_category1_idx` (`blog_category_id` ASC),
  CONSTRAINT `fk_blog_blog_category1`
    FOREIGN KEY (`blog_category_id`)
    REFERENCES `lasy_shop`.`blog_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `lasy_shop`.`blog` 
ADD COLUMN `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER `blog_category_id`,
ADD COLUMN `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER `created_at`;


ALTER TABLE `lasy_shop`.`blog` 
CHANGE COLUMN `view` `viewd` INT(11) NULL DEFAULT '0' ,
CHANGE COLUMN `liked` `number_of_likes` INT(11) NULL DEFAULT '0' ;


ALTER TABLE `lasy_shop`.`blog` 
CHANGE COLUMN `content` `content` LONGTEXT NULL DEFAULT NULL ;
