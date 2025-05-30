import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: false })
  is_creator: boolean;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: "" })
  refresh_token: string;

}
