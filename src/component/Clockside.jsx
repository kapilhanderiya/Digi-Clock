import React, { useState, useEffect, useRef } from 'react';
import VerticalSlider from './VerticalSlider';
import tickSound from '../assets/tick.mp3';

const Clockside = ({ format, sound }) => {
  const [timeDigits, setTimeDigits] = useState([0, 0, 0, 0, 0, 0]);
  const [ampm, setAmpm] = useState('');
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(tickSound);
    audioRef.current.volume = 1;
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let ampmValue = '';

      if (format === 12) {
        ampmValue = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
      }

      const formattedTime = [
        ...hours.toString().padStart(2, '0'),
        ...now.getMinutes().toString().padStart(2, '0'),
        ...now.getSeconds().toString().padStart(2, '0'),
      ].map(Number);

      setTimeDigits(formattedTime);
      setAmpm(ampmValue);

      if (sound && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    if (intervalRef.current) clearInterval(intervalRef.current);
    updateTime();
    intervalRef.current = setInterval(updateTime, 1000);

        return () => clearInterval(intervalRef.current);
  }, [format, sound]);

  return (
      <div>
        {format === 24 ? (
            <div className='sm:p-10 p-5 flex flex-row md:space-x-10 space-x-5 w-fit items-center'>
              <div className='sm:p-2.5 p-1.25 flex flex-row md:space-x-10 space-x-5'>
                <VerticalSlider items={[0,1,2]} selected={timeDigits[0]} />
                <VerticalSlider items={[0,1,2,3,4,5,6,7,8,9]} selected={timeDigits[1]} />
              </div>
              <Separator />
              <div className='sm:p-2.5 p-1.25 flex flex-row md:space-x-10 space-x-5'>
                <VerticalSlider items={[0,1,2,3,4,5]} selected={timeDigits[2]} />
                <VerticalSlider items={[0,1,2,3,4,5,6,7,8,9]} selected={timeDigits[3]} />
              </div>
              <Separator />
              <div className='sm:p-2.5 p-1.25 flex flex-row md:space-x-10 space-x-5'>
                <VerticalSlider items={[0,1,2,3,4,5]} selected={timeDigits[4]} />
                <VerticalSlider items={[0,1,2,3,4,5,6,7,8,9]} selected={timeDigits[5]} />
              </div>
            </div>
          ) : (
            <div className='sm:p-10 p-5 flex flex-row md:space-x-10 space-x-5 w-fit items-center'>
              <div className='sm:p-2.5 p-1.25 flex flex-row md:space-x-10 space-x-5'>
                <VerticalSlider items={[0,1]} selected={timeDigits[0]} />
                <VerticalSlider items={[0,1,2,3,4,5,6,7,8,9]} selected={timeDigits[1]} />
              </div>
              <Separator />
              <div className='sm:p-2.5 p-1.25 flex flex-row md:space-x-10 space-x-5'>
                <VerticalSlider items={[0,1,2,3,4,5]} selected={timeDigits[2]} />
                <VerticalSlider items={[0,1,2,3,4,5,6,7,8,9]} selected={timeDigits[3]} />
              </div>
              <Separator />
              <div className='sm:p-2.5 p-1.25 flex flex-row md:space-x-10 space-x-5'>
                <VerticalSlider items={[0,1,2,3,4,5,6]} selected={timeDigits[4]} />
                <VerticalSlider items={[0,1,2,3,4,5,6,7,8,9]} selected={timeDigits[5]} />
              </div>
              <div className='sm:p-2.5 p-1.25 flex flex-row md:space-x-10 space-x-5'>
                <VerticalSlider items={['AM', 'PM']} selected={ampm} />
              </div>
            </div>
          )}
      </div>
  );
};

const Separator = () => (
  <div className='flex flex-col items-center justify-center space-y-2'>
    <div className='w-2 h-2 rounded-full bg-[#ffffff] opacity-80 animate-pulse shadow-[2px_2px_6px_#00000070] '></div>
    <div className='w-2 h-2 rounded-full bg-[#ffffff] opacity-80 animate-pulse shadow-[2px_2px_6px_#00000070]'></div>
  </div>
);

export default Clockside;



