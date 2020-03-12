import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Matches, MaxLength } from 'class-validator'
import { EntityWithTimestamps } from '../timestampColumns'
import { Article } from './Article'

@Entity()
@Unique(['screenName'])
export class User extends EntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id!: number

  @OneToMany(
    type => Article,
    article => article.user,
  )
  articles!: Article[]

  @Column({
    name: 'is_admin',
    type: 'boolean',
    default: 'FALSE',
    nullable: false,
  })
  isAdmin!: boolean

  @Column({ nullable: false })
  @MaxLength(20)
  name!: string

  @Column({ length: '32', nullable: false })
  @Matches(/^\w{1,32}$/)
  @PrimaryGeneratedColumn()
  screenName!: string
}
