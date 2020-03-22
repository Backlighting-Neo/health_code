import { Context } from 'koa';
import moment from 'moment';
import { BussinessError } from './common';
import { getConnection, createQueryBuilder } from 'typeorm';
import { Qrcode } from '../entity/qrcode';
import { Field } from '../entity/field';
import { Register } from '../entity/register';

const formatTimestamp = timestamp => moment(+timestamp).format('YYYY-MM-DD HH:mm:SS');

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
  const registerCount = await createQueryBuilder(Register)
    .select('count(*) as count')
    .addSelect('qrcodeId')
    .groupBy('qrcodeId')
    .getRawMany();
  const registerCountMap = registerCount.reduce((obj, it) => {
    obj[it.qrcodeId] = it.count;
    return obj;
  }, {})
  return ctx.body = qrcodeEntity.map(it => ({
    ...it,
    count: registerCountMap[it.id] || 0,
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

export const updateQrcode = async (ctx: Context) => {
  const token = ctx.query.token;
  const body = ctx.request.body;

  const connection = getConnection();
  const qrcodeRepo = connection.getRepository(Qrcode);

  await qrcodeRepo.update(token, {
    name: body.name,
    content: body.content,
    fieldIds: body.fieldIds
  });
  return ctx.body = {};
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

export const updateField = async (ctx: Context) => {
  const id = ctx.query.id;
  const body = ctx.request.body;

  const connection = getConnection();
  const fieldRepo = connection.getRepository(Field);

  await fieldRepo.update(id, {
    name: body.name,
    content: body.content,
    dataType: body.dataType,
    nullable: body.nullable,
    extra: body.extra
  });
  return ctx.body = {};
}

export const listRegister = async (ctx: Context) => {
  const { start, end, qrcode } = ctx.query;
  
  let register = createQueryBuilder(Register, 'register')
    .leftJoinAndSelect(Qrcode, 'qrcode', 'register.qrcodeId = qrcode.id')
    .select('register.*')
    .addSelect('qrcode.name');

  if(start || end || qrcode) {
    register = register.where('1=1');
  }

  if(start && end) {
    register = register.andWhere('register.create_time > :start', { start: formatTimestamp(start) });
    register = register.andWhere('register.create_time < :end', { end: formatTimestamp(end) });
  }

  if(qrcode) {
    register = register.andWhere('qrcode.id = :qrcode', { qrcode });
  }

  const result = await register.getRawMany();
  
  return ctx.body = result.map(it => ({
    id: it.id,
    qrcode: it.qrcode_name,
    register_time: it.create_time,
    ...JSON.parse(it.content)
  }));
}