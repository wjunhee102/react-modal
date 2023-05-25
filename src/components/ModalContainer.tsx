import { ModalComponent, ModalDispatcher } from "../modal";

const Modal1: ModalComponent = ({ }) => {
  return (
    <div className="">

    </div>
  )
}

const modalComponentMeta = {

}

const ModalContainer = () => {
  return <ModalDispatcher modalComponentMeta=[{} />;
}

export default ModalContainer;