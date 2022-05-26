ALTER TABLE `lasy_shop`.`user` 
ADD COLUMN `verified_token` MEDIUMTEXT NULL AFTER `status`,
ADD COLUMN `email_verified` INT NULL DEFAULT 0 AFTER `verified_token`;
