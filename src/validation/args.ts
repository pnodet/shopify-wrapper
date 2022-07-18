import {z} from 'zod';

export const idParser = z.string();
export const idsParser = idParser.array().nonempty();

export const handleParser = z.string();
export const handlesParser = handleParser.array().nonempty();

export const amountParser = z.number().min(1);
