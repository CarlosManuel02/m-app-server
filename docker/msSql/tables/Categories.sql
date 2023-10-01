CREATE TABLE Categories (
                            id CHAR(36) NOT NULL PRIMARY KEY,
                            name VARCHAR(20) NOT NULL,
                            currency VARCHAR(20) NOT NULL,
                            icon VARCHAR(255) NOT NULL,
                            userId CHAR(36) NOT NULL,
                            FOREIGN KEY (userId) REFERENCES Users(id)
);
