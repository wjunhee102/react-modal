import { openModal } from "./modal-pre";

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  })
} 

export async function api() {
  const result: any = await delay(5000);

  if (!result) {
    openModal(() => {
      return (
        <div>
          sadsadsadd
        </div>
      )
    }, { content: "api error", position: "top"})
  }

  return true;
}