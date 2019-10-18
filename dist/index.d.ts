interface ConfigValue {
    [key: string]: any;
}
interface Setter {
    (config: ConfigValue, path: string, value: any): void;
}
interface Checker {
    (config: ConfigValue, path: string): boolean;
}
interface Getter {
    (instance: Config, config: ConfigValue, path: string, default_value?: any): any;
}
export declare class Config {
    private _config;
    protected _setter: Setter;
    protected _checker: Checker;
    protected _getter: Getter;
    constructor(options?: {});
    defaultConfig(): {};
    setter: Setter;
    config: ConfigValue;
    reset(): this;
    set(path: string, value: any): this;
    checker: Checker;
    has(path: string): boolean;
    getter: Getter;
    get(path: any, default_value?: any): any;
    import(other: Config | {}, store_path?: string): this;
}
export {};
