import Markdown from "react-markdown";
import type { NewsItem } from "../../../types/newsItem.type";

export default function NewsTile({ news }: { news: NewsItem; }) {
    return (
        <div className="mb-5">
            <svg className="w-full h-full" viewBox="0 0 1620 69" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1184.13 0C1194.9 9.53784e-05 1205.07 4.96236 1211.71 13.4521L1212.11 13.9668C1221.02 25.3746 1233.9 31.8594 1247.27 33H1585C1604.33 33 1620 48.67 1620 68V69.9004C1620 69.9553 1619.96 69.9998 1619.9 70H0.0996094C0.0446901 69.9998 0.000209038 69.9553 0 69.9004V68C1.26343e-08 48.67 15.67 33 35 33H482.74C501.488 32.9997 516.629 15.0793 532.55 5.17969C537.831 1.89615 544.064 0 550.74 0H1184.13Z" fill="white" />
            </svg>
            <div className="bg-white px-8">
                <div className="bg-gray-400/40 p-5 rounded-3xl mb-8">
                    <h2 className="text-4xl font-bold px-5">
                        {news.title}
                    </h2>
                </div>
                <div className="text-2xl opacity-80 whitespace-pre-line mx-10 pb-10">
                    <Markdown>{news.content}</Markdown>
                </div>
            </div>
            <div className="relative w-full h-17">
                <svg className="absolute inset-0" viewBox="0 0 1620 50" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1620 0V15C1620 34.33 1604.33 50 1585 50H1247.27C1233.9 48.8594 1221.02 42.3746 1212.11 30.9668L1211.71 30.4521C1205.07 21.9624 1194.9 17.0001 1184.13 17H550.74C544.064 17 537.831 18.8961 532.55 22.1797C516.629 32.0793 501.488 49.9997 482.74 50H35C15.67 50 0 34.33 0 15V0H1620Z" fill="white" />
                </svg>
                <div className="absolute inset-0 flex top-2">
                    <p className="absolute font-semibold text-2xl opacity-70 left-11">
                        {news.date}
                    </p>
                    <p className="absolute font-semibold italic text-2xl opacity-70 right-12">
                        {news.author}
                    </p>
                </div>
            </div>
        </div>
    );
}