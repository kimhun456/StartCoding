DROP DATABASE IF EXISTS learningC;
CREATE DATABASE IF NOT EXISTS learningC;
ALTER SCHEMA `learningC`  DEFAULT CHARACTER SET utf8;
use learningC;

DROP TABLE IF EXISTS `user`;
CREATE TABLE user(
	id VARCHAR(20) NOT NULL primary key,
	pw VARCHAR(100) NOT NULL,
	correctProblems TEXT,
	wrongProblems TEXT,
	percentage int);