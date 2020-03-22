import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity('health_code_regsiter')
export class Register {
  @PrimaryGeneratedColumn({ comment: '自增编号' })
  id: number;

  @Column({ comment: '二维码编号' })
  qrcodeId: string;

  @Column('json', { comment: '填写内容' })
  content: {
    [key: string]: any
  };

  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;
}