import styles from './pagination-bar.module.scss';
import cx from 'classnames';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationBarProps {
    className?: string;
    pageCount: number;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const PaginationBar = ({
    className,
    pageCount = 1,
    currentPage = 1,
    setCurrentPage,
}: PaginationBarProps) => {
    function goToPrev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function goToNext() {
        if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className={cx(styles.root, className)}>
            <div className="left">
                <button onClick={goToPrev} disabled={!(currentPage > 1)}>
                    <ChevronLeft className={cx('prevButton h-4 w-4')} />
                </button>
            </div>

            <div className="center">
                <div className="currentAndTotalPages">
                    <input
                        className={cx(styles.pageNumberInput)}
                        type="number"
                        max={pageCount}
                        value={currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                    />{' '}
                    / {pageCount}
                </div>
            </div>

            <div className="right">
                <button onClick={goToNext} disabled={!(currentPage < pageCount)}>
                    <ChevronRight
                        className={cx('nextButton h-4 w-4')}
                    />
                </button>
            </div>
        </div>
    );
};
