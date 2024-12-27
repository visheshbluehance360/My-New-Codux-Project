import styles from './_index.module.scss';
import { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getUrlOriginWithPath } from '~/utils';

import { useState, useEffect } from 'react';
import { QuoteItem } from '../../../src/components/quote/quote';
import { PaginationBar } from '../../../src/components/pagination-bar/pagination-bar';

export const loader = ({ request }: LoaderFunctionArgs) => {
    return { canonicalUrl: getUrlOriginWithPath(request.url) };
};

export default function HomePage() {
    const [quotes, setQuotes] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const PageSize = 3;

    useEffect(() => {
        fetch(
            `https://dummyjson.com/quotes?limit=${PageSize}&skip=${
                currentPage * PageSize - PageSize
            }`
        )
            .then((res) => res.json())
            .then((json) => {
                console.log(json);

                setQuotes(json.quotes);

                const numberOfPages = Math.ceil(json.total / json.limit);

                setPageCount(numberOfPages);
            });
    }, [setQuotes, currentPage]);

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <h2 className={styles.title}>Welcome to Homepage 🎉</h2>
                <span>The project will be using JSONPlaceholder API</span>
            </header>
            <div className={styles.content}>
                {quotes.map((quote, index) => (
                    <QuoteItem key={index} quote={quote} />
                ))}

                <PaginationBar
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const title = 'Blank Starter';
    const description = 'Welcome to the Blank Starter';
    const imageUrl = 'https://website-starter.com/og-image.png';

    return [
        { title },
        {
            name: 'description',
            content: description,
        },
        {
            tagName: 'link',
            rel: 'canonical',
            href: data?.canonicalUrl,
        },
        {
            property: 'robots',
            content: 'index, follow',
        },
        {
            property: 'og:title',
            content: title,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            property: 'og:image',
            content: imageUrl,
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:description',
            content: description,
        },
        {
            name: 'twitter:image',
            content: imageUrl,
        },
    ];
};

export const links: LinksFunction = () => {
    return [
        {
            rel: 'icon',
            href: '/favicon.ico',
            type: 'image/ico',
        },
    ];
};
