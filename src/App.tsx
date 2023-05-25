import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ModalRegistrator, modalController } from './modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

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
        <button onClick={() => modalController.open("modal1", { content: "모달 1"})}>모달 열기</button>
        <button onClick={() => modalController.open("modal2", { content: "모달 2", position: "bottom" })}>모달2 열기</button>
        <button onClick={() => setIsOpen(true)}>모달2 열기</button>
        <ModalRegistrator name="modal2" open={isOpen} setOpen={(setIsOpen)}>
          {
            ({ closeModal, confirmModalCallback, confirmModalCallbackProps, content }) => (
              <div className="w-[300px] h-[100px] bg-white shadow-sm shadow-slate-50">
                <div>
                  {content}
                </div>
                <div className="flex justify-between items-center h-full px-4">
                  <button onClick={() => closeModal()}>Close</button>
                  <button onClick={() => closeModal(confirmModalCallback, confirmModalCallbackProps)}>Confirm</button>
                </div>
              </div>
            )
          }
          
        </ModalRegistrator>
      </header>
    </div>
  );
}

export default App;
