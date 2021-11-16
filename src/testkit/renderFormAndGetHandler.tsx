import { render } from '@testing-library/react'
import { useConcreteFormHandler } from '@concrete-form/core'

import Form, { FormProps } from '../Form/Form'
import FormikFormHandler from '../FormikFormHandler'

type FormHandlerExtractorProps = {
  getHandler: (handler: FormikFormHandler) => void
}

const FormHandlerExtractor: React.FC<FormHandlerExtractorProps> = ({ getHandler }) => {
  const formHandler = useConcreteFormHandler() as FormikFormHandler
  getHandler(formHandler)
  return null
}

const renderFormAndGetHandler = (props: FormProps<any>, children?: React.ReactNode) => {
  let formHandler
  render(
    <Form {...props}>
      { children }
      <button type="submit">submit</button>
      <FormHandlerExtractor getHandler={(handler: FormikFormHandler) => { formHandler = handler }} />
    </Form>,
  )
  return formHandler as unknown as FormikFormHandler
}

export default renderFormAndGetHandler
