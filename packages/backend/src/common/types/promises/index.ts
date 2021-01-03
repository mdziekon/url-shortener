export type PromiseValue<T> = T extends Promise<infer ValueType> ? ValueType : never;
