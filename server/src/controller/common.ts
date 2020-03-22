import crypto from 'crypto';

export const UUID_REGEXP = /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/;

export class BussinessError extends Error {
  errorId = null;
  errorMessage = null;

  static ErrorMap = {
    101: '缺少token参数',
    102: 'token不合法',
    103: '二维码不存在',
    104: '必填项未填写',

    201: '缺少用户名或密码',
    202: '未知字段',
  }
  
  constructor(errorId, errorMessage = null) {
    super();
    this.errorId = errorId;
    this.errorMessage = errorMessage || BussinessError.ErrorMap[errorId];
    if(!this.errorMessage) {
      throw new Error(`Can not find error with id=${errorId}`);
    }
  }
};

export const md5 = content => crypto.createHash('md5').update(content).digest('hex');

export const calculateMaskPassword = (content) => {
  return md5(md5(content));
}