import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Notification {
  @ApiProperty({
    example: 1,
    description: "Bildirishnoma ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Sizning videosingizga like bosildi",
    description: "Bildirishnoma matni",
  })
  @Column()
  message: string;

  @ApiProperty({
    example: false,
    description: "Bildirishnoma o'qilganmi yoki yo'qmi (true yoki false)",
  })
  @Column()
  is_read: boolean;

  @ApiProperty({
    example: "2025-06-03T12:34:56.000Z",
    description: "Bildirishnoma yaratilgan sanasi",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: 2,
    description: "Bildirishnomani olgan foydalanuvchi ID raqami",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.notification)
  @JoinColumn({ name: "userId" })
  user: User;
}
