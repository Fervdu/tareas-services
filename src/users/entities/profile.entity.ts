import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity('user_profile')
export class Profile {
    @PrimaryColumn()
    id: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    rol: string
}