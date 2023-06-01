import { useState } from "react";
import { ModalCancelButton, ModalConfirmButton, ModalFC, ModalMeta, ModalProvider } from "../modal";

function delay(time: number) {
  console.log("delay");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  })
} 

const Modal1: ModalFC = ({ 
  call,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const onClickCallApi = async () => {
    setLoading(true);

    const result: boolean = await call(delay, 2000) as boolean;
    // const result: boolean = await delay(2000) as boolean;

    setSuccess(result);
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
        <ModalCancelButton>Close</ModalCancelButton>
        <button onClick={onClickCallApi}>Api</button>
        <ModalConfirmButton>
          Confirm
        </ModalConfirmButton>
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
  return <ModalProvider modalMeta={modalComponentMetaList} />;
}

export default ModalContainer;