import React, { useState, useEffect } from "react";
import Clockside from "./component/Clockside";

const App = () => {
    const [timeFormat, setTimeFormat] = useState(24);
    const [sound, setSound] = useState(false);
  return (
    <div className="bg-[radial-gradient(circle_at_top_left,_#f0f0f0,_#808080)] min-h-screen flex flex-row justify-center items-center overflow-hidden">
        <button
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-black/30 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_4px_4px_10px_rgba(0,0,0,0.6)] rounded-md backdrop-blur-lg text-white font-semibold hover:scale-105 transition-transform duration-200 ease-in-out"
        onClick={() => {
          if(timeFormat == 24) setTimeFormat(12);
          else setTimeFormat(24);
        }}
      >
        {timeFormat === 24 ? (
          <span>12 hr</span>
        ):(
          <span>24 hr</span>
        )}
      </button>
      <button
        className="fixed top-4 right-25 z-50 px-4 py-2 bg-black/30 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_4px_4px_10px_rgba(0,0,0,0.6)] rounded-md backdrop-blur-lg text-white font-semibold hover:scale-105 transition-transform duration-200 ease-in-out"
        onClick={() => {
          if(sound === true) setSound(false);
          else setSound(true);
          console.log(sound);
        }}
      >
        {sound === true ? (
          <span>🔇</span>
        ):(
          <span>🔊</span>
        )}
      </button>
      <Clockside format={timeFormat} sound={sound}/>
    </div>
  );
};

export default App;