import s from './Input.module.scss'

type InputProps = {
  type?: string
  name: string
  value?: string | number
  onChange: React.ChangeEventHandler<any>
  onWheel?: React.WheelEventHandler<HTMLInputElement>
}

const Input = ({ type, name, value, onChange, onWheel }: InputProps) => {
  return (
    <input
      className={s.input}
      type={type || "text"}
      name={name}
      value={value}
      onChange={onChange}
      onWheel={onWheel}
    />
  )
}

export default Input;