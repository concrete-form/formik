/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik, useField, useFormikContext } from 'formik'

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

type InputProps = {
  name: string
}

const Input: React.FC<InputProps> = ({ name }) => {
  const [field, meta] = useField<any>(name)
  return (
    <>
      <input {...field} /><br />
      { meta.touched && meta.error && (
        <div style={{ color: '#f00' }}>{ meta.error }</div>
      ) }
    </>
  )
}

const App: React.FC = () => {
  const onSubmit = async (values: any) => { await wait(500); console.log(values) }

  return (
    <Formik onSubmit={onSubmit} initialValues={{ firstName: 'John', lastName: 'Doe' }}>
      { formikProps => {
        return (
          <form onSubmit={formikProps.handleSubmit}>

            <Input name="firstName" />
            <Input name="lastName" />
            <button type="submit">Submit</button>

          </form>
        )
      } }
    </Formik>
  )
}

export default App
