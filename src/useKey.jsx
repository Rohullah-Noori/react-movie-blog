import { useEffect } from "react";
export function useKey(key, action) {
  useEffect(
    function () {
      function calling(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
          // console.log("closeing");
        }
      }

      document.addEventListener("keydown", calling);
      return function () {
        document.removeEventListener("keydown", calling);
      };
    },
    [action, key]
  );
}
