import ModalManager from "./services/modalManager";

describe("ModalManager class", () => {
  let modalManager: ModalManager;
  const mockComponent = jest.fn();

  beforeEach(() => {
    modalManager = new ModalManager();
    modalManager.setModalComponent({
      name: "mockType",
      component: mockComponent,
    });
  });

  test("open should push new modal fiber", () => {
    const mockOptions = { duration: 300 };

    modalManager.open("mockType", mockOptions);

    const modalFiberList = modalManager.getModalFiberStack();

    expect(modalFiberList.length).toBe(1);
    expect(modalFiberList[0].name).toBe("mockType");
    expect(modalFiberList[0].component).toBe(mockComponent);
    expect(modalFiberList[0].options.duration).toBe(mockOptions.duration);
  });

  test("close should pop modal fiber", () => {
    const mockOptions = { duration: 300 };

    modalManager.open("mockType", mockOptions);
    modalManager.remove();

    expect(modalManager.getModalFiberStack().length).toBe(0);
  });

  test("async", () => {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;


    const normalFunction = function() {};
    const asyncFunction = async function() {};
    const generatorFunction = function*() {};

    console.log(normalFunction.constructor === Function); // true
    console.log(asyncFunction.constructor === AsyncFunction); // true
    console.log(generatorFunction.constructor === GeneratorFunction); // true
    console.log(normalFunction,)

    expect(normalFunction.constructor === Function).toEqual(true); // true
    expect(asyncFunction.constructor === AsyncFunction).toEqual(true); // true
    expect(generatorFunction.constructor === GeneratorFunction).toEqual(true); // true
  });
});
