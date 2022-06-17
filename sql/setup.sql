-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists consoles;
DROP table if exists video_game_company;
DROP table if exists games;
DROP table if exists developers;

CREATE table consoles (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE table video_game_company (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    founded INT NOT NULL
);

CREATE table games (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE table developers (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    established INT NOT NULL
);

INSERT INTO developers (name, established)
VALUES 
('Team Sonic', 1990),
('Sonic! Software Planning', 1990),
('Atari Games 1984', 1984),
('Atari Games 1984', 1984),
('Nintendo R&D1', 1970),
('Nintendo R&D4', 1983),
('Naughty Dog', 1984),
('Japan Studio', 1993),
('Nintendo EAD', 1983),
('Intelligent Systems', 1983);

INSERT INTO games (name, released)
VALUES 
('Sonic', 1991),
('Shining Force II', 1993),
('Paperboy', 1985),
('Gauntlet', 1985),
('Metroid', 1986),
('The Legend of Zelda', 1986),
('Crash Bandicoot', 1996),
('The Legend of Dragoon', 1999),
('The Legend of Zelda: Ocarina of Time', 1998),
('Paper Mario', 2000);

INSERT INTO video_game_company (name, founded)
VALUES 
('Sega', 1960),
('Nintendo', 1889),
('Atari Inc.', 1972),
('Sony', 1946);

INSERT INTO consoles (name, description, released) 
VALUES 
('Atari', 'Classically viewed as the original game console.', 1977),

('NES', 'Considered to be what put gaming consoles onto the market.', 1983),

('Sega', 'Nintendos competitor. Failed to compete on the first wave of consoles.', 1983),

('Sony Playstation', 'The game changer. This console set a new standard for gaming. 3D models and environments were starting to become the new standard. It led its generation', 1994),

('Nintendo 64', 'This competed with the PS1 for the most part and was overall loved despite losing out in the end.', 1996);
