import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions'

export const tableTimestampColumnsOptions: TableColumnOptions[] = [
  {
    default: 'NOW()',
    isNullable: false,
    name: 'created_at',
    type: 'timestamptz',
  },
  {
    default: 'NOW()',
    isNullable: false,
    name: 'updated_at',
    type: 'timestamptz',
  },
]

export class EntityWithTimestamps {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date
}
