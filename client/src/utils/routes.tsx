import HomePage from '../pages/Home/HomePage';
import IiPage from '../pages/Ii/IiPage';
import KsiPage from '../pages/Ksi/KsiPage';
import SchedulePage from '../pages/Schedule/SchedulePage';
import MapPage from '../pages/Map/MapPage';

export const routes = [
    { path: "/", element: <HomePage />, icon: <span>Home</span> },
    { path: "/ii", element: <IiPage />, icon: <span>II</span> },
    { path: "/ksi", element: <KsiPage />, icon: <span>KSI</span> },
    { path: "/schedule", element: <SchedulePage />, icon: <span>Schedule</span> },
    { path: "/map", element: <MapPage />, icon: <span>Map</span> },
];

export default routes;