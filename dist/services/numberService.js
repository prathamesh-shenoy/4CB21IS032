"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumbers = exports.calculateAverage = exports.updateNumbers = exports.fetchNumbers = void 0;
const axios_1 = __importDefault(require("axios"));
const THIRD_PARTY_API_URL = "http://localhost:9876/numbers/e"; // Replace with the actual URL
const WINDOW_SIZE = 10;
let numbers = [];
/**
 * Fetch numbers from a third-party API.
 * @param numberId The ID to fetch numbers for.
 * @returns An array of numbers or an empty array in case of error.
 */
const fetchNumbers = (numberId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${THIRD_PARTY_API_URL}/${numberId}`, { timeout: 500 });
        return response.data.numbers || [];
    }
    catch (error) {
        return [];
    }
});
exports.fetchNumbers = fetchNumbers;
/**
 * Update the stored numbers ensuring uniqueness and respecting the window size.
 * @param newNumbers An array of new numbers to add.
 */
const updateNumbers = (newNumbers) => {
    newNumbers.forEach(num => {
        if (!numbers.includes(num)) {
            if (numbers.length >= WINDOW_SIZE) {
                numbers.shift();
            }
            numbers.push(num);
        }
    });
};
exports.updateNumbers = updateNumbers;
/**
 * Calculate the average of the stored numbers.
 * @returns The average of the numbers.
 */
const calculateAverage = () => {
    if (numbers.length === 0)
        return 0;
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};
exports.calculateAverage = calculateAverage;
/**
 * Get the current list of stored numbers.
 * @returns An array of numbers.
 */
const getNumbers = () => {
    return numbers;
};
exports.getNumbers = getNumbers;
