import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Admin {
  @ApiProperty({
    example: 1,
    description: "Adminning uniqal ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Adminning foydalanuvchi nomi (username)",
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: "admin@gmail.com",
    description: "Adminning email manzili",
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Adminning telefon raqami",
  })
  @Column({ unique: true })
  phone: string;

  @ApiProperty({
    example: "hashedPassword123",
    description: "Adminning paroli (hashlangan bo'lishi kerak)",
  })
  @Column()
  password: string;

  @ApiProperty({
    example: "2025-06-03T12:00:00.000Z",
    description: "Admin ro'yxatdan o'tgan sana va vaqt",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: false,
    description: "Admin yaratuvchimi yoki yo'qmi (is_creator)",
  })
  @Column({ default: false })
  is_creator: boolean;

  @ApiProperty({
    example: true,
    description: "Admin faol holatda yoki yo'q (is_active)",
  })
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({
    example: "refresh_token_value_here",
    description: "Admin uchun refresh token (agar mavjud bo'lsa)",
  })
  @Column({ default: "" })
  refresh_token: string;
}
