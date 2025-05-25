import { z } from 'zod';


export const ArticlesFormSchema = z.object({
  content: z
    .string({ required_error: '내용은 필수입니다.' })
    .min(1, '내용을 입력해주세요.'),

  title: z
    .string({ required_error: '제목은 필수입니다.' })
    .min(1, '제목은 1자 이상 입력해주세요.')
    .max(50, '제목은 50자 이하로 입력해주세요.'),

  image: z
    .array(z.string(), { required_error: '이미지는 필수입니다.' })
    .min(1, '이미지를 1개 이상 등록해주세요.')
    .max(3, '이미지 등록은 최대 3개까지 가능합니다.'),
});

export const itemFormSchema = z.object({
  name: z
    .string({ required_error: '상품 이름은 필수입니다.' })
    .min(1, '상품 이름은 1자 이상 입력해주세요.')
    .max(30, '상품 이름은 30자 이하로 입력해주세요.'),

  description: z
    .string({ required_error: '내용은 필수입니다.' })
    .min(1, '내용을 입력해주세요.'),

  price: z
    .number({ required_error: '상품가격은 필수입니다.' })
    .min(0, '상품 가격은 0원 이상이어야 합니다.')
    .max(999999, '상품 가격은 999,999원 이하여야 합니다.'),

  images: z
    .array(z.string(), { required_error: '이미지는 필수입니다.' })
    .min(1, '이미지를 1개 이상 등록해주세요.')
    .max(1, '이미지 등록은 최대 1개까지 가능합니다.'),

  tags: z
    .array(z.string().trim().min(1, '빈 태그는 허용되지 않습니다.'))
    .max(5, '태그는 최대 5개까지 입력할 수 있습니다.')
    .refine((tags) => new Set(tags).size === tags.length, {
      message: '중복된 태그는 입력할 수 없습니다.',
    })
    .optional(),
});

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: '이메일은 필수입니다.' })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '유효한 이메일을 입력해주세요.',
    ),

  password: z
    .string({ required_error: '비밀번호는 필수입니다.' })
    .min(8, '8자 이상 입력해주세요.')
    .max(20, '20자 이하로 입력해주세요.'),

});
export const joinFormSchema = z.object({
  email: z
    .string({ required_error: '이메일은 필수입니다.' })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '유효한 이메일을 입력해주세요.',
    ),

  nickname: z
    .string({ required_error: '닉네임을 입력해주세요.' })
    .min(1, '1자 이상 입력해주세요.')
    .max(20, '20자 이하로 입력해주세요.')
    .regex(
      /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
      '영문, 숫자, 특수문자(!@#$%^&*)만 입력 가능합니다.',
    ),

  password: z
    .string({ required_error: '비밀번호는 필수입니다.' })
    .min(8, '8자 이상 입력해주세요.')
    .max(20, '20자 이하로 입력해주세요.'),

  passwordConfirmation: z
    .string({ required_error: '비밀번호 확인은 필수입니다.' }),

}).refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  }
);


// export const formSchema = z.object({
//   email: z
//     .string({ required_error: '이메일은 필수입니다.' })
//     .regex(
//       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//       '유효한 이메일을 입력해주세요.',
//     ),

//   nickname: z
//     .string({ required_error: '닉네임을 입력해주세요.' })
//     .min(1, '1자 이상 입력해주세요.')
//     .max(20, '20자 이하로 입력해주세요.')
//     .regex(
//       /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
//       '영문, 숫자, 특수문자(!@#$%^&*)만 입력 가능합니다.',
//     ),

//   password: z
//     .string({ required_error: '비밀번호는 필수입니다.' })
//     .min(8, '8자 이상 입력해주세요.')
//     .max(20, '20자 이하로 입력해주세요.'),

//   passwordConfirmation: z
//     .string({ required_error: '비밀번호 확인은 필수입니다.' }),

//   productName: z
//     .string({ required_error: '상품 이름은 필수입니다.' })
//     .min(1, '상품 이름은 1자 이상 입력해주세요.')
//     .max(30, '상품 이름은 30자 이하로 입력해주세요.'),

//   content: z
//     .string({ required_error: '내용은 필수입니다.' })
//     .min(1, '내용을 입력해주세요.'),

//   description: z
//     .string({ required_error: '내용은 필수입니다.' })
//     .min(1, '내용을 입력해주세요.'),

//   title: z
//     .string({ required_error: '제목은 필수입니다.' })
//     .min(1, '제목은 1자 이상 입력해주세요.')
//     .max(50, '제목은 50자 이하로 입력해주세요.'),

//   price: z
//     .number({ required_error: '상품가격은 필수입니다.' })
//     .min(0, '상품 가격은 0원 이상이어야 합니다.')
//     .max(999999, '상품 가격은 999,999원 이하여야 합니다.'),

//   image: z
//     .array(z.string(), { required_error: '이미지는 필수입니다.' })
//     .min(1, '이미지를 1개 이상 등록해주세요.')
//     .max(3, '이미지 등록은 최대 3개까지 가능합니다.'),

//   images: z
//     .array(z.string(), { required_error: '이미지는 필수입니다.' })
//     .min(1, '이미지를 1개 이상 등록해주세요.')
//     .max(1, '이미지 등록은 최대 1개까지 가능합니다.'),
// })
// .refine(
//   (data) => data.password === data.passwordConfirmation,
//   {
//     message: '비밀번호가 일치하지 않습니다.',
//     path: ['passwordConfirmation'],
//   }
// );