import React from 'react';
import { IUser } from '../models/users';
import { useForm } from 'react-hook-form';
import { SignUpCredentials } from '../api/api_users';
import * as UserApi from '../api/api_users';
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputFields from './form/TextInputFields';
import UtilsStyles from '../styles/utils.module.css';

interface SignUpUserDialogProps {
  onDismiss: () => void;
  onSignUp: (user: IUser) => void;
}

export default function SignUpUserDialog({
  onDismiss,
  onSignUp,
}: SignUpUserDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>({
    defaultValues: {
      username: '',
      rawPassword: '',
      email: '',
    },
  });

  async function onSubmit(signUpCredentials: SignUpCredentials) {
    try {
      const newUser = await UserApi.signUp(signUpCredentials);
      onSignUp(newUser);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputFields
            name="username"
            label="Username"
            type="text"
            placeholder="Input username please"
            register={register}
            registerOptions={{ required: 'Username Required' }}
            error={errors.username}
          />
          <TextInputFields
            name="email"
            label="Email"
            type="email"
            placeholder="Input email please"
            register={register}
            registerOptions={{ required: 'Email Required' }}
            error={errors.email}
          />
          <TextInputFields
            name="rawPassword"
            label="Password"
            type="password"
            placeholder="Input password please"
            register={register}
            registerOptions={{ required: 'Password Required' }}
            error={errors.rawPassword}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={UtilsStyles.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
