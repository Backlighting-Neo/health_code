import { Context } from 'koa';
import { BussinessError } from './common';
import { getConnection } from 'typeorm';
import { Qrcode } from '../entity/qrcode';
import { Field } from '../entity/field';
import { Register } from '../entity/register';

// TODO
export const login = async (ctx: Context) => {
  const body = ctx.request.body;
  const { username, password } = body;

  if(!username || !password) throw new BussinessError(201);
}

export const listQrcode = async (ctx: Context) => {
  const connection = getConnection();
  const qrcodeRepo = connection.getRepository(Qrcode);
  const fieldRepo = connection.getRepository(Field);
  const qrcodeEntity = await qrcodeRepo.find();
  const fieldEntity = await fieldRepo.find();
  const fieldMap = fieldEntity.reduce((obj, it) => {
    obj[it.id] = it;
    return obj;
  }, {});
  return ctx.body = qrcodeEntity.map(it => ({
    ...it,
    field: it.fieldIds.map(it => fieldMap[it])
  })) || [];
}

export const addQrcode = async (ctx: Context) => {
  const body = ctx.request.body;

  const connection = getConnection();
  const qrcodeRepo = connection.getRepository(Qrcode);
  const fieldRepo = connection.getRepository(Field);

  const fieldEntity = await fieldRepo.find();
  const fieldMap = fieldEntity.reduce((obj, it) => {
    obj[it.id] = it;
    return obj;
  }, {});

  if(body.fieldIds.some(it => !fieldMap[it])) throw new BussinessError(202);

  const result = await qrcodeRepo.insert({
    name: body.name,
    content: body.content,
    fieldIds: body.fieldIds
  });
  return ctx.body = result.identifiers[0];
}

export const listField = async (ctx: Context) => {
  const connection = getConnection();
  const fieldRepo = connection.getRepository(Field);
  const fieldEntity = await fieldRepo.find();
  return ctx.body = fieldEntity || [];
}

export const addField = async (ctx: Context) => {
  const body = ctx.request.body;

  const connection = getConnection();
  const fieldRepo = connection.getRepository(Field);

  const result = await fieldRepo.insert({
    key: body.key,
    name: body.name,
    content: body.content,
    dataType: body.dataType,
    nullable: body.nullable
  });
  return ctx.body = result.identifiers[0]
}

export const listRegister = async (ctx: Context) => {
  const connection = getConnection();
  const registerRepo = connection.getRepository(Register);
  const registerEntity = registerRepo.find({});

  // const register = await createQueryBuilder(Register)
  //   .leftJoinAndSelect
  return ctx.body = registerEntity;
}