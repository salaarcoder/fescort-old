import React from 'react';

import styles from './SearchBarWithFilter.module.scss';

interface SearchBarProps {
  searchTerm: string;
  searchPlaceholder: string;
  setSearchTerm: (value: string) => void;
  setIsSearchEnabled: (value: boolean) => void;
  isSearchEnabled: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  searchPlaceholder,
  setIsSearchEnabled,
  isSearchEnabled,
}) => {
  return (
    <div className="flex flex-col">
      <div className={`${styles.filterAndSearchContainer} flex justify-between mt-2 `}>
        <div className={`${styles.searchBar} ${styles.searchFull} flex justify-start items-center`}>
          <div
            className={`${styles.searchIcon} ${searchTerm.length > 0 ? 'cursor-pointer' : ''}`}
            onClick={() => {
              if (searchTerm.length > 0) {
                setIsSearchEnabled(false);
                setSearchTerm('');
              } else {
                setIsSearchEnabled(true);
              }
            }}
          >
            {/* <Image
              height="100%"
              width="100%"
              src={`/images/${searchTerm.length > 0 ? 'cancelImage.svg' : 'searchIcon.png'}`}
              priority={true}
              alt=""
            /> */}
            {searchTerm.length > 0 ? 'cancelImage' : 'searchIcon'}
          </div>
          <input
            className={`${styles.searchInput} w-full bg-[#f1f1f2]`}
            placeholder={searchPlaceholder}
            value={searchTerm}
            disabled={searchTerm.length > 0}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
