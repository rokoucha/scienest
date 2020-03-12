import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EntityWithTimestamps } from '../timestampColumns'

@Entity()
export class Tag extends EntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 32, nullable: false, type: 'varchar' })
  name!: string
}
