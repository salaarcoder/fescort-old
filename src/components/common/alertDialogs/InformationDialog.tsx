import Modal from 'react-modal';
import { MODAL_STYLE } from '../../../contsants';

interface InformationDialogProps {
  isDialogVisible: boolean;
  setIsDialogVisible: (value: boolean) => void;
  title: string;
  titleClassName?: string;
  description: string;
  descriptionClassName?: string;
}

const InformationDialog: React.FC<InformationDialogProps> = ({
  isDialogVisible = false,
  setIsDialogVisible,
  titleClassName,
  title,
  descriptionClassName,
  description,
}) => {
  //
  const closeDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <>
      <Modal
        isOpen={isDialogVisible}
        onRequestClose={closeDialog}
        style={MODAL_STYLE}
        contentLabel="Information Dialog"
        ariaHideApp={false}
      >
        <div className={`m-6`}>
          <div className="flex justify-end cursor-pointer" onClick={closeDialog}>
            {/* <Image src="/images/close.svg" alt="close" width={15} height={15} /> */}
            closeImg
          </div>
          <div
            style={{ height: 165, width: 285 }}
            className={`flex flex-col justify-center text-[1.4rem] text-center font-semibold`}
          >
            <h1 className={titleClassName}>{title}</h1>
            <h1 className={descriptionClassName}>{description}</h1>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InformationDialog;
