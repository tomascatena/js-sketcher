declare type ServeParams = {
    port: number;
    filename: string;
    dir: string;
};
export declare const serve: (params: ServeParams) => Promise<void>;
export {};
