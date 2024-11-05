import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../pages/MainPage.scss';
import React, { RefObject } from "react";

interface Episode {
    date: string;
    description: string;
}

interface HistoricDate {
    title: string;
    episodes: Episode[];
}

interface HistoricDatesSliderProps {
    historicDates: HistoricDate[];
    currentEvent: number;
    navigateToEvent: (index: number) => void;
    totalHistoricDates: number;
    angle: number;
    timeOfRotation: number;
    eventsCircleRef: RefObject<HTMLDivElement>;
}

export const HistoricDatesSpinner: React.FC<HistoricDatesSliderProps> = (
    {
        historicDates,
        currentEvent,
        navigateToEvent,
        totalHistoricDates,
        angle,
        timeOfRotation,
        eventsCircleRef,
    }) => (
    <div className="historic-dates__event-spinner spinner">
        <div
            ref={eventsCircleRef}
            className='spinner__main-circle'
            style={{
                "--count": totalHistoricDates,
                "--angle": angle + "deg",
                "--time": timeOfRotation + "ms",
                "--delay": timeOfRotation + 300 + "ms",
            } as React.CSSProperties}
        >
            {
                historicDates.map((item, index) => {
                    const { title } = item;
                    const idx = index + 1;
                    return (
                        <div
                            key={index}
                            className={"spinner__shoulder " + (currentEvent === index ? 'spinner__shoulder_active' : '')}
                            style={{ "--i": idx } as React.CSSProperties}
                            onClick={() => navigateToEvent(index)}
                        >
                            <div className='spinner__circle-area'>
                                <p className='spinner__circle'>{idx}
                                    <span className='spinner__title'>{title}</span>
                                </p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    </div>
);
