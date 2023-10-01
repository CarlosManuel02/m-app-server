import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../auth/entities";
@Entity({
    name: "Categories",
    schema: "dbo"
})
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        length: 20
    })
    name: string;

    @Column({
        type: "varchar",
        length: 20
    })
    currency: string;

    @Column({
        type: "varchar",
        length: 200
    })
    icon: string;

    @OneToMany(() => User, user => user.id)
    userId: string;


}
