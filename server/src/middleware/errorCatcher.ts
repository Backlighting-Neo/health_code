import { Context } from 'koa';
import errorMap from '../errorMap';

export default () => async (ctx: Context, next: Function) => {
  try {
    await next();
  }
  catch(err) {
    ctx.body = {
      code: 999,
      message: '未知错误',
      error: err.message
    }
  }

  if(ctx.body && ctx.body.code && ctx.body.code !== 0) {
    ctx.body.message = errorMap[ctx.body.code];
  }
}