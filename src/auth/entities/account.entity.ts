import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    name: 'accounts'
})
export class Account{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        nullable: false,
        length: 50,
    })
    name: string;

    @Column('bigint', {
        nullable: false,
    })
    balance: number;

    @Column('uuid', {
        nullable: false,
    })
    userId: string;


}