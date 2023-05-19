-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Maj 10, 2023 at 12:40 PM
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
  `twórca` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Wyzwalacze `fiszka`
--
DELIMITER $$
CREATE TRIGGER `historia_trigger` BEFORE DELETE ON `fiszka` FOR EACH ROW INSERT INTO historia(nazwa, opis, sala, wykonawca, deadline, twórca) VALUES(old.nazwa, old.opis, old.sala, old.wykonawca, old.deadline, old.twórca)
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
  `twórca` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

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
('MK', 'AMW1');

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
  ADD KEY `twórca` (`twórca`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `historia`
--
ALTER TABLE `historia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notatka`
--
ALTER TABLE `notatka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fiszka`
--
ALTER TABLE `fiszka`
  ADD CONSTRAINT `fiszka_ibfk_1` FOREIGN KEY (`twórca`) REFERENCES `logowanie` (`login`);

--
-- Constraints for table `notatka`
--
ALTER TABLE `notatka`
  ADD CONSTRAINT `notatka_ibfk_1` FOREIGN KEY (`twórca`) REFERENCES `logowanie` (`login`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
