import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { IBlog } from '../models/blogs';
import { useForm } from 'react-hook-form';
import { IBlogInput } from '../api/api_blogs';
import * as BlogApi from '../api/api_blogs';
import TextInputFields from './form/TextInputFields';

export interface AddOrEditBlogDialogProps {
  onDismiss: () => void;
  onBlogSaved: (blog: IBlog) => void;
  blogBeEdit?: IBlog;
}

export default function AddOrEditBlogDialog({
  onDismiss,
  onBlogSaved,
  blogBeEdit,
}: AddOrEditBlogDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IBlogInput>({
    defaultValues: {
      title: blogBeEdit?.title ?? '',
      text: blogBeEdit?.text ?? '',
    },
  });

  async function onSubmit(blogInput: IBlogInput) {
    try {
      // if blogBeEdit is not undefined, then we are editing a blog
      let blogRes: IBlog;
      if (blogBeEdit) {
        blogRes = await BlogApi.updateBlog(blogBeEdit._id, blogInput);
        console.log('EDIT blogRes: ', blogRes);
      } else {
        blogRes = await BlogApi.createBlog(blogInput);
        console.log('CREATE blogRes: ', blogRes);
      }
      onBlogSaved(blogRes);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{blogBeEdit ? 'Edit Blog' : 'Add Blog'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditBlogForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputFields
            name="title"
            label="Title"
            type="text"
            placeholder="Enter title"
            register={register}
            registerOptions={{ required: 'Title Required' }}
            error={errors.title}
          />

          <TextInputFields
            name="text"
            label="Content"
            as="textarea"
            placeholder="Enter Content"
            register={register}
            registerOptions={{ required: 'Content Required' }}
            error={errors.text}
          />

          {/*
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter content of blog"
              {...register('text')}
            />
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" form="addEditBlogForm" disabled={isSubmitting}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}
