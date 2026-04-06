import { useLocation } from "react-router";
import { routes } from "../utils/routes";

export default function Content() {
    const location = useLocation();
    const route = routes.find((r) => r.path === location.pathname);

    return (
        <div className="absolute left-50 top-0 bottom-0 bg-blue-400 ">
            <div className="w-full h-full overflow-y-auto overscroll-contain pr-5 py-5 text-justify">
                {route?.element}
            </div>
        </div>
    );
}