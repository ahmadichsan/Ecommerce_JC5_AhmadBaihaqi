-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1,	'ahmdichsan',	'688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6');

DROP TABLE IF EXISTS `bukti_bayar`;
CREATE TABLE `bukti_bayar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inv_code` varchar(255) NOT NULL,
  `bukti` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `prodName` varchar(255) NOT NULL,
  `prodPrice` int(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `DateOrder` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checkoutstat_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `cart` (`id`, `user_id`, `prod_id`, `prodName`, `prodPrice`, `qty`, `DateOrder`, `checkoutstat_id`) VALUES
(5,	3,	1,	'Fia Cake',	120000,	1,	'2018-08-26 10:05:34',	8),
(13,	3,	4,	'Muslimah',	80000,	2,	'2018-08-27 08:28:42',	3),
(14,	13,	2,	'PonyHorse Cake',	130000,	1,	'2018-08-27 08:29:05',	3),
(15,	7,	7,	'Blue Theme',	85000,	3,	'2018-08-27 08:29:40',	8),
(16,	17,	7,	'Blue Theme',	85000,	3,	'2018-08-27 11:49:21',	3),
(17,	17,	4,	'Muslimah',	80000,	2,	'2018-08-27 11:49:36',	3),
(19,	17,	2,	'PonyHorse Cake',	130000,	1,	'2018-08-27 12:09:11',	4),
(20,	19,	1,	'Fia Cake',	120000,	1,	'2018-08-27 14:28:39',	3),
(21,	19,	1,	'Fia Cake',	120000,	1,	'2018-08-27 14:37:07',	8),
(23,	17,	2,	'PonyHorse Cake',	130000,	1,	'2018-08-27 16:20:55',	3),
(24,	17,	1,	'Fia Cake',	120000,	1,	'2018-08-27 16:23:22',	1);

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `category` (`id`, `category`, `CreatedDate`, `UpdatedDate`) VALUES
(1,	'Birthday Cake',	'2018-08-25 14:15:35',	'2018-08-27 12:54:04'),
(2,	'CupCake',	'2018-08-25 14:15:44',	'2018-08-25 14:15:44'),
(3,	'Cake in Jar',	'2018-08-25 14:15:49',	'2018-08-25 14:15:49'),
(4,	'Wedding Cake',	'2018-08-25 14:15:55',	'2018-08-25 14:15:55'),
(5,	'Cookies',	'2018-08-25 14:16:15',	'2018-08-25 14:16:15');

DROP TABLE IF EXISTS `checkout`;
CREATE TABLE `checkout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `orderID` varchar(255) DEFAULT NULL,
  `prod_name` varchar(255) NOT NULL,
  `prod_price` int(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `subtotal` int(255) DEFAULT NULL,
  `ship_name` varchar(255) NOT NULL,
  `ship_add` varchar(255) NOT NULL,
  `ship_phone` varchar(25) NOT NULL,
  `bank` varchar(255) NOT NULL,
  `dev_meth` varchar(255) NOT NULL,
  `dev_price` int(255) NOT NULL,
  `itemstatus_id` int(11) NOT NULL,
  `orderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `checkout` (`id`, `user_id`, `cart_id`, `orderID`, `prod_name`, `prod_price`, `quantity`, `subtotal`, `ship_name`, `ship_add`, `ship_phone`, `bank`, `dev_meth`, `dev_price`, `itemstatus_id`, `orderDate`) VALUES
(2,	3,	5,	'00001',	'Fia Cake',	120000,	1,	120000,	'Ahmad Ichsan Baihaqi',	'Kalibata Indah',	'081310823820',	'Mandiri - 4097-6631-0869-3632',	'TiKi',	10000,	8,	'2018-08-27 07:41:18'),
(3,	3,	13,	'00002',	'Muslimah',	80000,	2,	160000,	'Ahmad Ichsan Baihaqi',	'Kalibata',	'081310823820',	'Mandiri - 4097-6631-0869-3632',	'SiCepat',	9000,	3,	'2018-08-27 08:28:50'),
(4,	13,	14,	'00003',	'PonyHorse Cake',	130000,	1,	130000,	'Rendi',	'Grogol',	'08123829388',	'Mandiri - 4097-6631-0869-3632',	'Pos Indonesia',	6000,	3,	'2018-08-27 08:29:12'),
(5,	7,	15,	'00004',	'Blue Theme',	85000,	1,	85000,	'Laura',	'Bogor',	'08127381911',	'BNI - 5264-2227-3113-6537',	'Go-Send',	20000,	8,	'2018-08-27 08:29:50'),
(8,	17,	16,	'00005',	'Blue Theme',	85000,	3,	255000,	'Ade',	'Palmerah',	'08232832999',	'Mandiri - 4097-6631-0869-3632',	'SiCepat',	9000,	3,	'2018-08-27 11:51:11'),
(9,	17,	17,	'00005',	'Muslimah',	80000,	2,	160000,	'Ade',	'Palmerah',	'08232832999',	'Mandiri - 4097-6631-0869-3632',	'SiCepat',	9000,	3,	'2018-08-27 11:51:11'),
(10,	17,	19,	'00006',	'PonyHorse Cake',	130000,	1,	130000,	'Ade',	'Palmerah',	'08232832999',	'Mandiri - 4097-6631-0869-3632',	'JNE',	15000,	4,	'2018-08-27 12:09:19'),
(11,	19,	20,	'00007',	'Fia Cake',	120000,	4,	480000,	'Ryan',	'Bogor Indah',	'081238734',	'BNI - 5264-2227-3113-6537',	'TiKi',	10000,	3,	'2018-08-27 14:29:06'),
(13,	19,	21,	'00008',	'Fia Cake',	120000,	3,	360000,	'Ryan',	'Bogor Indah',	'081238734',	'Mandiri - 4097-6631-0869-3632',	'Go-Send',	20000,	8,	'2018-08-27 14:38:42'),
(14,	17,	23,	'00009',	'PonyHorse Cake',	130000,	1,	130000,	'Ade',	'Palmerah',	'08232832999',	'Mandiri - 4097-6631-0869-3632',	'TiKi',	10000,	3,	'2018-08-27 16:21:01'),
(15,	17,	24,	'00010',	'Fia Cake',	120000,	1,	120000,	'Ade',	'Palmerah',	'08232832999',	'Mandiri - 4097-6631-0869-3632',	'TiKi',	10000,	1,	'2018-08-27 16:23:28');

DROP TABLE IF EXISTS `delivery`;
CREATE TABLE `delivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `method` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `delivery` (`id`, `method`, `price`) VALUES
(1,	'TiKi',	10000),
(2,	'Go-Send',	20000),
(3,	'JNE',	15000),
(4,	'SiCepat',	9000),
(5,	'Pos Indonesia',	6000),
(6,	'J&T',	10000);

DROP TABLE IF EXISTS `inv_detail`;
CREATE TABLE `inv_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `orderID` varchar(255) DEFAULT NULL,
  `INV` varchar(255) DEFAULT NULL,
  `prod_name` varchar(255) NOT NULL,
  `prod_price` int(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `subtotal` int(255) DEFAULT NULL,
  `ship_name` varchar(255) NOT NULL,
  `ship_add` varchar(255) NOT NULL,
  `ship_phone` varchar(25) NOT NULL,
  `bank` varchar(255) NOT NULL,
  `dev_meth` varchar(255) NOT NULL,
  `dev_price` int(255) NOT NULL,
  `itemstatus_id` int(11) NOT NULL,
  `orderDate` datetime NOT NULL,
  `confirmDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `inv_detail` (`id`, `user_id`, `orderID`, `INV`, `prod_name`, `prod_price`, `quantity`, `subtotal`, `ship_name`, `ship_add`, `ship_phone`, `bank`, `dev_meth`, `dev_price`, `itemstatus_id`, `orderDate`, `confirmDate`) VALUES
(1,	3,	'00001',	'00001',	'Fia Cake',	120000,	1,	120000,	'Ahmad Ichsan Baihaqi',	'Kalibata Indah',	'081310823820',	'Mandiri - 4097-6631-0869-3632',	'TiKi',	10000,	8,	'2018-08-27 07:41:18',	'2018-08-27 08:16:21'),
(2,	3,	'00002',	'00002',	'Muslimah',	80000,	2,	160000,	'Ahmad Ichsan Baihaqi',	'Kalibata',	'081310823820',	'Mandiri - 4097-6631-0869-3632',	'SiCepat',	9000,	3,	'2018-08-27 08:28:50',	'2018-08-27 08:29:26'),
(3,	13,	'00003',	'00003',	'PonyHorse Cake',	130000,	1,	130000,	'Rendi',	'Grogol',	'08123829388',	'Mandiri - 4097-6631-0869-3632',	'Pos Indonesia',	6000,	3,	'2018-08-27 08:29:12',	'2018-08-27 08:29:27'),
(4,	7,	'00004',	'00004',	'Blue Theme',	85000,	1,	85000,	'Laura',	'Bogor',	'08127381911',	'BNI - 5264-2227-3113-6537',	'Go-Send',	20000,	8,	'2018-08-27 08:29:50',	'2018-08-27 08:30:01'),
(5,	17,	'00005',	'00005',	'Blue Theme',	85000,	3,	255000,	'Ade',	'Palmerah',	'08232832999',	'Mandiri - 4097-6631-0869-3632',	'SiCepat',	9000,	3,	'2018-08-27 11:51:11',	'2018-08-27 11:52:04'),
(6,	17,	'00005',	'00005',	'Muslimah',	80000,	2,	160000,	'Ade',	'Palmerah',	'08232832999',	'Mandiri - 4097-6631-0869-3632',	'SiCepat',	9000,	3,	'2018-08-27 11:51:11',	'2018-08-27 11:52:04'),
(7,	19,	'00007',	'00006',	'Fia Cake',	120000,	4,	480000,	'Ryan',	'Bogor Indah',	'081238734',	'BNI - 5264-2227-3113-6537',	'TiKi',	10000,	3,	'2018-08-27 14:29:06',	'2018-08-27 14:29:57'),
(8,	19,	'00008',	'00007',	'Fia Cake',	120000,	3,	360000,	'Ryan',	'Bogor Indah',	'081238734',	'Mandiri - 4097-6631-0869-3632',	'Go-Send',	20000,	8,	'2018-08-27 14:38:42',	'2018-08-27 14:39:09'),
(9,	17,	'00009',	'00008',	'PonyHorse Cake',	130000,	1,	130000,	'Ade',	'Palmerah',	'08232832999',	'Mandiri - 4097-6631-0869-3632',	'TiKi',	10000,	3,	'2018-08-27 16:21:01',	'2018-08-27 16:22:14');

DROP TABLE IF EXISTS `inv_header`;
CREATE TABLE `inv_header` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `INV` varchar(255) DEFAULT NULL,
  `grandtotal` int(255) DEFAULT NULL,
  `itemstatus_id` int(11) NOT NULL,
  `orderDate` datetime NOT NULL,
  `confirmDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `inv_header` (`id`, `user_id`, `INV`, `grandtotal`, `itemstatus_id`, `orderDate`, `confirmDate`) VALUES
(1,	3,	'00001',	130000,	8,	'2018-08-27 07:41:18',	'2018-08-27 08:16:21'),
(2,	3,	'00002',	169000,	3,	'2018-08-27 08:28:50',	'2018-08-27 08:29:26'),
(3,	13,	'00003',	136000,	3,	'2018-08-27 08:29:12',	'2018-08-27 08:29:27'),
(4,	7,	'00004',	105000,	8,	'2018-08-27 08:29:50',	'2018-08-27 08:30:01'),
(5,	17,	'00005',	424000,	3,	'2018-08-27 11:51:11',	'2018-08-27 11:52:04'),
(6,	19,	'00006',	490000,	3,	'2018-08-27 14:29:06',	'2018-08-27 14:29:57'),
(7,	19,	'00007',	380000,	8,	'2018-08-27 14:38:42',	'2018-08-27 14:39:09'),
(8,	17,	'00008',	140000,	3,	'2018-08-27 16:21:01',	'2018-08-27 16:22:14');

DROP TABLE IF EXISTS `itemstatus`;
CREATE TABLE `itemstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `itemstatus` (`id`, `status`) VALUES
(1,	'unpaid'),
(2,	'cart'),
(3,	'paid'),
(4,	'failed'),
(5,	'process'),
(6,	'expired'),
(7,	'beingsent'),
(8,	'delivered');

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) NOT NULL,
  `prod_img` varchar(255) DEFAULT NULL,
  `prod_name` varchar(255) NOT NULL,
  `prod_price` int(255) NOT NULL,
  `prod_desc` varchar(255) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product` (`id`, `cat_id`, `prod_img`, `prod_name`, `prod_price`, `prod_desc`, `CreatedDate`, `UpdatedDate`) VALUES
(1,	1,	'box1.jpg',	'Fia Cake',	120000,	'Kue ulang tahun Fia',	'2018-08-25 14:16:55',	'2018-08-27 12:45:03'),
(2,	1,	'box2.jpg',	'PonyHorse Cake',	130000,	'Kuda Poni Cake',	'2018-08-25 14:51:08',	'2018-08-25 14:51:08'),
(3,	2,	'box3.jpg',	'Sailor Cupcake',	90000,	'Cupcake Sailor',	'2018-08-25 14:54:07',	'2018-08-25 14:54:07'),
(4,	2,	'box4.jpg',	'Muslimah',	80000,	'Muslimah Cupcake',	'2018-08-25 14:54:50',	'2018-08-25 14:54:50'),
(5,	5,	'box8.jpg',	'PonyHorse',	65000,	'PonyHorse Cookie',	'2018-08-25 15:16:15',	'2018-08-25 15:16:15'),
(6,	4,	'box6.jpg',	'White Wedding Celebration',	1250000,	'Wedding Celebration',	'2018-08-25 15:18:22',	'2018-08-25 15:18:22'),
(7,	2,	'box7.jpg',	'Blue Theme',	85000,	'Blue Theme',	'2018-08-27 08:13:04',	'2018-08-27 08:13:04');

DROP TABLE IF EXISTS `userprofile`;
CREATE TABLE `userprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `birth` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `userprofile` (`id`, `fullname`, `birth`, `username`, `password`, `gender`, `phone`, `email`, `address`, `CreatedDate`, `UpdatedDate`) VALUES
(3,	'Ahmad Ichsan Baihaqi',	'1995-11-10',	'ahmad',	'688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6',	'Man',	'081310823820',	'ahmad@mail.com',	'Kalibata',	'2018-08-01 14:33:03',	'2018-08-27 07:49:41'),
(7,	'Laura',	'1994-02-03',	'laura',	'688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6',	'Woman',	'08127381911',	'laura@mail.com',	'Bogor',	'2018-08-01 22:34:32',	'2018-08-26 08:11:30'),
(9,	'Vincent',	'1995-03-08',	'vincent',	'688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6',	'Man',	'08238743922',	'vincent@mail.com',	'Palmerah',	'2018-08-01 23:02:10',	'2018-08-26 08:11:34'),
(13,	'Rendi',	'2018-08-11',	'rendi',	'688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6',	'Man',	'08123829388',	'rendi@mail.com',	'Grogol',	'2018-08-26 08:09:37',	'2018-08-26 08:09:37'),
(15,	'Okky Saputra',	'1991-02-06',	'okky',	'688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6',	'Man',	'08128532811',	'okky@mail.com',	'Bekasi',	'2018-08-27 10:55:21',	'2018-08-27 10:55:21'),
(17,	'Ade',	'2018-08-02',	'ade',	'688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6',	'Man',	'08232832999',	'ade@mail.com',	'Palmerah',	'2018-08-27 11:48:52',	'2018-08-27 11:48:52'),
(19,	'Ryan',	'2018-08-02',	'ryan',	'688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6',	'Man',	'081238734',	'ryan@mail',	'Bogor Indah',	'2018-08-27 14:27:44',	'2018-08-27 14:28:04');

-- 2018-09-18 02:11:43
