import { useState, useEffect } from 'react';

function DateComponent() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const date = currentDate.toLocaleDateString('pl-PL', {
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    return (
        <div className="flex flex-col text-right min-w-50">
            <div className="text-7xl font-semibold">
                {hours}<span className='font-light opacity-70'>:</span>{minutes}
            </div>
            <div className="text-3xl font-medium opacity-70">
                {date}
            </div>
        </div>
    );
}

export default DateComponent;