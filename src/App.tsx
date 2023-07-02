import React, { ReactNode, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal, defaultModalManager, openModal } from './modal-pre';
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

// const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
// const GeneratorFunctio = Object.getPrototypeOf(function*(){}).constructor;


// const normalFunction = function() {};
// const asyncFunction = async function() {};
// const generatorFunction = function*() {};

// console.log(normalFunction.constructor === Function); // true
// console.log(asyncFunction.constructor === AsyncFunction); // true
// console.log(generatorFunction.constructor === GeneratorFunctio); // true
// console.log(normalFunction.constructor, asyncFunction.constructor, generatorFunction, AsyncFunction, GeneratorFunctio);

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
} 

async function newApi() {
  const result: any = await delay(400);

  return result;
}

function aaa() {
  return newApi();
}

function* call(): Generator {
  let data = yield aaa();
  console.log("data1", data);
  data = yield aaa();
  console.log("data2", data);
  return data;
}



async function callback() {
  const generator = call();
  
  const data = await generator.next().value;

  console.log(data);
  generator.next("success");
  generator.next("fail");

  return data;
}

callback();

function* myGenerator(): Generator<number | undefined, void, number> {
  let input = yield;

  while (true) {
    if (input === undefined) {
      return input;
    }

      input = yield input * input;
  }
}

const generator = myGenerator();

console.log(generator.next(1)); // { value: undefined, done: false }
console.log(generator.next(2)); // { value: 4, done: false }
console.log(generator.next(3)); // { value: 9, done: false }

interface ComponentProps {
  children: ReactNode;
}

function Component({ children }: ComponentProps) {
  return (
    <div>
      {Array.isArray(children) ? (
        <div> {children[0]} <h1>{children[1]}</h1> </div>
      ) : children }
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Component>
          {
            [
              <div>dsadsd1</div>,
              <div>dsadsd2</div>,
            ]
          }
        </Component>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button 
          onClick={
            () => openModal("modal1", 
            { 
              callback: (confirm) => {
                if (confirm === true) {
                  openModal("modal2", { 
                    duration: 1000, 
                    position: "rightBottom-center-leftBottom" 
                  });
                } else if (confirm === false) {
                  openModal("modal2", { 
                    duration: 1000, 
                    position: "leftBottom-center-rightBottom" 
                  });
                }
              },
              duration: 0 
            })
          }
          >모달 열기</button>
        <button 
          onClick={() => {
            openModal(
              "modal2", { 
                content: "모달 2", 
                position: "rightCenterLeft", 
                duration: 300,
                callback: () => {
                  openModal("modal2", {
                    content: "모달 3", 
                    position: "left-center-right", 
                    duration: 1000,
                  });
                }
              }
            );
          }}
        >
          모달2 열기
        </button>
        <button onClick={() => openModal("modal2", { content: "모달 3", title: "모달창입니다.", subContent: "서브콘텐츠입니다.", transitionOptions: { transitionProperty: "opacity" } })}>모달3 열기</button>
        <button onClick={() => setIsOpen(true)}>모달2 열기</button>
        <button 
          onClick={() => openModal(
            (props) => (<div className="w-[300px] h-[100px] bg-white shadow-sm shadow-slate-50">안녕하세요 반갑습니다.</div>), {
              backCoverOpacity: 0.3,
              backCoverColor: "#f0f"
            }
          )}
        >모달3 열기</button>
        <button onClick={() => api()}>api 모달 실패 열기</button>
        <Modal name="modal2" open={isOpen} setOpen={setIsOpen} options={{ duration: 2000 }}>
          {
            ({ closeModal }) => (
              <div className="w-[300px] h-[100px] bg-white shadow-sm shadow-slate-50">
                <h1>타이틀입니다.</h1>
                <div>
                  ㄴㅁㅇㄴㅁㅇㄴㅁㅇ
                </div>
                {/* <p>ㅁㄴㅇㄴㅁㅇ</p> */}
                <div className="flex items-center justify-between h-full px-4">
                  <button className="h-2" onClick={() => setIsOpen(false)}>Close</button>
                  <button className="h-2" onClick={() => closeModal()}>Confirm</button>
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
      <div className='w-full h-[500px]'></div>
    </div>
  );
}

export default App;
