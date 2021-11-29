import { FormHandler, Translation } from '@concrete-form/core'
import { FormikProps } from 'formik'

export default class FormikFormHandler implements FormHandler {
  public formikProps?: FormikProps<any>

  public setFormikProps (formikProps: FormikProps<any>) {
    this.formikProps = formikProps
  }

  public getFormState () {
    /* istanbul ignore if */
    if (!this.formikProps) {
      throw new Error('Missing Formik context')
    }

    return {
      isSubmitting: !!this.formikProps.isSubmitting,
      hasErrors: Object.keys(this.formikProps.errors).length > 0,
    }
  }

  /**
   * Note: we intentionnaly ignore getFieldProps options since it's already handled by
   * Concrete Form (checkbox, radio, select, etc)
   */
  public getControlProps (name: string) {
    /* istanbul ignore if */
    if (!this.formikProps) {
      throw new Error('Missing Formik context')
    }
    return this.formikProps.getFieldProps({ name })
  }

  public getControlState (name: string) {
    /* istanbul ignore if */
    if (!this.formikProps) {
      throw new Error('Missing Formik context')
    }
    const { value, error, touched } = this.formikProps.getFieldMeta(name)

    let errors: any[] = []
    if (touched && error) {
      errors = this.uniqueErrors(Array.isArray(error) ? error : [error])
    }

    return {
      value,
      errors,
    }
  }

  public setFieldValue (
    name: string,
    value: any,
    shouldValidate?: boolean,
    shouldTouch?: boolean,
  ) {
    /* istanbul ignore if */
    if (!this.formikProps) {
      throw new Error('Missing Formik context')
    }
    if (shouldTouch) {
      this.formikProps.setFieldTouched(name, true, false)
    }
    this.formikProps.setFieldValue(name, value, shouldValidate)
  }

  private readonly uniqueErrors = (errors: Translation[]) => Array.from(new Set(errors))
}
