CREATE TABLE Users (
                       id ID NOT NULL PRIMARY KEY,
                       username VARCHAR(20) NOT NULL,
                       email VARCHAR(30) NOT NULL,
                       password TEXT NOT NULL,
                       role VARCHAR(5) NOT NULL,
                       salt TEXT NOT NULL
);

