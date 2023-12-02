import s from './Textarea.module.scss'

type TextareaProps = {
  name: string
  value?: string
  onChange: React.ChangeEventHandler<any>
  rows?: number
}

const Textarea = ({ name, value, onChange, rows }: TextareaProps) => {
  return (
    <textarea
      className={s.textarea}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
    />
  )
}

export default Textarea;