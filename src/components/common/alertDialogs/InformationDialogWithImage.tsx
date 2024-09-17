import Modal from 'react-modal';
import { MODAL_STYLE } from '../../../contsants';

interface InformationDialogWithImageProps {
  isDialogVisible: boolean;
  setIsDialogVisible: (value: boolean) => void;
  onRequestClose?: () => void;
  imageClassname?: string;
  imageSrc: string;
  PrimaryTextClassname?: string;
  PrimaryText: string;
  SecondaryText?: string;
  SecondaryTextClassname?: string;
}

const InformationDialogWithImage: React.FC<InformationDialogWithImageProps> = ({
  isDialogVisible = false,
  setIsDialogVisible,
  onRequestClose = () => {},
  imageClassname,
  imageSrc,
  PrimaryTextClassname,
  PrimaryText,
  SecondaryText = '',
  SecondaryTextClassname,
}) => {
  const closeDialog = () => {
    setIsDialogVisible(false);
    onRequestClose();
  };
  return (
    <>
      <Modal
        isOpen={isDialogVisible}
        onRequestClose={closeDialog}
        style={MODAL_STYLE}
        contentLabel="Information Dialog with Image"
        ariaHideApp={false}
      >
        <div className={`m-6`}>
          <div className="flex justify-end cursor-pointer" onClick={closeDialog}>
            {/* <Image src="/images/close.svg" alt="close" width={15} height={15} /> */}
            closeImg
          </div>
          <div
            style={{ height: 185, width: 275 }}
            className={`flex flex-col justify-center text-[1.4rem] text-center font-semibold`}
          >
            <div>
              {/* <Image className={imageClassname} src={imageSrc} alt="close" width={174} height={118} /> */}
              closeImg
            </div>
            <div className={`mt-[1.2rem]`}>
              <h1>
                <span className={`${PrimaryTextClassname}`}>{PrimaryText}</span>
                <span className={`${SecondaryTextClassname} ml-[0.4rem]`}>{SecondaryText}</span>
              </h1>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InformationDialogWithImage;
