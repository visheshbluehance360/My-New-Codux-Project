import styles from './quote.module.scss';
import cx from 'classnames';

export interface QuoteProps {
    className?: string;
    quote?: Quote;
}

export interface Quote {
    quote?: string;
    author?: string;
    id?: number;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const QuoteItem = ({ className, quote }: QuoteProps) => {
    return <div className={cx(styles.root, className, styles.Quote, ((quote?.id || 0) % 2 == 0 ? styles.even : ""))}>
        <div className={styles.QuoteText}>{quote?.quote && quote.quote}</div>
        <div className={styles.QuoteAuthor}>{quote?.author && quote.author}</div>
    </div>;
};
