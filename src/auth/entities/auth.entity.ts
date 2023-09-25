import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({
    name: 'Users'
})
export class Auth {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text', {
        nullable: false,
    })
    username: string;

    @Column('text', {
        nullable: false,
    })
    email: string;

    @Column('text', {
        nullable: false,
    })
    password: string;

    @Column('text', {
        nullable: false,

    })
    role: string;

    @Column('text', {
        nullable: false,
    })
    jwt: string;

    @Column('text', {
        nullable: false,
    })
    salt: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;

    }

}
