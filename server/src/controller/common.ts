export const UUID_REGEXP = /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/;

export class BussinessError extends Error {
  errorId = null;
  errorMessage = null;

  static ErrorMap = {
    101: '缺少token参数',
    102: 'token不合法',
    103: '二维码不存在',
  }
  
  constructor(errorId) {
    super();
    this.errorId = errorId;
    this.errorMessage = BussinessError.ErrorMap[errorId];
    if(!this.errorMessage) {
      throw new Error(`Can not find error with id=${errorId}`);
    }
  }
};