import React, { useState } from 'react';
import toast from 'react-hot-toast';

import styles from './SearchBarWithBtn.module.scss';

interface SearchBarWithBtnProps {
  searchTerm: string;
  searchPlaceholder: string;
  setSearchTerm: (value: string) => void;
}

const SearchBarWithBtn: React.FC<SearchBarWithBtnProps> = ({ searchTerm, setSearchTerm, searchPlaceholder }) => {
  const [value, setValue] = useState<string>(searchTerm?.length > 0 ? searchTerm : '');
  return (
    <>
      <form
        className={`${styles.searchContainer}`}
        onSubmit={(e) => {
          e.preventDefault();
          return;
        }}
      >
        <input
          type="text"
          name="search"
          className={`${styles.searchInput} w-full bg-[#f1f1f2]`}
          placeholder={searchPlaceholder}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button
          type="submit"
          className={`${styles.searchBtn} cursor-pointer`}
          onClick={() => {
            if (value.length > 0) {
              setSearchTerm(value);
            } else {
              toast.error('Please enter valid input');
            }
          }}
        >
          <div className={`${styles.searchIcon}`}>
            search
            {/* <Image height="100%" width="100%" src={`/images/searchIconDark.svg`} priority={true} alt="" /> */}
          </div>
        </button>
      </form>
    </>
  );
};

export default SearchBarWithBtn;
