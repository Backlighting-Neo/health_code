import { Context } from 'koa';
import { BussinessError } from '../controller/common';

export default () => async (ctx: Context, next: Function) => {
  try {
    await next();

    if(ctx.body) {
      ctx.body = {
        code: 0,
        data: ctx.body
      };
    }
  }
  catch(err) {
    if(err instanceof BussinessError) {
      ctx.body = {
        code: err.errorId,
        message: err.errorMessage
      };
    }
    else {
      ctx.body = {
        code: 999,
        message: err.message
      }
    }
  }
}