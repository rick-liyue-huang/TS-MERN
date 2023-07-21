import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { IBlog } from '../models/blogs';
import { useForm } from 'react-hook-form';
import { IBlogInput } from '../api/api_blogs';
import * as BlogApi from '../api/api_blogs';

interface AddBlogDialogProps {
  onDismiss: () => void;
  onBlogSaved: (blog: IBlog) => void;
}

export default function AddBlogDialog({
  onDismiss,
  onBlogSaved,
}: AddBlogDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IBlogInput>();

  async function onSubmit(blogInput: IBlogInput) {
    try {
      const blogRes = await BlogApi.createBlog(blogInput);
      console.log('blogRes: ', blogRes);
      onBlogSaved(blogRes);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Blog</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addBlogForm" onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" form="addBlogForm" disabled={isSubmitting}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
}
