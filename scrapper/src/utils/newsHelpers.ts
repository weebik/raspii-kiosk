export function cleanText(input: string): string {
    return input
        .replace(/\u00a0/g, ' ')
        .replace(/[ \t]+/g, ' ')
        .trim();
}

export function extractId(raw?: string): number | null {
    if (!raw) return null;
    const match = raw.match(/od-news-(\d+)/);
    return match ? Number(match[1]) : null;
}

export function htmlToText(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/\u00a0/g, " ")
        .trim();
}

export function toTitleCase(text: string): string {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => {
            if (!word) return '';
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

export function formatMarkdown(text: string): string {
    return text
        .replace(/\[\d+\]:\s*https?:\/\/\S+/g, "")
        .replace(/\[([^\]]+)\]\[\d+\]/g, "$1")
        .replace(/\[([^\]]+)\]\((.*?)\)/g, "$1")
        .trim();
}