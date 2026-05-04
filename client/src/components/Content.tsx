import { useLocation } from "react-router";
import { routes } from "../utils/routes";

export default function Content() {
    const location = useLocation();
    const route = routes.find((r) => r.path === location.pathname);

    return (
        <div className="absolute left-50 top-0 bottom-0 bg-blue-400 overflow-hidden min-w-430">
            <div className="w-full h-full overflow-y-auto overscroll-contain py-5 pr-5 transform-gpu will-change-transform"
                style={{ WebkitOverflowScrolling: "touch" }}>
                {route?.element}
            </div>
        </div>
    );
}