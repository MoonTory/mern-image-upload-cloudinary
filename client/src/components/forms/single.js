import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

export class SingleFileForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ name: '', file: null }}
        onSubmit={async (values, actions) => {
          const payload = new FormData();

          if (values.file) {
            payload.append('name', values.name);
            payload.append('file', values.file);
          } else {
            console.log('No File was selected ya fool!');
            actions.setSubmitting(false);
            actions.resetForm();
            return;
          }

          console.log('payload', payload);

          const response = await axios({
            method: 'post',
            url: 'http://localhost:5002/api/upload/single',
            data: payload,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          });

          console.log('response', response);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        // TODO: Write Yup validation for the form
        render={({ isSubmitting, errors, touched, values, setFieldValue }) => (
          <Form encType='multipart/form-data'>
            <div className='form-group'>
              <label>Nome Completo:</label>
              <Field
                className='form-control'
                type='name'
                name='name'
                placeholder='Nome'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='file'>File upload</label>
              <input
                id='file'
                name='file'
                type='file'
                onChange={event => {
                  setFieldValue('file', event.currentTarget.files[0]);
                }}
                className='form-control'
              />
            </div>
            {isSubmitting ? null : (
              <button
                className='btn btn-secondary'
                type='submit'
                disabled={isSubmitting}
              >
                Enviar
              </button>
            )}
          </Form>
        )}
      />
    );
  }
}
