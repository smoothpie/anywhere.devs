import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './SortSelect.module.scss';

type Option = {
  value: string;
  label: string;
};

type SortSelectProps = {
  options: Option[];
  style?: React.CSSProperties;
  onSelect?: (option: { value: string; label: string }) => void;
  defaultValue?: { value: string; label: string };
}

export default function SortSelect(props: SortSelectProps) {
  const { options, style, onSelect, defaultValue } = props;

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<any>(options[0]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);

  const handleOptionSelect = (option: Option) => {
    if (option.value === undefined) {
      setSelectedOption(options[0]);
    } else {
      setSelectedOption(option);
    }

    if (onSelect) {
      onSelect(option);
    }

    setShowDropdown(false);
  };

  return (
    <div
      className={
        showDropdown ? `${styles.select} ${styles.selectOpen}` : styles.select
      }
      style={style}
    >
      <div
        className={styles.label}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Sort: {selectedOption.label}
        {showDropdown ? (
          <Image
            src="/chevron-up.svg"
            alt="chevron up"
            width={20}
            height={20}
          />
        ) : (
          <Image
            src="/chevron-down.svg"
            alt="chevron down"
            width={20}
            height={20}
          />
        )}
      </div>
      {showDropdown && (
        <ul className={styles.list}>
          {options.map((option, i) => (
            <li key={i} onClick={() => handleOptionSelect(option)}>
              <p>{option.label}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
