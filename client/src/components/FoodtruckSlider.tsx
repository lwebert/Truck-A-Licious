// FoodTruckSlider.jsx
import React, { useState } from 'react';

interface DayData {
  day: string;
  foodTrucks: string[];
}

interface FoodTruckSliderProps {
  weekData: DayData[];
}

const FoodTruckSlider: React.FC<FoodTruckSliderProps> = ({ weekData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideNext = () => {
    if (currentIndex < weekData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const slidePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slider">
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {weekData.map((dayData, index) => (
          <div key={index} className="card">
            <h2>{dayData.day}</h2>
            <ul>
              {dayData.foodTrucks.map((truck, i) => (
                <li key={i}>{truck}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className="slider-btn prev-btn" onClick={slidePrev}>
        &lt;
      </button>
      <button className="slider-btn next-btn" onClick={slideNext}>
        &gt;
      </button>
    </div>
  );
};

export default FoodTruckSlider;