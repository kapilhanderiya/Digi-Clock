import React, { useRef, useEffect, useState } from 'react';

const VerticalSlider = ({ items, selected }) => {
  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);
  const [translateY, setTranslateY] = useState(0);

  const centerSelected = (index) => {
    const wrapper = wrapperRef.current;
    const selectedItem = itemRefs.current[index];

    if (wrapper && selectedItem) {
      const wrapperHeight = wrapper.clientHeight;
      const itemOffsetTop = selectedItem.offsetTop;
      const itemHeight = selectedItem.offsetHeight;

      const centerOffset = wrapperHeight / 2 - itemOffsetTop - itemHeight / 2;
      setTranslateY(centerOffset);
    }
  };

  useEffect(() => {
    const index = items.indexOf(selected);
    if (index !== -1) {
      centerSelected(index);
    }
  }, [selected, items]);

  return (
    <div
      ref={wrapperRef}
      className="sm:w-11 overflow-y-visible scrollbar-hide w-6"
    >
      <div
        className="flex flex-col items-center transition-transform duration-500 bg-black/30 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_4px_4px_10px_rgba(0,0,0,0.6)] rounded-md backdrop-blur-lg ease-in-out"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {items.map((item, index) => (
          <div
            key={item}
            ref={(el) => (itemRefs.current[index] = el)}
            className="relative w-full flex justify-center"
          >
<div
  className={`
    sm:text-xl sm:w-10 sm:h-10 flex items-center justify-center rounded-full w-5 h-5 text-sm
    ${item === selected
      ? 'scale-125 opacity-100 bg-gradient-to-br from-white/30 to-white/5 text-white font-extrabold shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_4px_4px_10px_rgba(0,0,0,0.6)] backdrop-blur-lg transition-all duration-250 ease-in-out transform'
      : ' text-white'}
    sm:ml-[-5px]  ml-[-3px]
  `}
>
  {item}
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalSlider;
