import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('health_code_qrcode')
export class Qrcode {
  @PrimaryGeneratedColumn('uuid', { comment: '二维码编号' })
  id: string;

  @Column({ comment: '名字' })
  name: string;

  @Column({ comment: '备注' })
  content: string;

  @Column("simple-array", { comment: '要填写的字段ID' })
  fieldIds: number[];

  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  update_time: Date;
}