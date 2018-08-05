-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2018 at 05:29 PM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'ahmdichsan', 'asd');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `prodName` varchar(255) NOT NULL,
  `prodPrice` int(255) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `prod_id`, `prodName`, `prodPrice`, `qty`) VALUES
(13, 3, 1, 'Fia\'s Cake', 250000, 1),
(14, 3, 2, 'PonyHorse Cakes', 250000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `totalprod` int(11) NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`, `totalprod`, `CreatedDate`, `UpdatedDate`) VALUES
(1, 'Birthday Cake', 3, '2018-07-30 21:38:06', '2018-07-30 21:44:35'),
(2, 'Wedding Cake', 1, '2018-07-30 21:38:13', '2018-07-30 21:41:24'),
(3, 'Cupcake', 6, '2018-07-30 21:38:17', '2018-08-03 17:16:57'),
(4, 'Cake in Jar', 0, '2018-07-30 21:38:23', '2018-07-30 21:38:23'),
(5, 'Cookies', 1, '2018-07-30 21:38:29', '2018-07-30 21:42:29');

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `prod_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `method` varchar(255) NOT NULL,
  `price` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`id`, `method`, `price`) VALUES
(1, 'TiKi', 10000),
(2, 'Go-Send', 20000),
(3, 'JNE', 15000),
(4, 'SiCepat', 9000),
(5, 'Pos Indonesia', 6000),
(6, 'J&T', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `inv_detail`
--

CREATE TABLE `inv_detail` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `prod_name` int(11) NOT NULL,
  `prod_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `prod_img` varchar(255) DEFAULT NULL,
  `prod_name` varchar(255) NOT NULL,
  `prod_price` int(255) NOT NULL,
  `prod_desc` varchar(255) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `cat_id`, `prod_img`, `prod_name`, `prod_price`, `prod_desc`, `CreatedDate`, `UpdatedDate`) VALUES
(1, 1, 'box1.jpg', 'Fia\'s Cake', 250000, 'Kue Ulang Tahun Fia', '2018-07-30 21:39:04', '2018-07-30 21:39:04'),
(2, 1, 'box2.jpg', 'PonyHorse Cakes', 250000, 'Kue Ulang Tahun Kuda Poni', '2018-07-30 21:39:29', '2018-08-02 15:13:58'),
(4, 3, 'box4.jpg', 'Muslimah', 85000, 'Muslimah Theme', '2018-07-30 21:40:23', '2018-07-30 21:40:23'),
(5, 3, 'box5.jpg', 'Fancy Cupcake', 98000, 'This is a Fancy Cupcake', '2018-07-30 21:40:54', '2018-07-30 21:40:54'),
(6, 2, 'box6.jpg', 'Wedding Celebration', 950000, 'Wedding Cake', '2018-07-30 21:41:24', '2018-07-30 21:41:24'),
(7, 3, 'box7.jpg', 'Blue Theme', 80000, 'Blue Theme Cupcake', '2018-07-30 21:41:53', '2018-07-30 21:41:53'),
(8, 5, 'box8.jpg', 'PonyHorse Cookie', 50000, 'PonyHorse Cookie', '2018-07-30 21:42:29', '2018-07-30 21:42:29'),
(9, 3, 'box9.jpg', 'Engagement ', 88000, 'Engagement Theme', '2018-07-30 21:43:50', '2018-07-30 21:43:50'),
(10, 3, 'box10.jpg', 'Graduation', 85000, 'Celebrating Graduation', '2018-07-30 21:44:15', '2018-07-30 21:44:15'),
(11, 1, 'box11.jpg', 'Pinky Cake', 100000, 'Pinky Theme Cake', '2018-07-30 21:44:35', '2018-07-30 21:44:35');

-- --------------------------------------------------------

--
-- Table structure for table `userprofile`
--

CREATE TABLE `userprofile` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `birth` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userprofile`
--

INSERT INTO `userprofile` (`id`, `fullname`, `birth`, `username`, `password`, `gender`, `phone`, `email`, `address`, `CreatedDate`, `UpdatedDate`) VALUES
(3, 'Ahmad Ichsan Baihaqi', '1995-11-10', 'ahmad', 'asd', 'Man', '081310823820', 'ahmad@mail.com', 'Kalibata', '2018-08-01 14:33:03', '2018-08-01 14:35:05'),
(7, 'Laura', '1994-02-03', 'laura', 'asd', 'Woman', '08127381911', 'laura@mail.com', 'Bogor', '2018-08-01 22:34:32', '2018-08-01 22:34:32'),
(9, 'Vincent', '1995-03-08', 'vincent', 'asd', 'Man', '08238743922', 'vincent@mail.com', 'Palmerah', '2018-08-01 23:02:10', '2018-08-01 23:02:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `prod_id` (`prod_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_fk0` (`cat_id`);

--
-- Indexes for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `userprofile`
--
ALTER TABLE `userprofile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userprofile` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_fk0` FOREIGN KEY (`cat_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
