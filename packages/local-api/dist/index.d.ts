declare type ServeParams = {
    port: number;
    filename: string;
    dir: string;
    useProxy: boolean;
};
export declare const serve: (params: ServeParams) => Promise<void>;
export {};
