import { FC } from 'react';
import styles from './NoAccess.module.scss';

interface NoAccessParams {}

const NoAccess: FC<NoAccessParams> = ({}) => (
  <div className={`${styles.componentContainer} flex items-center justify-center`}>
    <div
      className={`${styles.noAccessContainer} flex flex-col justify-center items-center text-3xl font-bold space-y-8`}
    >
      <div className="w-32 h-32">
        no access
        {/* <Image src="/images/circle-with-a-line-through2.png" alt="No Access" width="100%" height="100%" /> */}
      </div>
      <h1 className="text-red-700">You are not authorized to access this!</h1>
    </div>
  </div>
);

export default NoAccess;
