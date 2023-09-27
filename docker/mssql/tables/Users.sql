create table dbo.Users
(
    username varchar(20)                                                    not null,
    email    varchar(30)                                                    not null,
    password varchar(max)                                                   not null,
    role     varchar(5)                                                     not null,
    id       uniqueidentifier
        constraint DF_16d4f7d636df336db11d87413e3 default newsequentialid() not null
        constraint PK_16d4f7d636df336db11d87413e3
            primary key,
    salt     varchar(max)                                                   not null
)
go