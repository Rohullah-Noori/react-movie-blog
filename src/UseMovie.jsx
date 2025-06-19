import { useState, useEffect } from "react";
const KEY = "b9525b22";
export function UseMovie(query) {
  const [movies, setMovies] = useState([]);

  const [isloading, setIsloading] = useState(false);

  const [errorme, setErrorme] = useState("");

  useEffect(
    function () {
      // Callback?.();
      const controller = new AbortController();

      async function fechmovie() {
        try {
          setErrorme("");
          setIsloading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("some thing went wrong");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found ");

          setMovies(data.Search || []);
          setErrorme("");
        } catch (err) {
          if (err !== "AbortError") {
            setErrorme(err.message);
          }
        } finally {
          setIsloading(false);
        }
        if (query.length < 3 && !query.length) {
          setMovies([]);
          setErrorme("");
          return;
        }
      }
      //   handleClose();
      fechmovie();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isloading, errorme };
}
