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
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const date = currentDate.toLocaleDateString('pl-PL', {
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    return (
        <div className="text-left">
            <div className="text-7xl font-semibold">
                {hours}<span className='font-semibold opacity-70'>:</span>{minutes}
                <span className="text-3xl ml-1 relative -top-7 font-thin opacity-70">
                    {seconds}
                </span>
            </div>

            <div className="text-3xl mt-1 font-medium opacity-70">
                {date}
            </div>
        </div>
    );
}

export default DateComponent;