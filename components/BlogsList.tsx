import { getSortedPostsData } from "@/lib/posts"
import Link from "next/link"

const data = getSortedPostsData()

export function BlogsList() {
    return <div className="not-prose">
        <ul className="">
            {data.map((post, index) => (
                <li key={index}
                    className="
             rounded-lg p-2
              hover:bg-base-200
              cursor-hover
              transition-colors
            "
                >
                    <Link href={`/blog/${post.id}`} className="">
                        <h1 className="text-3xl font-semibold">
                            {post.title}
                        </h1>

                        <p className="text-sm text-primary/70 mb-2">
                            {new Date(post.date).toLocaleDateString()}
                        </p>

                        <p>{post.excerpt}</p>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
    // return <div><ul>
    //     {data.map(post => (<div className="space-y-6">
    //             <h2 class="text-lg font-semibold mb-1">
    //   <a href="/blog/post-slug" class="hover:underline">Blog Post Title</a>
    // </h2>
    // <p class="text-sm text-base-content/60 mb-3">January 15, 2025</p>
    // <p class="text-base-content/80 leading-relaxed">
    //   This is the excerpt or preview of your blog post. You can show the first 150-200 characters here to give readers a sense of what the full post contains.
    // </p>

    //         {/* <li><Link className="link link-accent" href={`/blog/${post.id}`}> {post.title} </Link>
    //         {new Date(post.date).toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         })}</li> */}
    //    </div>
    //     ))} </ul>
    // </div>
}