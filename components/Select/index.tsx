import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import s from './Select.module.scss';

type SelectProps = {
  name: string
  options: { value: string | number, label: string }[]
  defaultValue?: { value: string | number, label: string };
  value?: { value: string | number, label: string }
  onChange: (e: any) => void
  isSearchable?: boolean
  isClearable?: boolean
  isCreatable?: boolean
  isMulti?: boolean
}

const CustomSelect = ({
  name, options, defaultValue, value, onChange, isSearchable, isClearable, isCreatable, isMulti
}: SelectProps) => {
  return (
    <div className={s.container}>
      {!isCreatable ? (
        <Select
          defaultValue={defaultValue}
          value={value}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isMulti={isMulti}
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
              primary25: '#eeefea',
            },
          })}
        />
      ) : (
        <CreatableSelect
          defaultValue={defaultValue}
          value={value}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isMulti={isMulti}
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
              primary25: '#eeefea',
            },
          })}
        />
      )}
    </div>
  )
}

export default CustomSelect;