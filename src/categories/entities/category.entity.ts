import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
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

}
