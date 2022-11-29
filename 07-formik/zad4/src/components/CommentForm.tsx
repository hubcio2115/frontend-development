import { Field, Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import { IComment } from '../App';
import { fetchComments } from '../utils/fetchComments';

const formSchema = yup.object({
  name: yup
    .string()
    .required('This field is required')
    .min(1, 'Name has to be longer than one character')
    .max(20, 'Name has to be shorter or equal to 20 in length'),
  email: yup
    .string()
    .required('Email is required')
    .email('Provided email has wrong format'),
  body: yup.string(),
});

const initialFormValues = {
  name: '',
  email: '',
  body: '',
};

export interface CommentFormProps {
  setComments: Dispatch<SetStateAction<IComment[]>>;
}

const CommentForm = ({ setComments }: CommentFormProps) => {
  return (
    <div>
      <Formik
        validationSchema={formSchema}
        initialValues={initialFormValues}
        onSubmit={(values, actions) => {
          (async () => {
            try {
              const res = await fetch(
                'https://jsonplaceholder.typicode.com/comments',
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(values),
                },
              );

              if (res.ok) {
                const data = await fetchComments();

                if (!!data) {
                  setComments(data);
                  actions.resetForm();
                }
              } else throw Error('Something went wrong with the request');
            } catch (e) {
              console.error(e);
            }
          })();
        }}
      >
        {({ handleSubmit, errors, handleReset }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field type="text" name="name" placeholder="name" />
              {!!errors.name ? <p>{errors.name}</p> : null}
            </div>

            <div>
              <Field type="email" name="email" placeholder="email" />
              {!!errors.email ? <p>{errors.email}</p> : null}
            </div>

            <div>
              <Field
                type="text"
                as="textarea"
                name="body"
                placeholder="comment"
              />
              {!!errors.body ? <p>{errors.body}</p> : null}
            </div>

            <button type="submit">Submit</button>
            <button type="reset" onClick={handleReset}>
              Reset
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CommentForm;
