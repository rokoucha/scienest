import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ARTICLE_SCOPE } from '../../constants'
import { EntityWithTimestamps } from '../timestampColumns'
import { Tag } from './Tag'
import { User } from './User'

@Entity()
export class Article extends EntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 128, nullable: false, type: 'varchar' })
  path!: string

  @Column({ length: 32, nullable: false, type: 'varchar' })
  title!: string

  @Column({ nullable: false, type: 'text' })
  text!: string

  @Column({ default: ARTICLE_SCOPE.PRIVATE, enum: ARTICLE_SCOPE, type: 'enum' })
  scope!: ARTICLE_SCOPE

  @ManyToOne(
    type => User,
    user => user.articles,
  )
  user!: User

  @ManyToMany(type => Tag)
  @JoinTable()
  tags!: Tag
}
