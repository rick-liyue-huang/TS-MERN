import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { IBlog } from '../models/blogs';
import { useForm } from 'react-hook-form';
import { IBlogInput } from '../api/api_blogs';
import * as BlogApi from '../api/api_blogs';

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
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              isInvalid={!!errors.title}
              {...register('title', { required: 'Title Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter content of blog"
              {...register('text')}
            />
          </Form.Group>
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
