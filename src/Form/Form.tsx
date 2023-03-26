'use client'

import { useRef } from 'react'
import { Formik, FormikConfig, FormikHelpers } from 'formik'
import { ConcreteFormProvider, ConcreteFormProps } from '@concrete-form/core'
import FormikFormHandler from '../FormikFormHandler'

export type FormProps<Values> = {
  initialValues: Values
  onSubmit?: (values: Values, formikHelpers?: FormikHelpers<Values>) => void | Promise<void>
  formikProps?: Omit<FormikConfig<any>, 'initialValues'|'onSubmit'>
} & ConcreteFormProps

const Form: React.FC<FormProps<any>> = ({
  onSubmit = () => {},
  initialValues,
  formikProps,
  noValidate = true,
  formProps,
  children,
  ...concreteFormConfig
}) => {
  const formHandler = useRef(new FormikFormHandler())

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} {...formikProps}>
      { updatedFormikProps => {
        formHandler.current.setFormikProps(updatedFormikProps)

        return (
          <ConcreteFormProvider formHandler={formHandler.current} config={concreteFormConfig}>
            <form
              onSubmit={updatedFormikProps.handleSubmit}
              noValidate={noValidate}
              {...formProps}
            >
              { children }
            </form>
          </ConcreteFormProvider>
        )
      } }
    </Formik>
  )
}

export default Form
