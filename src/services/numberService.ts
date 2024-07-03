import axios from 'axios';

const THIRD_PARTY_API_URL = "http://localhost:9876/numbers/e"; // Replace with the actual URL
const WINDOW_SIZE = 10;
let numbers: number[] = [];


export const fetchNumbers = async (numberId: string): Promise<number[]> => {
    try {
        const response = await axios.get(`${THIRD_PARTY_API_URL}/${numberId}`, { timeout: 500 });
        console.log('Fetched numbers:', response.data.numbers); // Add this line to log the fetched numbers
        return response.data.numbers || [];
    } catch (error) {
        console.error('Error fetching numbers:', error); // Add this line to log any errors
        return [];
    }
};


export const updateNumbers = (newNumbers: number[]): void => {
    newNumbers.forEach(num => {
        if (!numbers.includes(num)) {
            if (numbers.length >= WINDOW_SIZE) {
                numbers.shift();
            }
            numbers.push(num);
        }
    });
};


export const calculateAverage = (): number => {
    if (numbers.length === 0) return 0;
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};


export const getNumbers = (): number[] => {
    return numbers;
};
