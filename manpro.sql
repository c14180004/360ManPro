-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2020 at 04:16 PM
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

--
-- Dumping data for table `child_panorama`
--

INSERT INTO `child_panorama` (`id`, `nama`, `id_parent`, `id_child`, `x`, `y`, `z`) VALUES
(10, 'pintu masuk perppustakaan - Tempat titip barang', 8, 9, -2600.6, -623.44, -4213.87),
(11, 'Tempat titip barang - pintu masuk perpustakaan', 9, 8, 330.66, -342.62, -4969.21),
(12, 'Tempat titip barang - Ruang tengah perpustakaan', 9, 10, -4895.59, -211.24, -955.95),
(13, 'Tempat titip barang - Fotocopy  peerpus', 9, 12, -3108.96, -49.91, -3904.87),
(14, 'Ruang tengah perpus - Fotocopy perpus', 10, 12, 2248.03, 6.43, -4458.23),
(15, 'Ruang tengah perpus - Assitance Corner', 10, 11, -1651.05, -33.46, -4713.2),
(16, 'Ruang tengah perpus - Tempat titip barang', 10, 9, 4568.33, 8.53, 2031.17),
(17, 'Assistance Corner - Ruang tengah perpus', 11, 10, 216.97, 55.09, -4986.46),
(18, 'Assistance Corner - Fotocopy perpus', 11, 12, -4955.62, -61.87, -614.42),
(19, 'Fotocopy perpus = Ruang tengah perpus', 12, 10, 4245.13, 74.06, -2625.54),
(20, 'Fotocopy perpus - Tempat titip barang', 12, 9, 1558.79, 19.88, -4749.19),
(21, 'Fotocopy perpus - Assistance corner', 12, 11, 4557.73, 98.26, 2044.8),
(22, 'Naik lantai 7 - Area buku 1', 13, 14, -4331.18, 72.4, 2491.67),
(23, 'Naik lantai 7 - Toilet lantai 7', 13, 17, 3003.12, 175.85, 3984.22),
(24, 'Area buku 1 - Area buku 2', 14, 15, -4739.28, -124.75, 1573.11),
(25, 'Area buku 1 - Naik lantai 7', 14, 13, 3553.04, 214.57, 3496.43),
(26, 'Area buku 2 - Area buku 1', 15, 14, 4812.1, 25.71, -1329.12),
(27, 'Area buku 2 - Tempat lesehan lantai 7', 15, 16, -4360.52, -195.34, 2423.47),
(28, 'Area buku 2 - Toilet lantai 7', 15, 17, 1743.36, 75.34, 4676.01),
(29, 'Tempat lesehan lantai 7 - Area buku 2', 16, 15, -820.36, -428.55, -4905.53),
(30, 'Tempat lesehan lantai 7 - Toliet lantai 7', 16, 17, 4980.41, 75.91, -316.85),
(31, 'Toilet lantai 7 - Tempat lesehan lantai 7', 17, 16, -711.31, -53.65, 4940.6),
(32, 'Toilet lantai 7 - Area buku 2', 17, 15, -4051.79, 115.95, 2920.25),
(33, 'Toilet lantai 7 - Naik lantai 7', 17, 13, -3531.41, -7.45, -3529.55),
(34, 'Naik lantai 8 - Tempat lesehan lantai 8', 18, 19, 4132.84, 178.54, -2790.93),
(35, 'Naik lantai 8 - Meja 2 lantai 8', 18, 21, -2271.58, 11.61, -4446),
(36, 'Tempat lesehan lantai 8 - Meja 1 lantai 8', 19, 20, -1307, 17.03, 4818.39),
(37, 'Tempat lesehan lantai 8 - Naik Lanti 8', 19, 18, 4973.53, 274.58, 299.23),
(38, 'Meja 1 lantai 8 - Tempat lesehan lantai 8', 20, 19, 4969.79, 77.63, 518.17),
(39, 'Meja 1 lantai 8 - Meja 2 lantai 8', 20, 21, -1327.28, -14.77, 4813.04),
(40, 'Meja 2 lantai 8 - Meja 1 lantai 8', 21, 20, -2166.43, -0.79, 4500.06),
(41, 'Meja 2 lantai 8 - Naik lantai 8', 21, 18, -4584.26, -25.56, -1987.82),
(42, 'Ruang nonton film', 22, 23, -3648.55, -272.32, 3397.72),
(43, 'Ruang nonton film', 23, 22, -908.15, -496.08, -4883.55);

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
(11, 'Gedung W', 'Tempat KJ(Kolam Jodoh) dan Perpustakaan', 'building', 1573, 1833),
(12, 'Gedung P', 'Tempat jurusan teknik banyak lab-nya', 'building', 1755, 1498);

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
(8, 'Pintu masuk perpustakaan', 'Satu - satunya pintu masuk perpustakaan bisa lewat lift atau tangga', 'pointUpload/5fbe6a0b921ee.png'),
(9, 'Tempat titip barang', 'Sebelum masuk perpus harus titip barang dan waktu masuk menggunakan KTM', 'pointUpload/5fbe6add05a83.png'),
(10, 'Ruang tengah perpus', 'Biasanya digunakan untuk event event yang di adakan perpus', 'pointUpload/5fbe6b0f4b797.png'),
(11, 'Assistance Corner', 'tempat bantuan di perpus', 'pointUpload/5fbe6bc5034dc.png'),
(12, 'Fotocopy perpus', 'Tempat kalau masu fotocopy di perpus juga ada komputer untuk mencari buku', 'pointUpload/5fbe6c04780ae.png'),
(13, 'Naik lantai 7', 'lantai 2 perpustakaan', 'pointUpload/5fbe6e76ee2ef.png'),
(14, 'Area buku 1', 'buku buku cem macem', 'pointUpload/5fbe6ece87e0e.png'),
(15, 'Area buku 2', 'Area buku 2 bubku cemacem lagi', 'pointUpload/5fbe6f06c68ce.png'),
(16, 'Tempat lesehan lantai 7', 'tempat lesehan ada bean bag bisa tidur', 'pointUpload/5fbe6f3c37951.png'),
(17, 'Toilet lantai 7', 'toilet lantai 7 bersih', 'pointUpload/5fbe6f82856d6.png'),
(18, 'Naik lantai 8', 'ada leseshan kecil di sampiing ', 'pointUpload/5fbe71a8465c8.png'),
(19, 'Tempat lesehan lantai 8', 'tempat lesehan lantai 8 ada meja ada beanbag dan tv', 'pointUpload/5fbe71f7862de.png'),
(20, 'Meja 1 lantai 8', 'Meja banyak kursi ada colokanya', 'pointUpload/5fbe724ba8366.png'),
(21, 'Meja 2 lantai 8', 'Meja besar banyak kursi ada colokan bisa buat tidur juga', 'pointUpload/5fbe7271b73dd.png'),
(22, 'Turun lantai 5', 'Ruangan bawah perpustakaan', 'pointUpload/5fbe73c060868.png'),
(23, 'Ruang nonton film', 'Bisa nonton film dari kaset yang ada lumayan lengkap', 'pointUpload/5fbe73e5dde47.png');

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
(5, 'Lantai 6', 'lantai dasar perpustakaan dan satu satunya pintu masuk', 11, 'mapUpload/5fbe69018806f.png'),
(6, 'Lantai 7', 'Lantai 2 perpustakaan', 11, 'mapUpload/5fbe69204cb42.png'),
(7, 'Lantai 8', 'Lantai 3 perpustakaan', 11, 'mapUpload/5fbe693c6febb.png'),
(8, 'Lantai 5', 'Tempat nonton di perpus', 11, 'mapUpload/5fbe695ee87ad.png');

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
(8, 5, 8, 484, 293),
(9, 5, 9, 513, 258),
(10, 5, 10, 463, 207),
(11, 5, 11, 415, 159),
(12, 5, 12, 412, 256),
(13, 6, 13, 514, 257),
(14, 6, 14, 416, 248),
(15, 6, 15, 407, 145),
(16, 6, 16, 473, 106),
(17, 6, 17, 514, 137),
(18, 7, 18, 522, 256),
(19, 7, 19, 424, 253),
(20, 7, 20, 408, 154),
(21, 7, 21, 505, 136),
(22, 8, 22, 503, 245),
(23, 8, 23, 460, 208);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `gedung`
--
ALTER TABLE `gedung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `panorama`
--
ALTER TABLE `panorama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tempat`
--
ALTER TABLE `tempat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tempat_point`
--
ALTER TABLE `tempat_point`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
