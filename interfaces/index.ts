export type UserValidation = 'firstName' | 'lastName' | 'email';

type ValidationProps = {
  firstName: {
    pattern?: RegExp;
    message?: string;
  };
  lastName: {
    pattern?: RegExp;
    message?: string;
  };
  email: {
    pattern?: RegExp;
    message?: string;
  };
};

export type Field = {
  Validations: ValidationProps;
  UserValidation: UserValidation;
};


export type FormFields = {
  id: number;
  type: "number" | "text" | "password" | "email" | "textArea";
  placeholder: string;
  name: string;
  disabled?: boolean;
  validation: any;
};

export type GeneratedToken = {
  userId: string;
  source: string;
  iat: number;
  exp: number;
};

export type SEO = {
  seo?: { name: string; content: string }[];
  mainseo?: {
    title?: string;
    description?: string;
  };
};
export type TableParams = { page: number; size: number; search: string; sort: string };

export type Pagination = { self: number; first: number; prev: number; next: number; last: number };
