import { screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Yup from 'yup'

import renderFormAndGetHandler from '../testkit/renderFormAndGetHandler'
import RequiredInput, { schema } from '../testkit/RequiredInput'

describe('FormikFormHandler', () => {
  describe('getFormState', () => {
    it('returns isSubmitting=true when form is submitting', async () => {
      const onSubmit = jest.fn().mockReturnValue(null)
      const formHandler = renderFormAndGetHandler({ initialValues: {}, onSubmit })

      expect(formHandler.getFormState().isSubmitting).toBe(false)
      userEvent.click(screen.getByRole('button', { name: 'submit' }))
      expect(formHandler.getFormState().isSubmitting).toBe(true)
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled()
      })
      expect(formHandler.getFormState().isSubmitting).toBe(false)
    })

    it('returns hasErrors=true when form has errors', async () => {
      const onSubmit = jest.fn().mockReturnValue(null)
      const formHandler = renderFormAndGetHandler(
        {
          initialValues: { test: '' },
          onSubmit,
          formikProps: { validationSchema: schema },
        },
        <RequiredInput />,
      )
      const input = screen.getByRole('textbox')

      expect(formHandler.getFormState().hasErrors).toBe(false)
      userEvent.click(input)
      userEvent.click(document.body)
      await waitFor(() => {
        expect(formHandler.getFormState().hasErrors).toBe(true)
      })
      userEvent.type(input, 'foo')
      await waitFor(() => {
        expect(formHandler.getFormState().hasErrors).toBe(false)
      })
    })
  })

  describe('getControlProps', () => {
    it('returns control props', async () => {
      const onSubmit = jest.fn().mockReturnValue(null)
      const formHandler = renderFormAndGetHandler({ initialValues: { foo: 'bar' }, onSubmit })
      const props = formHandler.getControlProps('foo')

      expect(props).toEqual({
        name: 'foo',
        value: 'bar',
        onChange: expect.anything(),
        onBlur: expect.anything(),
      })
    })
  })

  describe('setFieldValue', () => {
    it('set field value', async () => {
      const formHandler = renderFormAndGetHandler({ initialValues: { foo: 'foo' } })
      act(() => {
        formHandler.setFieldValue('foo', 'bar')
      })
      await waitFor(() => {
        expect(formHandler.getControlState('foo').value).toBe('bar')
      })
    })

    it('validate the field when updating the value', async () => {
      const formHandler = renderFormAndGetHandler(
        {
          initialValues: { test: '' },
          formikProps: { validationSchema: schema },
        },
        <RequiredInput />,
      )
      act(() => {
        formHandler.setFieldValue('test', 'bar', false, true)
      })
      expect(formHandler.getControlState('test').errors).toHaveLength(0)
      act(() => {
        formHandler.setFieldValue('test', '', true, true)
      })
      await waitFor(() => {
        expect(formHandler.getControlState('test').errors).toHaveLength(1)
      })
    })
  })

  describe('getControlState', () => {
    it('returns control value', async () => {
      const formHandler = renderFormAndGetHandler({ initialValues: { test: 'foo' } }, <RequiredInput />)
      const input = screen.getByRole('textbox')
      expect(formHandler.getControlState('test').value).toBe('foo')
      userEvent.clear(input)
      userEvent.type(input, 'bar')
      await waitFor(() => {
        expect(formHandler.getControlState('test').value).toBe('bar')
      })
    })

    it('returns control errors', async () => {
      const formHandler = renderFormAndGetHandler(
        {
          initialValues: { test: '' },
          formikProps: { validationSchema: schema },
        },
        <RequiredInput />,
      )
      const input = screen.getByRole('textbox')
      expect(formHandler.getControlState('test').errors).toEqual([])
      userEvent.click(input)
      userEvent.click(document.body)

      await waitFor(() => {
        expect(formHandler.getControlState('test').errors).toHaveLength(1)
      })
    })

    it('ignores duplicated errors', async () => {
      const schema = Yup.object({
        test: Yup.array().of(Yup.string().min(3, 'err1')).min(1).required(),
      })
      const formHandler = renderFormAndGetHandler(
        {
          initialValues: { test: [] },
          formikProps: { validationSchema: schema },
        },
        <RequiredInput />,
      )
      formHandler.getControlProps('test')
      act(() => {
        formHandler.setFieldValue('test', ['fo', 'ba'], true, true)
      })

      await waitFor(() => {
        expect(formHandler.getControlState('test').errors).toEqual(['err1'])
      })
    })
  })
})
