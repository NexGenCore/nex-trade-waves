import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @Column()
  symbol: string // e.g., 'BTC/USD'

  @Column()
  type: string // 'buy' or 'sell'

  @Column("decimal", { precision: 18, scale: 8 })
  quantity: number

  @Column("decimal", { precision: 18, scale: 8 })
  price: number

  @Column("decimal", { precision: 18, scale: 8 })
  total: number

  @Column({ default: "pending" })
  status: string // 'pending', 'filled', 'cancelled'

  @Column({ default: false })
  isSimulation: boolean

  @Column({ nullable: true })
  chainId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
