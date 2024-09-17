import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Tab.module.scss';

interface TabProps {
  isSubTab?: boolean;
  title: string;
  isTabSelected: boolean;
  count?: number;
  onClickHandler?: () => void;
  href?: string;
  isForwardArrowEnabled?: boolean;
  isRouteReplaceEnabled?: boolean;
}

const Tab: React.FC<TabProps> = ({
  isSubTab = false,
  title,
  isTabSelected,
  count = 0,
  onClickHandler = () => {},
  href,
  isForwardArrowEnabled = false,
  isRouteReplaceEnabled = false,
}) => {
  const navigate = useNavigate();
  const selectedTabClassName = isSubTab ? styles.selectedSubTabHeader : styles.selectedTabHeader;

  return (
    <>
      {/* {isForwardArrowEnabled && (
        <div className={`w-5 h-5 my-[1.32rem] ml-2`}>
          <image width="100%" height="100%" href={'/images/forwardArrow.svg'} alt="forwardArrow" />
        </div>
      )} */}
      <div
        onClick={() => {
          onClickHandler();
          if (!href) {
            return;
          }
          if (isRouteReplaceEnabled) {
            navigate(href);
          } else {
            navigate(href);
          }
        }}
        className={`flex flex-row space-x-1 ${styles.tabHeader} ${isTabSelected && selectedTabClassName}`}
      >
        <h1>{title}</h1>
        {count >= 0 && <h1>{`(${count || 0})`}</h1>}
      </div>
    </>
  );
};

export default Tab;
