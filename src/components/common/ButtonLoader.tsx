import { Loader } from '.';
import { LOADER_COLORS, LoaderTypes } from '../../contsants';

interface ButtonLoaderProps {
  color?: LOADER_COLORS;
  height?: number;
  width?: number;
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  color = LOADER_COLORS.BUTTON_PRIMARY,
  height = 18,
  width = 32,
}) => {
  return (
    <div>
      <Loader type={LoaderTypes.THREE_DOTS} isTextVisible={false} color={color} height={height} width={width} />
    </div>
  );
};

export default ButtonLoader;
