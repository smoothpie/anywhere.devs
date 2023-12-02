import Select from 'react-select';
import s from './Select.module.scss';

type SelectProps = {
  name: string
  options: { value: string, label: string }[]
  defaultValue?: { value: string, label: string };
  value?: { value: string, label: string }
  onChange: (e: any) => void
  isSearchable?: boolean
  isClearable?: boolean
}

const CustomSelect = ({ name, options, defaultValue, value, onChange, isSearchable, isClearable }: SelectProps) => {
  return (
    <div className={s.container}>
      <Select
        defaultValue={defaultValue}
        value={value}
        isSearchable={isSearchable}
        isClearable={isClearable}
        name={name}
        options={options}
        onChange={onChange}
        className="react-select"
        classNamePrefix="select"
        theme={(theme) => ({
          ...theme,
          colors: {
          ...theme.colors,
            primary: 'black',
          },
        })}
      />
    </div>
  )
}

export default CustomSelect;