import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("api_keys")
export class ApiKey {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @Column({ unique: true })
  key: string

  @Column()
  name: string

  @Column("simple-array")
  scopes: string[] // e.g., ['read:trading', 'write:trading', 'read:portfolio']

  @Column({ default: true })
  isActive: boolean

  @Column({ nullable: true })
  expiresAt: Date

  @Column({ default: 0 })
  rateLimit: number // requests per minute

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
