import s from './Input.module.scss'

type InputProps = {
  type?: string
  name: string
  value?: string | number
  onChange: React.ChangeEventHandler<any>
  onWheel?: React.WheelEventHandler<HTMLInputElement>
  placeholder?: string
  checked?: boolean
}

const Input = ({ type, name, value, onChange, onWheel, placeholder, checked }: InputProps) => {
  return (
    <input
      className={s.input}
      type={type || "text"}
      name={name}
      value={value}
      onChange={onChange}
      onWheel={onWheel}
      placeholder={placeholder}
      checked={checked}
    />
  )
}

export default Input;