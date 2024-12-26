import { createBoard } from '@wixc3/react-board';
import { QuoteItem } from '../../../src/components/quote/quote';

export default createBoard({
    name: 'Quote',
    Board: () => <QuoteItem />,
});
