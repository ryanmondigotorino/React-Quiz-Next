import type { FormFields } from "interfaces";

export const signInFields: Array<FormFields> = [
  {
    id: 0,
    type: "text",
    placeholder: "Email",
    name: "email",
    validation: {
      required: {
        value: true,
        message: "Please fill out this field.",
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Please enter a valid email.",
      },
    },
  },
  {
    id: 1,
    type: "password",
    placeholder: "Password",
    name: "password",
    validation: {
      required: {
        value: true,
        message: "Please fill out this field.",
      },
    },
  },
];

export const signUpFields: Array<FormFields> = [
  {
    id: 0,
    type: "text",
    placeholder: "First Name",
    name: "firstName",
    validation: {
      required: {
        value: true,
        message: "Please fill out this field.",
      },
      pattern: {
        value: /^[^-\s][a-zA-Zñ\s-]+$/,
        message: "Please enter a valid first name.",
      },
    },
  },
  {
    id: 1,
    type: "text",
    placeholder: "Last Name",
    name: "lastName",
    validation: {
      required: {
        value: true,
        message: "Please fill out this field.",
      },
      pattern: {
        value: /^[^-\s][a-zA-Zñ\s-]*[.]{0,1}$/,
        message: "Please enter a valid last name.",
      },
    },
  },
  {
    id: 2,
    type: "email",
    placeholder: "Email Address",
    name: "email",
    validation: {
      required: {
        value: true,
        message: "Please fill out this field.",
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Please enter a valid email address.",
      },
    },
  },
  {
    id: 3,
    type: "password",
    placeholder: "Password",
    name: "password",
    validation: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 7,
        message: "Password must be greater than 7 characters.",
      },
    },
  },
  {
    id: 4,
    type: "password",
    placeholder: "Confirm Password",
    name: "confirmPassword",
    validation: {},
  },
];
