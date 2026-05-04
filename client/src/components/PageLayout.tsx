interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
};

export default function PageLayout({ title, children }: PageLayoutProps) {
    return (
        <>
            <div className="text-hero font-bold italic ml-50 mt-10 mb-15 max-w-240 text-left line-height-100 leading-25">
                {title}
            </div>

            <div className="mx-10 ">
                {children}
            </div>
        </>
    );
}