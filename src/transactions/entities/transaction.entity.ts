import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../../categories/entities";
import {Account, User} from "../../auth/entities";

@Entity({name: 'transactions'})
export class Transaction {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: 'varchar',
        length: 10
    })
    type: string;

    @Column({
        type: 'int'
    })
    amount: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'date'
    })
    date: Date;

    @Column({
        type: 'varchar',
        length: 36
    })
    categoryId: string;

    @Column({
        type: 'varchar',
        length: 36
    })
    accountId: string;

    @Column({
        type: 'varchar',
        length: 36
    })
    userId: string;

}