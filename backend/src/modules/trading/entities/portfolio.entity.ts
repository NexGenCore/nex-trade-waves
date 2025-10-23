import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("portfolios")
export class Portfolio {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @Column()
  symbol: string

  @Column("decimal", { precision: 18, scale: 8 })
  quantity: number

  @Column("decimal", { precision: 18, scale: 8 })
  averagePrice: number

  @Column("decimal", { precision: 18, scale: 8 })
  currentPrice: number

  @Column({ default: false })
  isSimulation: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
