import {configParser} from 'src/validation/config';
import {z} from 'zod';

export type ShopifyFetchConfig = z.infer<typeof configParser>;
