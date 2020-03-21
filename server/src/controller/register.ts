import { Context } from 'koa';
import { UUID_REGEXP, BussinessError } from './common';
import { getConnection, In } from 'typeorm';
import { Qrcode } from '../entity/qrcode';
import { Field } from '../entity/field';

export const getFieldsByToken = async (ctx: Context) => {
  const token = ctx.query.token as string;
  if(!token) throw new BussinessError(101);

  if (!UUID_REGEXP.test(token)) throw new BussinessError(102);

  const connection = getConnection();
  const qrcodeRepo = await connection.getRepository(Qrcode);
  const qrcodeEntity = await qrcodeRepo.findOne(token);
  if(!qrcodeEntity) throw new BussinessError(103);

  const fieldRepo = connection.getRepository(Field);
  const fieldEntity = await fieldRepo.find({
    id: In(qrcodeEntity.fieldIds)
  });
  return ctx.body = fieldEntity.map(it => ({
    id: it.id,
    name: it.name,
    content: it.content,
    dataType: it.dataType,
    nullable: it.nullable
  }))
}

export const submit = async (ctx: Context) => {
  const token = ctx.query.token as string;
  if (!token) throw new BussinessError(101);

  if (!UUID_REGEXP.test(token)) throw new BussinessError(102);

  const connection = getConnection();
  const qrcodeRepo = await connection.getRepository(Qrcode);
  const qrcodeEntity = await qrcodeRepo.findOne(token);
  if (!qrcodeEntity) throw new BussinessError(103);

  const body = ctx.request.body;
}