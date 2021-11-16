import { useField } from 'formik'
import React from 'react'
import * as Yup from 'yup'

export const schema = Yup.object({
  test: Yup.string().required('required'),
})

const RequiredInput: React.FC = () => {
  const [field] = useField('test')
  return (
    <input {...field} />
  )
}

export default RequiredInput
