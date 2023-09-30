CREATE TABLE Accounts (
                          id CHAR(36) NOT NULL,
                          name VARCHAR(50) NOT NULL,
                          balance DECIMAL(10, 2),
                          userId CHAR(36) NOT NULL,
                          PRIMARY KEY (id),
                          FOREIGN KEY (userId) REFERENCES Users (id)
);
