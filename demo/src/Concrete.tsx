import Form from '@concrete-form/formik'

import SubmitButton from '@concrete-form/html5/SubmitButton'
import Input from '@concrete-form/html5/Input'
import Autocomplete from '@concrete-form/html5/Autocomplete'
import FileInput from '@concrete-form/html5/FileInput'
import Textarea from '@concrete-form/html5/Textarea'
import Select from '@concrete-form/html5/Select'
import Checkbox from '@concrete-form/html5/Checkbox'
import Radio from '@concrete-form/html5/Radio'
import DateTime from '@concrete-form/html5/DateTime'
import ToggleSwitch from '@concrete-form/html5/ToggleSwitch'
import SingleCheckbox from '@concrete-form/html5/SingleCheckbox'
import Slider from '@concrete-form/html5/Slider'

const wait = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

const App: React.FC = () => {
  const values = {
    input: 'input',
    text: 'text',
    textarea: 'text\narea',
    number: 42,
    autocomplete: 'autocompleted',
    selectGroup: 'bar',
    selectMultiple: ['d', 'bar'],
    date: '2021-01-20',
    time: '14:59',
    datetime: '2021-01-20T14:59',
    checkbox: ['f', 'bar'],
    radio: 'bar',
    toggle: true,
    acceptTerms: false,
    slider: 75,
  }
  const onSubmit = async (values: any) => { await wait(500); console.log(values) }

  const groupOptions = [
    {
      group: 'Group Foo',
      options: [{ label: 'A', value: 'a' }, 'b', 'c'],
      props: { disabled: true },
    },
    'bar',
    { label: 'Baz', value: 'baz' },
    {
      group: 'Group Biz',
      options: [{ label: 'D', value: 'd' }, 'e'],
    },
  ]

  const options = [
    { label: 'Foo', value: 'f', props: { style: { background: 'deeppink' } } },
    'bar',
    { label: 'Baz', value: 'baz', props: { disabled: true } },
  ]

  return (
    <Form onSubmit={onSubmit} initialValues={values}>
      <Input name="input" placeholder="Input" />
      <Input name="number" type="number" placeholder="Input type number" />
      <Autocomplete name="autocomplete" fieldProps={{ required: true }} placeholder="autocomplete" />
      <FileInput name="file" />
      <Textarea name="textarea" placeholder="textarea" />
      <Select name="selectGroup" options={groupOptions} allowEmpty />
      <Select name="selectMultiple" options={groupOptions} multiple allowEmpty />
      <Checkbox name="checkbox" options={options} />
      <Radio name="radio" options={options} />
      <DateTime type="date" name="date" />
      <DateTime type="time" name="time" />
      <DateTime type="datetime" name="datetime" />
      <ToggleSwitch name="toggle" label="I'm a toggle switch" />
      <Slider label="Optional slider label" name="slider" />
      <SingleCheckbox name="acceptTerms" label={<>I accept the <a href="#void">terms and conditions</a></>} />
      <br />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}

export default App
