create table dbo.Transactions
(
    id          uniqueidentifier not null
        primary key,
    type        varchar(10)
        check ([type] = 'expense' OR [type] = 'income'),
    amount      int,
    description varchar(max),
    date        date,
    categoryId  uniqueidentifier,
    accountId   uniqueidentifier,
    userId      uniqueidentifier not null,
    CONSTRAINT FK_Transactions_Categories FOREIGN KEY (categoryId) REFERENCES Categories (id),
    CONSTRAINT FK_Transactions_Accounts FOREIGN KEY (accountId) REFERENCES Accounts (id),
    CONSTRAINT FK_Transactions_Users FOREIGN KEY (userId) REFERENCES Users (id)
)
go