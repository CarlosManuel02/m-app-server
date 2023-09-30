CREATE TABLE Transactions (
                              id CHAR(36) NOT NULL PRIMARY KEY,
                              type ENUM('expense', 'income') NOT NULL,
                              amount INT,
                              description TEXT,
                              date DATE,
                              categoryId CHAR(36),
                              accountId CHAR(36),
                              userId CHAR(36) NOT NULL,
                              FOREIGN KEY (categoryId) REFERENCES Categories(id),
                              FOREIGN KEY (accountId) REFERENCES Accounts(id),
                              FOREIGN KEY (userId) REFERENCES Users(id)
);
