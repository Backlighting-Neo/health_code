import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity('health_code_regsitre')
export class Register {
  @PrimaryColumn({ comment: '自增编号' })
  id: string;

  @Column({ comment: '二维码编号' })
  qrcodeId: string;

  @Column('json', { comment: '填写内容' })
  

  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;
}