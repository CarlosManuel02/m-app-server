import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

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

    @Column('decimal', {
        nullable: false,
        precision: 10,
        scale: 2,
    })
    balance: number;

    @ManyToOne(() => User, user => user.id)
    userId: string;


}