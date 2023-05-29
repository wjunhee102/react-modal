import { modal } from "./modal";

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, time);
  })
} 

export async function api() {
  const result: any = await delay(5000);

  if (!result) {
    modal("normal", { content: "api error", position: "top"})
  }
}