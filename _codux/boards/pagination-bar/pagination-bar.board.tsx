import { createBoard } from '@wixc3/react-board';
import { PaginationBar } from '../../../src/components/pagination-bar/pagination-bar';

export default createBoard({
    name: 'PaginationBar',
    Board: () => <PaginationBar />,
});
