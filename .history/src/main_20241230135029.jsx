import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
// import Currency from "./Currency.jsx";
import AppV4 from "./AppV4.jsx";
// import AppCopy from "./AppCopy.jsx";
import "./index.css";
import Challenge from "./Challenge.jsx";
// import AppV3 from "./AppV3.jsx";
// import StarApp from "./StarApp.jsx";
// import Expander from "./Expander.jsx";
// import "./expan.css";

// function MovieRate() {
//   const [MovieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarApp onSetMovieRating={setMovieRating} />
//       <p>you have {MovieRating} rated to this movie</p>
//     </div>
//   );
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* {<AppCopy />} */}
    {/* <AppV3 /> */}
    {/* {<AppV4 />} */}
    {<Challenge />}
    {/* {
      <StarApp
        maxRating={10}
        messages={["terrible", "notBad", "good", "excellent", "Amazing"]}
        color="red"
        className="test"
        defaultRating={3}
      />
    }
    {<MovieRate />} */}

    {/* <Expander /> */}

    {/* {<Currency />} */}
  </StrictMode>
);
