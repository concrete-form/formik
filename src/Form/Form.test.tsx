import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Form from './Form'

// using "any" as a workaround for a bug in typescript : https://github.com/microsoft/TypeScript/issues/28960
const testIdForm = { formProps: { 'data-testid': 'form' } } as any

describe('Form', () => {
  it('render novalidate by default', () => {
    render(<Form {...testIdForm} />)
    expect(screen.getByTestId('form')).toHaveProperty('noValidate', true)
  })

  it('doesn\'t render novalidate when disabled', () => {
    render(<Form {...testIdForm} noValidate={false} />)
    expect(screen.getByTestId('form')).toHaveProperty('noValidate', false)
  })

  it('renders children', () => {
    render(<Form onSubmit={jest.fn()} initialValues={{}}>test-children</Form>)
    expect(screen.getByText('test-children')).toBeInTheDocument()
  })

  it('calls onSubmit', async () => {
    const onSubmit = jest.fn()
    render(<Form onSubmit={onSubmit} initialValues={{}}><button type="submit">submit</button></Form>)
    await userEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
    })
  })

  it('doesn\'t crash without onSubmit callback', async () => {
    render(<Form initialValues={{}}><button type="submit">submit</button></Form>)
    const submitButton = screen.getByRole('button', { name: 'submit' })
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })
  })
})
