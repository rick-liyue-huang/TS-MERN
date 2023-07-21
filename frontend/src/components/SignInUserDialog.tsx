import React from 'react';
import { IUser } from '../models/users';
import { useForm, RegisterOptions } from 'react-hook-form';
import { SignInCredentials } from '../api/api_users';
import * as UserApi from '../api/api_users';
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputFields from './form/TextInputFields';
import UtilsStyles from '../styles/utils.module.css';

interface SignInUserDialogProps {
  onDismiss: () => void;
  onSignIn: (user: IUser) => void;
}

export default function SignInUserDialog({
  onDismiss,
  onSignIn,
}: SignInUserDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInCredentials>({
    defaultValues: { username: '', rawPassword: '' },
  });

  async function onSubmit(signInCredentials: SignInCredentials) {
    try {
      const user = await UserApi.signIn(signInCredentials);
      onSignIn(user);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputFields
            name="username"
            label="Username"
            type="text"
            placeholder="Input Username please"
            register={register}
            RegisterOptions={{ required: 'Username Required' }}
            error={errors.username}
          />
          <TextInputFields
            name="rawPassword"
            label="Password"
            type="password"
            placeholder="Input password please"
            register={register}
            RegisterOptions={{ required: 'Password Required' }}
            error={errors.rawPassword}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={UtilsStyles.width100}
          >
            Sign In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
