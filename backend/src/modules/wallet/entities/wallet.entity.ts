import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("wallets")
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @Column()
  address: string

  @Column()
  chainId: string // 'ethereum', 'stellar', 'starknet'

  @Column({ default: "active" })
  status: string

  @Column("decimal", { precision: 18, scale: 8, default: 0 })
  balance: number

  @Column({ nullable: true })
  publicKey: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
