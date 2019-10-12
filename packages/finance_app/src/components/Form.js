import React, { Component } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

const Form = () => {
  return (
    <Formik
      initialValues={{ name: '' }}
      validation={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Name is required';
        }
        return errors;
      }}
      onSubmit={values => {
        console.log('Submitted');
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <FormikForm onSubmit={handleSubmit} validationSchema={schema}>
          <Field type="text" name="name" />
          <ErrorMessage name="name" />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
