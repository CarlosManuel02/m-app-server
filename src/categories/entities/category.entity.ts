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

    @Column({
        type: "varchar",
        length: 20
    })
    type: string;

    @Column({
        type: "char",
        length: 36,
        nullable: false
    })
    userId: string;


}
