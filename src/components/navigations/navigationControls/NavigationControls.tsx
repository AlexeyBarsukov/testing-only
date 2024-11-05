import {NavigationButton} from "../NavigationButton";
import React from "react";


interface NavigationControlsProps {
    totalHistoricDates: number;
    currentEvent: number;
    loadPrev: () => void;
    formatEventIndex: (totalCount: number, currentIndex: number) => string
    loadNext: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps>  = ({ totalHistoricDates, currentEvent, loadPrev, loadNext, formatEventIndex }) => (
    <div className="historic-dates__navigation-controls navigation">
        <p className='navigation__total'>{formatEventIndex(totalHistoricDates, currentEvent)}</p>
        <div className='navigation__buttons control-buttons'>
            <NavigationButton
                className='control-buttons__prev'
                onClick={loadPrev}
                disabled={currentEvent === 0}
            />
            <NavigationButton
                className='control-buttons__next'
                onClick={loadNext}
                disabled={currentEvent === totalHistoricDates - 1}
            />
        </div>
    </div>
);

