import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Profile } from "./profile.entity";
import { Projects } from "src/projects/entities/project.entity";

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

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @OneToMany(() => Projects, project => project.user)
    projects: Projects[]
}

