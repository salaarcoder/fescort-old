import React from 'react';

import styles from './SearchBarWithFilter.module.scss';

interface SearchBarWithFilterProps {
  searchTerm: string;
  searchPlaceholder: string;
  setSearchTerm: (value: string) => void;
  onFilterClick?: () => void;
  isFilterVisible?: boolean;
  isSearchVisible?: boolean;
}

const SearchBarWithFilter: React.FC<SearchBarWithFilterProps> = ({
  searchTerm,
  setSearchTerm,
  onFilterClick,
  searchPlaceholder,
  isFilterVisible = true,
  isSearchVisible = true,
}) => {
  return (
    <div className="flex flex-col">
      <div className={`${styles.filterAndSearchContainer} flex justify-between mt-2 cursor-pointer`}>
        {isFilterVisible && (
          <div className={`${styles.filterContainer} flex items-center`} onClick={onFilterClick}>
            {/* <div className={`${styles.filterIcon}`}>
              <Image height="100%" width="100%" src={'/images/filterIcon.png'} alt="" />
            </div> */}
            <div className={`mr-2 text-base font-semibold ${styles.filterIconText}`}>Filter</div>
            <div className={`${styles.dropDownIcon}`}>
              <img height="100%" width="100%" src={'/images/downLight.png'} alt="" />
            </div>
          </div>
        )}
        {isSearchVisible && (
          <div
            className={`${styles.searchBar} ${
              isFilterVisible ? styles.searchWithFilter : styles.searchFull
            } flex justify-start items-center`}
          >
            {/* <div className={styles.searchIcon}>
              <Image height="100%" width="100%" src={'/images/searchIcon.png'} priority={true} alt="" />
            </div> */}
            <input
              className={`${styles.searchInput} w-full bg-[#f1f1f2]`}
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBarWithFilter;
