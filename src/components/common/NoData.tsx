import { FC } from 'react';

interface NoDataParams {
  text?: string;
}

const NoData: FC<NoDataParams> = ({ text }) => (
  <div className={`flex justify-center text-lg font-semibold text-gray-400 pt-5`}>
    {text ? text : 'No data to display'}
  </div>
);

export default NoData;
