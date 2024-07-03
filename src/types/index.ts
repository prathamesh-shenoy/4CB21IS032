import express from 'express';
import { fetchNumbers, updateNumbers, calculateAverage, getNumbers } from '../services/numberService';

const app = express();
const PORT = process.env.PORT || 9876;

app.get('/numbers/:numberId', async (req, res) => {
    const { numberId } = req.params;
    const validIds = new Set(['p', 'f', 'e', 'r']);

    if (!validIds.has(numberId)) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const newNumbers = await fetchNumbers(numberId);
    const windowPrevState = [...getNumbers()];

    updateNumbers(newNumbers);
    const windowCurrState = [...getNumbers()];
    const avg = calculateAverage();

    res.json({
        windowPrevState,
        windowCurrState,
        numbers: newNumbers,
        avg: parseFloat(avg.toFixed(2))
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
