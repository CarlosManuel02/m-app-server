create table dbo.Categories
(
    id       uniqueidentifier not null
        primary key,
    name     varchar(20)      not null,
    currency varchar(20)      not null,
    icon     varchar(255)     not null,
    userId   uniqueidentifier not null,
    CONSTRAINT FK_Categories_Users FOREIGN KEY (userId) REFERENCES Users (id)
)
go