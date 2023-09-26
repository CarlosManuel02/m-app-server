-- Muestra las transacciones de un usuario
create PROCEDURE dbo.sp_GetTransactionsByUser
@userId uniqueidentifier
AS
select
    t.id,
    t.type,
    t.amount,
    t.description,
    t.date,
    c.name as categoryName,
    c.currency,
    a.name as accountName,
    a.balance
from dbo.Transactions t
         left join dbo.Categories c on t.categoryId = c.id
         left join dbo.Accounts a on t.accountId = a.id
where a.userId = @userId
go


-- Muestra las categorias de un usuario
create PROCEDURE dbo.sp_GetCategories
@userId uniqueidentifier
AS
select
    c.id,
    c.name,
    c.currency,
    c.icon
from dbo.Categories c
where c.userId = @userId
go

EXECUTE dbo.sp_GetCategories @userId = '9F9AF854-19D4-4A04-8021-8A7B744B919E';

-- Muestra las cuentas de un usuario
create PROCEDURE dbo.sp_GetAccounts
@userId uniqueidentifier
AS
select
    a.id,
    a.name,
    a.balance
from dbo.Accounts a
where a.userId = @userId
go
EXECUTE sp_GetAccounts @userId = '9F9AF854-19D4-4A04-8021-8A7B744B919E';


-- Muestra las transacciones de una cuenta
create PROCEDURE dbo.sp_GetTransactions
@accountId uniqueidentifier
AS
select
    t.id,
    t.type,
    t.amount,
    t.description,
    t.date,
    c.name as categoryName,
    c.currency,
    a.name as accountName,
    a.balance
from dbo.Transactions t
         left join dbo.Categories c on t.categoryId = c.id
         left join dbo.Accounts a on t.accountId = a.id
where t.accountId = @accountId
go
EXECUTE sp_GetTransactions @accountId = '27CFA604-93C3-40CF-B7C9-4195AAAB3409';


-- Muestra las transacciones de una categoria
create PROCEDURE dbo.sp_GetTransactionsByCategory
@categoryId uniqueidentifier
AS
select
    t.id,
    t.type,
    t.amount,
    t.description,
    t.date,
    c.name as categoryName,
    c.currency,
    a.name as accountName,
    a.balance
from dbo.Transactions t
         left join dbo.Categories c on t.categoryId = c.id
         left join dbo.Accounts a on t.accountId = a.id
where t.categoryId = @categoryId
go
EXECUTE sp_GetTransactionsByCategory @categoryId = 'F165E42F-F083-4D14-A485-5B9075E9C1BC';
