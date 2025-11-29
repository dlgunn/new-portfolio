import { parseStringPromise } from 'xml2js';
export async function SubstackFeed() {
    try {
        const response = await fetch('https://samkriss.substack.com/feed');
        const feed = await response.text();

        const parsed = await parseStringPromise(feed);
        const articles = parsed.rss.channel[0].item;

        return (
            <div>
                <h2>Latest Articles</h2>
                {articles.map((article: any, index: number) => (
                    <div key={index}>
                        <h3>{article.title[0]}</h3>
                        <p>{article.description[0]}</p>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return <div>Error loading feed: {errorMessage}</div>;
    }
}