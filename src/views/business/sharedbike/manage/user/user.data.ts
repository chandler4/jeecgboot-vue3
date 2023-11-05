import { FormSchema } from '/@/components/Table';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '登录账号',
    component: 'Input',
    colProps: { span: 8 },
  },
  // {
  //   field: 'password',
  //   label: '密码',
  //   component: 'Input',
  //   componentProps: {
  //     options: [
  //       { label: '正常', value: 1 },
  //       { label: '冻结', value: 0 },
  //     ],
  //   },
  //   colProps: { span: 8 },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '登录账号',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'cname',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'cardId',
    label: '身份证号',
    component: 'Input',
    required: true,
  },
  {
    field: 'sex',
    label: '性别',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode:'sex',
    }
  }, {
    field: 'phoneNumber',
    label: '手机号码',
    component: 'Input',
    required: true,
  },
  {
    field: 'state',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '使用', value: '使用' },
        { label: '废弃', value: '废弃' },
      ],
    },
  },
];
