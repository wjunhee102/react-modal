import { useState } from "react";
import { ModalFC, ModalMeta, ModalProvider } from "../modal";

function delay(time: number) {
  console.log("delay");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  })
} 

const Modal1: ModalFC = ({ 
  closeModal, 
  confirmModalCallback, 
  confirmModalCallbackProps, 
  content,
  call,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const onClickClose = () => {
    closeModal();
  }

  const onClickCallApi = async () => {
    setLoading(true);

    const result: boolean = await call(delay, 2000) as boolean;
    // const result: boolean = await delay(2000) as boolean;

    setSuccess(result);
  }

  const onClickConfirm = async () => {
    // console.log("onClickConfirm");
    // setLoading(true);

    // // const result: boolean = await call(delay, 2000) as boolean;
    // const result: boolean = await delay(2000) as boolean;

    // setSuccess(result);

    closeModal(confirmModalCallback);
  }
  
  return (
    <div className="w-[300px] h-[100px] bg-white shadow-sm shadow-slate-50">
      <div>
        {/* {content} 모달창창입니다. */}
        모달
        {
          isLoading && "로딩중입니다."
        }
        {
          isSuccess && "성공!"
        }
      </div>
      <div className="flex items-center justify-between h-full px-4">
        <button onClick={onClickClose}>Close</button>
        <button onClick={onClickCallApi}>Api</button>
        <button onClick={onClickConfirm}>Confirm</button>
      </div>
    </div>
  )
}

const Modal2: any = ({ content }: any) => {
  if (!content) {
    return <div className="w-[300px] h-[100px] bg-white shadow-sm shadow-slate-50">반갑습니다.</div>;
  }

  return <div className="w-[300px] h-[100px] bg-white shadow-sm shadow-slate-50">{content}</div>;
}

const modalComponentMetaList: ModalMeta[] = [
  {
    name: "modal1",
    component: Modal1,
    defaultOptions: {
      duration: 400,
      position: (breackPoint) => breackPoint > 500 ? "center" : "bottom",
      backCoverCallbackType: "none"
    }
  },
  {
    name: "success",
    component: Modal1
  },
  {
    name: "pendding",
    component: Modal1
  },
  {
    name: "normal",
    component: Modal2
  }
]

const ModalContainer = () => {
  return <ModalProvider modalComponentMeta={modalComponentMetaList} />;
}

export default ModalContainer;