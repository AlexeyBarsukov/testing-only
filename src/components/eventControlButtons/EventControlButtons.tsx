import React from "react";

interface EventControlButtonsProps {
    historicDates: { title: string }[];
    currentEvent: number;
    navigateToEvent: (index: number) => void;
}

export const EventControlButtons: React.FC<EventControlButtonsProps>  = ({ historicDates, currentEvent, navigateToEvent }) => (
    <div className='events__control-buttons'>
        {historicDates.map((item, index) => (
            <button
                className={`events__button ${currentEvent === index ? 'events__button_active' : ''}`}
                key={index}
                onClick={() => navigateToEvent(index)}
            ></button>
        ))}
    </div>
);
