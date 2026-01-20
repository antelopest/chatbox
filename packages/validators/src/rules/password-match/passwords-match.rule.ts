export const passwordsMatchRule = (data: {
  password: string;
  confirmPassword: string;
}) => data.password === data.confirmPassword;
