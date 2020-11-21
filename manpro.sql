-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2020 at 03:39 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manpro`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID_Admin` int(12) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID_Admin`, `Username`, `Password`, `Nama`) VALUES
(3, 'admin', '$2y$10$JqQMdTE2COeNXHBj20GCA.hSd76WVvYmuOoBTjOa5GN0NLOpE3Mam', 'jordan'),
(4, 'andrew', '$2y$10$5y0k8iuvGX4CmroNhlDYyuT5a.zb2txzJgYiDZFA1/fgPUdWFsV42', 'andrew');

-- --------------------------------------------------------

--
-- Table structure for table `child_panorama`
--

CREATE TABLE `child_panorama` (
  `id` int(11) NOT NULL,
  `nama` text NOT NULL,
  `id_parent` int(11) NOT NULL,
  `id_child` int(11) NOT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL,
  `z` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `gedung`
--

CREATE TABLE `gedung` (
  `id` int(11) NOT NULL,
  `nama` text NOT NULL,
  `detail` text NOT NULL,
  `icon` text NOT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gedung`
--

INSERT INTO `gedung` (`id`, `nama`, `detail`, `icon`, `x`, `y`) VALUES
(1, 'Gedung W', 'tempat perpustakaan dan  dan KJ', 'point', 1056, 401),
(2, 'Gedung P', 'Untuk jurusan teknik  ada kantinya enak-enak ada lab komputer dan lab industri', 'point', 1705, 603),
(10, 'atm', 'atm gedung w', 'atm', 1238, 484);

-- --------------------------------------------------------

--
-- Table structure for table `panorama`
--

CREATE TABLE `panorama` (
  `id` int(11) NOT NULL,
  `nama` text NOT NULL,
  `detail` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `panorama`
--

INSERT INTO `panorama` (`id`, `nama`, `detail`, `image`) VALUES
(2, 'Pintu masuk perpustakaan', 'Satu satunya pintu masuk perpustakaan', 'pointUpload/5fac80dd15900.png'),
(5, 'Kantin', 'kantin gedung P', 'pointUpload/5fac81f322e30.png'),
(7, 'aaaaaa', 'aaaaaaaaaaaa', 'pointUpload/5fb91adcb7e49.png');

-- --------------------------------------------------------

--
-- Table structure for table `tempat`
--

CREATE TABLE `tempat` (
  `id` int(11) NOT NULL,
  `nama` text NOT NULL,
  `detail` text NOT NULL,
  `id_gedung` int(11) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tempat`
--

INSERT INTO `tempat` (`id`, `nama`, `detail`, `id_gedung`, `image`) VALUES
(1, 'Lantai 6', 'pintu masuk perpustakaan', 1, 'mapUpload/5fac80a49e37e.png'),
(2, 'Lantai 7', 'lantai 2 perpustakaan', 1, 'mapUpload/5fac80b7b34e4.png'),
(3, 'Lantai 1', 'Tempat kantin dan lab  indus', 2, 'mapUpload/5fac81ce233fd.png'),
(4, 'Lantai 8', 'fasdf', 1, 'mapUpload/5fac9affdfbc7.png');

-- --------------------------------------------------------

--
-- Table structure for table `tempat_point`
--

CREATE TABLE `tempat_point` (
  `id` int(11) NOT NULL,
  `id_tempat` int(11) NOT NULL,
  `id_panorama` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tempat_point`
--

INSERT INTO `tempat_point` (`id`, `id_tempat`, `id_panorama`, `x`, `y`) VALUES
(2, 1, 2, 482, 293),
(5, 3, 5, 392, 223),
(7, 2, 7, 522, 270);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID_Admin`);

--
-- Indexes for table `child_panorama`
--
ALTER TABLE `child_panorama`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gedung`
--
ALTER TABLE `gedung`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `panorama`
--
ALTER TABLE `panorama`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tempat`
--
ALTER TABLE `tempat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tempat_point`
--
ALTER TABLE `tempat_point`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID_Admin` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `child_panorama`
--
ALTER TABLE `child_panorama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gedung`
--
ALTER TABLE `gedung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `panorama`
--
ALTER TABLE `panorama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tempat`
--
ALTER TABLE `tempat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tempat_point`
--
ALTER TABLE `tempat_point`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
