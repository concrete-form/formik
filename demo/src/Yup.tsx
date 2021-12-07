import * as Yup from 'yup'
import Form from '@concrete-form/formik'
import Input from '@concrete-form/html5/Input'
import SubmitButton from '@concrete-form/html5/SubmitButton'
import { useFormikContext } from 'formik'

export const schema = Yup.object({
  test: Yup.string().required().min(10),
})

const Debug: React.FC = () => {
  const { errors } = useFormikContext()
  return (
    <pre>
      { JSON.stringify(errors, undefined, 2) }
    </pre>
  )
}

const App: React.FC = () => {
  const onSubmit = (values: any) => { console.log(values) }
  return (
    <Form initialValues={{ test: '' }} onSubmit={onSubmit} formikProps={{ validationSchema: schema }}>
      <Input name="test" />
      <SubmitButton>submit</SubmitButton>
      <Debug />
    </Form>
  )
}

export default App
