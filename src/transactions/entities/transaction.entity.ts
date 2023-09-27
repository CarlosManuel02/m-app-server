import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'transactions'})
export class Transaction {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: 'varchar',
        length: 10,
        enum: ['income', 'expense']
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
        type: 'uuid',
    })
    categoryId: string;

    @Column({
        type: 'uuid',
    })
    accountId: string;

    @Column({
        type: 'uuid',
        nullable: false
    })
    userId: string;

}