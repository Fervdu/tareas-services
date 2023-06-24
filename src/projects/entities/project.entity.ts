import { Tasks } from "src/tasks/entities/task.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('')
export class Projects {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    image: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'datetime', default: () => null })
    updatedAt: Date

    @Column()
    userId: string

    @ManyToOne(() => Users, user => user.projects)
    user: Users

    @OneToMany(() => Tasks, task => task.project)
    tasks: Tasks[]
}
