import * as cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';



export async function ArticlePreview() {
    try {
        const response = await fetch('https://samkriss.substack.com/p/the-crab');
        const html = await response.text();

        const $ = cheerio.load(html);

        const dirty = $('article').html();
        // const clean = sanitizeHtml(dirty, {
        //     allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'a'],
        //     allowedAttributes: { 'a': ['href'] }
        // });
        // <div dangerouslySetInnerHTML={{ __html: clean }} />

        const title = $('meta[property="og:title"]').attr('content');
        const description = $('meta[property="og:description"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');

        return (
            <div className="border p-4 rounded">
                {image && <img src={image} alt={title} className="w-full rounded mb-4" />}
                <h2>{title}</h2>
                <p>{description}</p>
                <a href="https://yourname.substack.com/p/article-slug" className="btn">
                    Read full article →
                </a>
            </div>
        );
    } catch (error) {
        return <div>Error loading article</div>;
    }
}