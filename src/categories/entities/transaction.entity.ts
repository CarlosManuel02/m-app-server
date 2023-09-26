import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'transactions'})
export class Transaction {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 10,
        enum: ['income', 'expense']
    })
    type: string;

    @Column({
        type: 'varchar',
        length: 20,
    })
    from: string;

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
        type: 'date',
    })
    date: Date;

    @Column({
        type: 'int',
    })
    categoryId: number;

}