create
    definer = root@`%` procedure showTotalOfTransaction(IN userId char(36))
BEGIN
    SELECT
        U.email,
        T.type,
        SUM(T.amount) AS `Total`
    FROM Transactions T
             JOIN Users U ON U.id = T.userId
    WHERE U.id = userId
    GROUP BY T.type, U.email;
END;


create
    definer = root@`%` procedure sp_GetAccounts(IN userId char(36))
BEGIN
    SELECT
        a.id,
        a.name,
        a.balance
    FROM Accounts a
    WHERE a.userId = userId;
END;


create
    definer = root@`%` procedure sp_GetCategories(IN userId char(36))
BEGIN
    SELECT
        c.id,
        c.name,
        c.currency,
        c.icon
    FROM Categories c
    WHERE c.userId = userId;
END;

create
    definer = root@`%` procedure sp_GetTransactions(IN accountId char(36))
BEGIN
    SELECT
        t.id,
        t.type,
        t.amount,
        t.description,
        t.date,
        c.name AS categoryName,
        c.currency,
        a.name AS accountName,
        a.balance
    FROM Transactions t
             LEFT JOIN Categories c ON t.categoryId = c.id
             LEFT JOIN Accounts a ON t.accountId = a.id
    WHERE t.accountId = accountId;
END;

create
    definer = root@`%` procedure sp_GetTransactionsByCategory(IN categoryId char(36))
BEGIN
    SELECT
        t.id,
        t.type,
        t.amount,
        t.description,
        t.date,
        c.name AS categoryName,
        c.currency,
        a.name AS accountName,
        a.balance
    FROM Transactions t
             LEFT JOIN Categories c ON t.categoryId = c.id
             LEFT JOIN Accounts a ON t.accountId = a.id
    WHERE t.categoryId = categoryId;
END;

create
    definer = root@`%` procedure sp_GetTransactionsByUser(IN userId char(36))
BEGIN
    SELECT
        t.id,
        t.type,
        t.amount,
        t.description,
        t.date,
        c.name AS categoryName,
        c.currency,
        a.name AS accountName,
        a.balance
    FROM Transactions t
             LEFT JOIN Categories c ON t.categoryId = c.id
             LEFT JOIN Accounts a ON t.accountId = a.id
    WHERE a.userId = userId;
END;

