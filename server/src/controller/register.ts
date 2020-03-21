import { Context } from 'koa';

export const getFieldsByToken = async (ctx: Context) => {
  const token = ctx.query.token;
  if(!token) {
    return ctx.body = {
      code: -1,
      
    }
  }
}