import React from 'react';
import { Triangle, ThreeDots, ThreeCircles } from 'react-loader-spinner';
import { LOADER_COLORS, LoaderTypes } from '../../contsants';

interface LoaderProps {
  type?: LoaderTypes;
  height?: number;
  width?: number;
  color?: LOADER_COLORS;
  isTextVisible?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  type = LoaderTypes.THREE_CIRCLES,
  color = LOADER_COLORS.APP_PRIMARY,
  height = 50,
  width = 50,
  isTextVisible = true,
}) => {
  const getLoader = () => {
    switch (type) {
      case LoaderTypes.TRIANGLE:
        return <Triangle color={color} height={height} width={width} />;
      case LoaderTypes.THREE_DOTS:
        return <ThreeDots color={color} height={height} width={width} />;
      case LoaderTypes.THREE_CIRCLES:
        return <ThreeCircles color={color} height={height} width={width} ariaLabel="three-circles-rotating" />;
      default:
        break;
    }
  };
  return (
    <div className={`flex flex-col justify-center items-center text-lg font-semibold`}>
      <div>{getLoader()}</div>
      {isTextVisible && (
        <div className={`mt-4`} style={{ color: color }}>
          Please wait, while we fetch data...
        </div>
      )}
    </div>
  );
};

export default Loader;
