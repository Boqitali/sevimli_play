import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { Comment } from "../../comments/entities/comment.entity";
// import { Like } from "../../likes/entities/like.entity";
import { User } from "../../users/entities/user.entity";
import { Category } from "../../categories/entities/category.entity";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  thumbnail_url: string;

  @Column()
  views: number;

  @UpdateDateColumn()
  uploaded_at: Date;

  @Column()
  country_movie: string;


  @ManyToOne(() => Category, (category) => category.video)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToOne(() => User, (user) => user.video)
  @JoinColumn({ name: "userId" })
  user: User;
}
