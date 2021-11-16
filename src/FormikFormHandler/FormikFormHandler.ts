import { FormHandler /* Translation, TranslationKeys */ } from '@concrete-form/core'
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
   * Note: we intentionnaly ignore getFieldProps options since it's already handle by
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
    const { value, error } = this.formikProps.getFieldMeta(name)
    return {
      value,
      errors: error ? [error] : [],
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
    this.formikProps.setFieldValue(name, value, shouldValidate)
    if (shouldTouch) {
      this.formikProps.setTouched({
        [name]: true,
      }, false)
    }
  }
}
