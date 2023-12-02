import { useState } from 'react';
import SortSelect from '../../../../components/SortSelect';
import { sortOptions } from '../../constants';

type SorterProps = {
  filteredResults: any[];
  setFilteredResults: (results: any[]) => void;
}

type SortOption = {
  label: string;
  value: string;
}

const Sorter = ({ filteredResults, setFilteredResults }: SorterProps) => {
  const [sortBy, setSortBy] = useState<any>(sortOptions[0]);

  const sortResults = (sortBy: SortOption) => {
    const sortedResults = filteredResults.sort((a, b) => {
      if (sortBy.value === "az") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy.value === "price") {
        return (!a.price ? -1 : (!b.price ? 1 : a.price.amount - b.price.amount));
      }
      if (sortBy.value === "added") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    setFilteredResults([...sortedResults]);
  }
  
  return (
    <SortSelect
      options={sortOptions}
      defaultValue={sortBy}
      onSelect={(option) => sortResults(option)}
    />
  )
}

export default Sorter