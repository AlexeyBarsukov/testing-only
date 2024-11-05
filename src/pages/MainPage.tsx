import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './MainPage.scss';
import gsap from "gsap";
import { historicDates } from "../mock/historic-mock";
import { AnimationDurations } from "../constans/constants";
import { DateRange } from "../components/dateRange/DateRange";
import { HistoricDatesSpinner } from "../components/historicDatesSpinner/HistoricDatesSlider";
import { NavigationControls } from "../components/navigations/navigationControls/NavigationControls";
import { HistoricDatesSlider } from "../components/historicDatesSliders/HistoricDatesSliders";
import { EventControlButtons } from "../components/eventControlButtons/EventControlButtons";

function MainPage() {
    const [startEventDate, setStartDate] = useState<number>(Number(historicDates[0].episodes[0].date));
    const [endEventDate, setEndEventDate] = useState<number>(Number(historicDates[0].episodes[historicDates.length - 1].date));

    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const eventsCircleRef = useRef<HTMLDivElement>(null);
    const startDateRef = useRef<HTMLDivElement>(null);
    const endDateRef = useRef<HTMLDivElement>(null);

    const totalHistoricDates = historicDates.length;
    const angleSpacingBetweenDates = 360 / totalHistoricDates;
    const initialRotationTime = 300;

    const [angle, setAngle] = useState<number>(angleSpacingBetweenDates);
    const [currentEvent, setCurrentEvent] = useState<number>(0);
    const [timeOfRotation, setTimeOfRotation] = useState<number>(initialRotationTime);



    useEffect(() => {
        const timer = setTimeout(() => {
            sliderContainerRef.current?.classList.add("slider_show");
            clearTimeout(timer);
        }, AnimationDurations.FADE_DURATION);
        return () => clearTimeout(timer);
    }, [currentEvent]);

    function fadeOutAndExecute(callback: Function):void {
        sliderContainerRef.current?.classList.remove("slider_show");
        if (typeof callback === 'function') {
            setTimeout(callback, AnimationDurations.DEFAULT_ROTATION_TIME);
        }
    }

    function formatEventIndex(totalCount: number, currentIndex: number): string {
        const formattedIndex = String(currentIndex + 1).padStart(2, '0');
        const formattedTotal = String(totalCount).padStart(2, '0');
        return `${formattedIndex}/${formattedTotal}`;
    }

    function loadPrev():void {
        if (currentEvent > 0) {
            navigateToEvent(currentEvent - 1);
        }
    }

    function loadNext():void {
        const totalEvents = historicDates.length;
        if (currentEvent < totalEvents - 1) {
            navigateToEvent(currentEvent + 1);
        }
    }


    function updateDateRangeAnimation(index: number): void {
        if (index < 0 || index >= historicDates.length) {
            console.warn("Index out of bounds for historicDates");
            return;
        }

        const { episodes } = historicDates[index];
        const newStartDate = Number(episodes[0].date);
        const newEndDate = Number(episodes[episodes.length - 1].date);

        const startDateDelta = newStartDate - startEventDate;
        const endDateDelta = newEndDate - endEventDate;
        const animationDuration = (timeOfRotation + AnimationDurations.ANIMATION_DELAY) / 1000;

        animateDateChange(startDateRef.current, startDateDelta, setStartDate, newStartDate, animationDuration);
        animateDateChange(endDateRef.current, endDateDelta, setEndEventDate, newEndDate, animationDuration);
    }

    function animateDateChange(ref: HTMLDivElement | null, delta: number, setDate: React.Dispatch<React.SetStateAction<number>>, newDate: number, duration: number) {
        if (ref) {
            gsap.to(ref, {
                duration: duration,
                textContent: `+=${delta}`,
                roundProps: "textContent",
                ease: "none",
                onUpdate: () => setDate(newDate),
            });
        }
    }

    function navigateToEvent(index: number): void {
        updateDateRangeAnimation(index);
        highlightActiveEvent(index);
        const targetAngle = calculateTargetAngle(index);

        setRotationDuration(index);
        animateAngleChange(targetAngle);

        fadeOutAndExecute(() => setCurrentEvent(index));
    }

    function highlightActiveEvent(index: number): void {
        eventsCircleRef.current?.children[index].classList.add("spinner__shoulder_active");
    }

    function calculateTargetAngle(index: number): number {
        return angleSpacingBetweenDates - index * angleSpacingBetweenDates;
    }

    function setRotationDuration(index: number): void {
        const duration = Math.abs(currentEvent - index) * initialRotationTime;
        setTimeOfRotation(duration);
    }

    function animateAngleChange(targetAngle: number): void {
        const update = () => {
            setAngle(targetAngle);
        };
        requestAnimationFrame(update);
    }



    return (
        <main className='main'>
            <section className='historic-dates'>
                <h1 className='historic-dates__title'>Исторические даты</h1>
                <DateRange
                    startEventDate={startEventDate}
                    endEventDate={endEventDate}
                    startDateRef={startDateRef}
                    endDateRef={endDateRef}
                />
                <HistoricDatesSpinner
                    historicDates={historicDates}
                    currentEvent={currentEvent}
                    navigateToEvent={navigateToEvent}
                    totalHistoricDates={totalHistoricDates}
                    angle={angle}
                    timeOfRotation={timeOfRotation}
                    eventsCircleRef={eventsCircleRef}
                />
                <NavigationControls
                    totalHistoricDates={totalHistoricDates}
                    currentEvent={currentEvent}
                    formatEventIndex={formatEventIndex}
                    loadPrev={loadPrev}
                    loadNext={loadNext}
                />
                <HistoricDatesSlider
                    historicDates={historicDates}
                    currentEvent={currentEvent}
                    sliderContainerRef={sliderContainerRef}
                />
                <EventControlButtons
                    historicDates={historicDates}
                    currentEvent={currentEvent}
                    navigateToEvent={navigateToEvent}
                />
            </section>
        </main>
    );
}

export default MainPage;