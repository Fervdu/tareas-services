import { Projects } from "src/projects/entities/project.entity"
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"

@Entity()
export class Tasks {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    time: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'datetime', default: () => null })
    updatedAt: Date

    @Column()
    projectId: string

    @ManyToOne(() => Projects, project => project.tasks)
    project: Projects
}
