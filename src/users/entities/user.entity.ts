import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryColumn()
    id: string

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({nullable: true})
    authStrategy: string

}
