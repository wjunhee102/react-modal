import { ModalComponent, ModalComponentMeta, ModalDispatcher } from "../modal";

const Modal1: ModalComponent = ({ closeModal, confirmModalCallback, confirmModalCallbackProps, content }) => {
  
  const onClickClose = () => {
    closeModal();
  }

  const onClickConfirm = () => {
    closeModal(confirmModalCallback, confirmModalCallbackProps);
  }
  
  return (
    <div className="w-[300px] h-[100px] bg-white shadow-sm shadow-slate-50">
      <div>
        {content}
      </div>
      <div className="flex justify-between items-center h-full px-4">
        <button onClick={onClickClose}>Close</button>
        <button onClick={onClickConfirm}>Confirm</button>
      </div>
    </div>
  )
}

const modalComponentMetaList: ModalComponentMeta[] = [
  {
    name: "modal1",
    component: Modal1,
    defaultOptions: {
      duration: 400,
    }
  }
]

const ModalContainer = () => {
  return <ModalDispatcher modalComponentMeta={modalComponentMetaList} />;
}

export default ModalContainer;