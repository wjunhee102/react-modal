import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal, defaultModalManager, modal } from './modal';
import { api } from './api';

defaultModalManager.setModalComponent({
  name: "modal5",
  component: (props) => {
    return (
      <div>
        안녕하세여
      </div>
    )
  }
});

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  useEffect(() => {
    setIsOpen2(true);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => modal("modal1", { confirmModalCallback: () => {
          modal("modal2", { duration: 1000, position: "right" });
        }, duration: 1000 })}>모달 열기</button>
        <button 
          onClick={() => {
            modal(
              "modal2", { 
                content: "모달 2", 
                position: "rightCenterLeft", 
                duration: 500,
                confirmModalCallback: () => {
                  modal("modal2", {
                    content: "모달 3", 
                    position: "topCenterBottom", 
                    duration: 500,
                  });
                }
              }
            );
          }}
        >
          모달2 열기
        </button>
        <button onClick={() => modal("modal2", { content: "모달 3", title: "모달창입니다.", subContent: "서브콘텐츠입니다.", transitionOptions: { transitionProperty: "opacity" } })}>모달3 열기</button>
        <button onClick={() => setIsOpen(true)}>모달2 열기</button>
        <button 
          onClick={() => modal(
            (props) => (<div className="w-[300px] h-[100px] bg-white shadow-sm shadow-slate-50">안녕하세요 반갑습니다.</div>), {
              duration: 5000, 
              backCoverOpacity: 0.3,
              backCoverColor: "#f0f"
            }
          )}
        >모달3 열기</button>
        <button onClick={() => api()}>api 모달 실패 열기</button>
        <Modal name="modal2" open={isOpen} setOpen={setIsOpen} options={{ duration: 2000 }}>
          {
            ({ closeModal, confirmModalCallback }) => (
              <div className="w-[300px] h-[100px] bg-white shadow-sm shadow-slate-50">
                <h1>타이틀입니다.</h1>
                <div>
                  ㄴㅁㅇㄴㅁㅇㄴㅁㅇ
                </div>
                {/* <p>ㅁㄴㅇㄴㅁㅇ</p> */}
                <div className="flex items-center justify-between h-full px-4">
                  <button className="h-2" onClick={() => setIsOpen(false)}>Close</button>
                  <button className="h-2" onClick={() => closeModal(confirmModalCallback)}>Confirm</button>
                </div>
              </div>
            )
          }
        </Modal>
        <Modal open={isOpen2} setOpen={setIsOpen2} options={{ 
          duration: 5000
        }}>
          {
            ({ closeModal }) => {
              return (
                <div className="bg-white">
                  안녕하세요
                  {/* <button onClick={() => {closeModal()}}>닫기</button> */}
                </div>
              )
            }
          }
        </Modal>
      </header>
    </div>
  );
}

export default App;
