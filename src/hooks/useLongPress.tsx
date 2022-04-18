import { RefObject, useEffect } from "react";

/**
 * callback on long mobile press
 * Usage:
 *    onLongPress(element, () => {
 *        console.log('Long pressed', element);
 *   });
 */

interface Props {
    element: RefObject<HTMLElement>;
    callback: () => void;
}

export default function useLongPress({ element, callback }: Props) {
    useEffect(() => {
        if (!element.current) return;

        const el = element.current;

        let timer: ReturnType<typeof setTimeout> | any;

        el.addEventListener("touchstart", () => {
            timer = setTimeout(() => {
                timer = null;
                callback();
            }, 500); // hold for longer than 500ms
        });

        function cancel() {
            clearTimeout(timer);
        }

        el.addEventListener("touchend", cancel);
        el.addEventListener("touchmove", cancel);
    }, [callback, element]);
}

/* 
function onLongPress(element, callback) {
  let timer;

  element.addEventListener('touchstart', () => { 
    timer = setTimeout(() => {
      timer = null;
      callback();
    }, 500);
  });

  function cancel() {
    clearTimeout(timer);
  }

  element.addEventListener('touchend', cancel);
  element.addEventListener('touchmove', cancel);
}
*/
