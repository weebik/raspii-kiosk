import Markdown from "react-markdown";
import type { NewsItem } from "../../../types/newsItem.type";

export default function NewsTile({ news }: { news: NewsItem; }) {
    return (
        <div className="relative w-full transform-gpu bg-white rounded-4xl p-10 mb-10 shadow-lg">
            <div className="relative z-10 flex flex-col justify-between">
                <div>
                    <h2 className="text-5xl font-bold mb-10">
                        {news.title}
                    </h2>

                    <span className="text-2xl opacity-80 whitespace-pre-line">
                        <Markdown>
                            {news.content}
                        </Markdown>
                    </span>

                    <div className="flex flex-row justify-between mt-10">
                        <p className="text-2xl opacity-60">
                            {news.author}
                        </p>
                        <p className="text-2xl opacity-60">
                            {news.date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}