create table dbo.Accounts
(
    id      uniqueidentifier not null,
    name    varchar(50)      not null,
    balance decimal(10, 2),
    userId  uniqueidentifier not null,
    CONSTRAINT PK_Accounts PRIMARY KEY (id),
    CONSTRAINT FK_Accounts_Users FOREIGN KEY (userId) REFERENCES Users (id)
)
go