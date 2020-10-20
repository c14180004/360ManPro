-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2020 at 08:58 PM
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
-- Table structure for table `child_panorama`
--

CREATE TABLE `child_panorama` (
  `id` int(11) NOT NULL,
  `id_parent` int(11) NOT NULL,
  `id_child` int(11) NOT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL,
  `z` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `child_panorama`
--

INSERT INTO `child_panorama` (`id`, `id_parent`, `id_child`, `x`, `y`, `z`) VALUES
(7, 8, 7, 324.61, -333.71, -4969.88),
(8, 7, 8, -2605.68, -637.73, -4208.56),
(9, 10, 11, -4339.88, 8.81, 2480.1),
(10, 11, 10, 3483.18, 265.11, 3563.48),
(12, 8, 9, -4908.38, -175.7, -884.11),
(13, 10, 12, -572.66, 302.58, 4952.67),
(14, 7, 9, 1888.26, -248.37, -4613.11);

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
(19, 'Pintu masuk perpustakaan', 'pintu masuk perpustakaan hanya dari sini', 'pointUpload/5f8dccc8e80c4.png'),
(20, 'Loker dan tempat peminjaman buku', 'loker untuk titip tas dan tempat peminjaman buku', 'pointUpload/5f8dccf04c908.png'),
(21, 'tengah perpus', 'tengah perpustakaan buat acara', 'pointUpload/5f8e678987704.png'),
(22, 'tangga lantai 2', 'lantai 2', 'pointUpload/5f8f0ccf0fb99.png'),
(23, 'lantai 2 rak', 'banyak rak di lantai 2', 'pointUpload/5f8f16e7bf513.png'),
(24, 'point 3 lantai 2', 'lesehan', 'pointUpload/5f8f30862169e.png');

-- --------------------------------------------------------

--
-- Table structure for table `tempat`
--

CREATE TABLE `tempat` (
  `id` int(11) NOT NULL,
  `nama` text NOT NULL,
  `detail` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tempat`
--

INSERT INTO `tempat` (`id`, `nama`, `detail`, `image`) VALUES
(5, 'Lantai 6', 'Lantai pertama perpustakaan', 'mapUpload/5f8dcc5f72911.png'),
(6, 'Lantai 7', 'lantai kedua perpustakaan', 'mapUpload/5f8dcc71370fc.png'),
(7, 'Lantai 8', 'lantai ketiga perpustakaan', 'mapUpload/5f8dcc8549d38.png');

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
(7, 5, 19, 481, 293),
(8, 5, 20, 512, 256),
(9, 5, 21, 464, 208),
(10, 6, 22, 520, 242),
(11, 6, 23, 421, 149),
(12, 6, 24, 494, 134);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `child_panorama`
--
ALTER TABLE `child_panorama`
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
-- AUTO_INCREMENT for table `child_panorama`
--
ALTER TABLE `child_panorama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `panorama`
--
ALTER TABLE `panorama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tempat`
--
ALTER TABLE `tempat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tempat_point`
--
ALTER TABLE `tempat_point`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
