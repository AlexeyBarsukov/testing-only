import React from 'react';

interface DateRangeProps {
    startEventDate: number;
    endEventDate: number;
    startDateRef: React.RefObject<HTMLParagraphElement>;
    endDateRef: React.RefObject<HTMLParagraphElement>;
}

export const DateRange: React.FC<DateRangeProps>  = (
    {
        startEventDate,
        endEventDate,
        startDateRef,
        endDateRef
    }) => (
    <div className="historic-dates__date-range range">
        <p className='range_start' ref={startDateRef}>{startEventDate}</p>
        <p className='range_end' ref={endDateRef}>{endEventDate}</p>
    </div>
);
