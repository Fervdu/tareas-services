import { Users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

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

    @ManyToOne(() => Users, user => user.projects)
    user: Users
}
