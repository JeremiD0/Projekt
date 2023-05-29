-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 29, 2023 at 09:21 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `list_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fiszka`
--

CREATE TABLE `fiszka` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) DEFAULT NULL,
  `opis` text DEFAULT NULL,
  `sala` varchar(50) DEFAULT NULL,
  `wykonawca` varchar(50) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `tworca` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Wyzwalacze `fiszka`
--
DELIMITER $$
CREATE TRIGGER `backup` BEFORE DELETE ON `fiszka` FOR EACH ROW INSERT into historia(`id`,`nazwa`,`opis`,`sala`,`wykonawca`,`deadline`,`tworca`)
VALUES(OLD.id,OLD.nazwa,OLD.opis,OLD.sala,OLD.wykonawca,OLD.deadline,OLD.tworca)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `historia`
--

CREATE TABLE `historia` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) DEFAULT NULL,
  `opis` text DEFAULT NULL,
  `sala` varchar(50) DEFAULT NULL,
  `wykonawca` varchar(50) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `tworca` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `historia`
--

INSERT INTO `historia` (`id`, `nazwa`, `opis`, `sala`, `wykonawca`, `deadline`, `tworca`) VALUES
(80, 'TEST ', 'CHUJ W DUPE POLICJI', 'Sala 3', 'Jeremi', '2023-05-30', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `logowanie`
--

CREATE TABLE `logowanie` (
  `login` varchar(100) NOT NULL,
  `haslo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `logowanie`
--

INSERT INTO `logowanie` (`login`, `haslo`) VALUES
('Jeremi', '$2b$10$l5TJ4QvmGKvcvBHIwzhKnufZH0es.xOwfHwyntajqO8rI2haZy5sO'),
('MK', '$2b$10$xTIpPUP8/Demfo06ob7oCuQi5z/cxgS/G52WCJHslfSn.7ZQpWhQC');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notatka`
--

CREATE TABLE `notatka` (
  `id` int(11) NOT NULL,
  `twórca` varchar(100) DEFAULT NULL,
  `tekst` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `fiszka`
--
ALTER TABLE `fiszka`
  ADD PRIMARY KEY (`id`),
  ADD KEY `twórca` (`tworca`);

--
-- Indeksy dla tabeli `historia`
--
ALTER TABLE `historia`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `logowanie`
--
ALTER TABLE `logowanie`
  ADD PRIMARY KEY (`login`);

--
-- Indeksy dla tabeli `notatka`
--
ALTER TABLE `notatka`
  ADD PRIMARY KEY (`id`),
  ADD KEY `twórca` (`twórca`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fiszka`
--
ALTER TABLE `fiszka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `historia`
--
ALTER TABLE `historia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `notatka`
--
ALTER TABLE `notatka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fiszka`
--
ALTER TABLE `fiszka`
  ADD CONSTRAINT `fiszka_ibfk_1` FOREIGN KEY (`tworca`) REFERENCES `logowanie` (`login`);

--
-- Constraints for table `notatka`
--
ALTER TABLE `notatka`
  ADD CONSTRAINT `notatka_ibfk_1` FOREIGN KEY (`twórca`) REFERENCES `logowanie` (`login`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
