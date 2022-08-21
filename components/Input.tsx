import React from 'react';
import { ElementLike, FieldError } from 'react-hook-form/dist/types';
import { Container, Input } from 'styles/styled-components/input.styled';

type StateProps = 'default' | 'active' | 'error' | 'disabled' | string;

type Props = {
  type: 'text' | 'number' | 'password' | 'email' | 'calendar' | 'textArea';
  placeholder: string;
  reference?: any;
  name: string;
  defaultValue?: string;
  errors?: Partial<Record<string, FieldError>>;
  disabled?: boolean;
  styles?: React.CSSProperties;
  onChange?: (e: string) => void;
  onFocus?: (e: string) => void;
};

const InputComponent = ({
  errors,
  disabled,
  name,
  reference: ref,
  type,
  placeholder,
  defaultValue,
  styles,
  onChange,
  onFocus,
}: Props) => {
  const [state, setState] = React.useState<StateProps>('default');
  const [error, setError] = React.useState<React.SetStateAction<StateProps>>();
  const [value, setValue] = React.useState<React.SetStateAction<StateProps>>();
  const [isNotSsr, setIsNotSsr] = React.useState(false);

  const reference = ref as unknown as (ed: ElementLike | null) => void;

  const hasError = () => !!error && state === 'error';
  const getError = () => (error && state === 'error' ? error : null) as boolean | null;

  const changingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    setValue(e.target.value);
  };

  const renderFormInput = () => {
    switch (type) {
      case 'textArea':
        return (
          <Input.TextArea
            ref={reference}
            placeholder={placeholder}
            name={name}
            rows={3}
            disabled={disabled}
            defaultValue={defaultValue}
            onFocus={() => {
              if (state !== 'error') setState('active');
              if (onFocus) onFocus(name);
            }}
            onBlur={(e) => {
              let status = '';
              if (hasError()) status = 'error';
              if (e.target.value) status = 'active';
              setState(status);
            }}
            onChange={(e: any) => changingInput(e)}
            onMouseOver={() => !['error', 'disabled'].includes(state) && setState('active')}
            onMouseLeave={(e) => {
              const isFocused = document.activeElement === e.target;
              let status = '';
              if (hasError()) status = 'error';
              if (value) status = 'active';
              if (isFocused) status = 'active';

              if (!['error', 'disabled'].includes(state)) setState(status);
            }}
          />
        );
      default:
        return (
          <Input.Element
            ref={reference}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            defaultValue={defaultValue}
            onFocus={() => {
              if (state !== 'error') setState('active');
              if (onFocus) onFocus(name);
            }}
            onBlur={(e) => {
              let status = '';
              if (hasError()) status = 'error';
              if (e.target.value) status = 'active';
              setState(status);
            }}
            onChange={(e) => changingInput(e)}
            onMouseOver={() => !['error', 'disabled'].includes(state) && setState('active')}
            onMouseLeave={(e) => {
              const isFocused = document.activeElement === e.target;
              let status = '';
              if (hasError()) status = 'error';
              if (value) status = 'active';
              if (isFocused) status = 'active';

              if (!['error', 'disabled'].includes(state)) setState(status);
            }}
          />
        );
    }
  };

  React.useEffect(() => {
    if (!isNotSsr) {
      setIsNotSsr(true);
    }
  }, []);

  React.useEffect(() => {
    if (disabled) {
      setState('disabled');
    } else if (errors && errors[name]) {
      setError(errors[name]?.message);
      setState('error');
    } else {
      const values = value ? 'active' : state;
      setState(values);
    }
  }, [errors, disabled, name, value]);

  return (
    <Container.Wrapper style={styles}>
      <Container.Field className={state}>
        {isNotSsr && renderFormInput()}
        <div className={`input-border input-border___${state}`} />
      </Container.Field>
      {hasError() && <p className="error-text">{getError()}</p>}
    </Container.Wrapper>
  );
};

export default InputComponent;
