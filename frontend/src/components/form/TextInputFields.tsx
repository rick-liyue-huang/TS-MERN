import React from 'react';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Form } from 'react-bootstrap';

interface TextInputFieldsProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any; // allow for any other props
}

// extract the common logic of the TextInputFields component
export default function TextInputFields({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldsProps) {
  return (
    <Form.Group className="mb-3" controlId={name + '-input'}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...props}
        {...register(name, registerOptions)}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
