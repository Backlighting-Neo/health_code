import moment from 'moment';

export const timeFormatter = (a) => {
  console.log(a.value);
  return moment(a.value).format('MM-DD HH:mm:SS');
};

export const DataTypeEnum = {
  input: '输入框',
  calendar: '日期选择',
  radio: '单选框',
  checkbox: '复选框'
};