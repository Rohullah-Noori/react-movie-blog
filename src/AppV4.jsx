import { use, useCallback, useRef } from "react";
import { useEffect, useState } from "react";
import StarApp from "./StarApp";
import { UseMovie } from "./UseMovie";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "b9525b22";
export default function App() {
  const [query, setQuery] = useState("");
  const { movies, errorme, isloading } = UseMovie(query);
  const [selectedid, setSelectedid] = useState("");
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleselectMovie(id) {
    setSelectedid((selectedid) => (id === selectedid ? null : id));
  }

  function handleClose() {
    setSelectedid(null);
  }

  function HandleWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function DeletMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <Numresult movies={movies} />
      </Navbar>

      <Main>
        {/* <Box
        // element={
        //   <MovieList movies={movies} onSelectedMovie={handleselectMovie} />
        // }
        /> */}

        {
          <Box>
            {/* {isloading ? <Loeader /> : <MovieList movies={movies} />} */}

            {isloading && <Loeader />}
            {!isloading && !errorme && (
              <MovieList movies={movies} onSelectedMovie={handleselectMovie} />
            )}
            {errorme && <ErrorMessage message={errorme} />}
          </Box>
        }

        <Box>
          {selectedid ? (
            <MovieDetails
              onClose={handleClose}
              selectedid={selectedid}
              onAddwachedMovie={HandleWatched}
              watched={watched}
            />
          ) : (
            <>
              <WachedSummary watched={watched} />
              <WachedMovieList watched={watched} onDeleteWached={DeletMovie} />
            </>
          )}
        </Box>

        {/* <Box
          element={
            <>
              <WachedSummary watched={watched} />
              <WachedMovieList watched={watched} />
            </>
          }
        /> */}
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputRef = useRef(null);

  useEffect(
    function () {
      function Callback(e) {
        if (document.activeElement === inputRef.current) return;
        if (e.code === "Enter") {
          inputRef.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", Callback);
      return () => document.addEventListener("keydown", Callback);
    },
    [setQuery]
  );
  //   function () {
  //     const el = document.querySelector(".search");
  //     console.log(el);
  //     el.focus();
  //   },
  //   [query]
  // );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
}

function Numresult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

/**
function WachedBox() {
  const [watched, setWatched] = useState(tempWatchedData);

  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WachedSummary watched={watched} />
          <WachedMovieList watched={watched} />
        </>
      )}
    </div>
  );
}

 */

function Loeader() {
  return <p>Loading....</p>;
}

function ErrorMessage({ message }) {
  return (
    <p>
      <span className="error">{message}</span>
    </p>
  );
}

function MovieList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          onSelectedMovie={onSelectedMovie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

// function MovieDetails({ selectedid, onClose, onAddwachedMovie }) {
//   const [movie, setMovie] = useState({});
//   const [isloading, setIsloading] = useState(false);
//   const [userRating, setUserRating] = useState("");

//   const {
//     Title: title,
//     Year: year,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     ReLeased: released,
//     Actors: actors,
//     Director: director,
//     Genre: genre,
//   } = movie;

//   function addHandle() {
//     const newWahedMovie = {
//       imdbID: selectedid,
//       title,
//       year,
//       poster,
//       imdbRating: Number(imdbRating),
//       runtime: Number(runtime.split("").at(0)),
//       userRating,
//     };
//     onAddwachedMovie(newWahedMovie);
//     onClose();
//   }

//   useEffect(
//     function () {
//       async function getmovie() {
//         setIsloading(true);
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedid}`
//         );
//         const data = await res.json();
//         setMovie(data);
//         setIsloading(false);
//       }
//       getmovie();
//     },
//     [selectedid]
//   );
//   return (
//     <div className="details">
//       {isloading ? (
//         <Loeader />
//       ) : (
//         <>
//           <header>
//             <button className="btn-back" onClick={onClose}>
//               &larr;
//             </button>
//             <img src={poster} alt={`poster of ${movie}`} />
//             <div className="details-overview">
//               <h2>{title}</h2>
//               <p>{released}</p>
//               <p>{genre}</p>
//               <p>
//                 <span>⭐</span>
//                 {imdbRating} imdbID Rating
//               </p>
//             </div>
//           </header>
//           <section>
//             <div className="rating">
//               <StarApp maxRating={10} size={24} onSetRating={setUserRating} />

//               <button className="btn-add" onClick={addHandle}>
//                 Add to list
//               </button>
//             </div>

//             <p>
//               <em>{plot}</em>
//             </p>
//             <p>Satarring{actors}</p>
//             <p>Directed by {director}</p>
//           </section>
//           {selectedid}
//         </>
//       )}
//     </div>
//   );
// }

function MovieDetails({ selectedid, onClose, onAddwachedMovie, watched }) {
  const [movie, setMovie] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [userRating, setUserRating] = useState(0); // Initialize to 0
  const [average, setAverage] = useState(0);
  const iswatched = watched.map((movie) => movie.imdbID).includes(selectedid);

  const countref = useRef(0);

  useEffect(
    function () {
      if (userRating) countref.current = countref.current + 1;
    },
    [userRating]
  );

  const israted = watched.find(
    (movie) => movie.imdbID === selectedid
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function addHandle() {
    const newWatchedMovie = {
      imdbID: selectedid,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]), // Assuming runtime is a string like "120 min"
      userRating,
      userRatingDescision: countref.current,
    };

    onAddwachedMovie(newWatchedMovie);
    // onClose();
    setAverage(Number(imdbRating));
    setAverage((prevoiuseRating) => (prevoiuseRating + userRating) / 2);
  }

  useEffect(() => {
    async function getmovie() {
      setIsloading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedid}`
      );
      const data = await res.json();
      setMovie(data);
      setIsloading(false);
    }
    getmovie();
  }, [selectedid]);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie  |  ${title}`;
      return function () {
        document.title = "usePopcorn";
        // console.log(`clean up happened for the ${title}`);
      };
    },
    [title]
  );

  useKey("Escape", onClose);
  // useEffect(
  //   function () {
  //     function calling(e) {
  //       if (e.code === "Escape") {
  //         onClose();
  //         // console.log("closeing");
  //       }
  //     }

  //     document.addEventListener("keydown", calling);
  //     return function () {
  //       document.removeEventListener("keydown", calling);
  //     };
  //   },
  //   [onClose]
  // );

  return (
    <div className="details">
      {isloading ? (
        <Loeader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released}</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <p>{average}</p>
          <section>
            <div className="rating">
              {!iswatched ? (
                <>
                  <StarApp
                    maxRating={10}
                    size={24}
                    onSetMovieRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={addHandle}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  you have rathed {israted} <span>🌟</span> to movie
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WachedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WachedMovieList({ watched, onDeleteWached }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWached={onDeleteWached}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWached }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWached(movie.imdbID)}
        >
          <span>x</span>
        </button>
      </div>
    </li>
  );
}
