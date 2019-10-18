interface PlainObject {
    [key: string]: any
}

interface Setter {
    (config: PlainObject, path: string, value: any): void
}

interface Checker {
    (config: PlainObject, path: string): boolean
}

interface Getter {
    (instance: Config, config: PlainObject, path: string, default_value?: any): any
}

const defaultSetter: Setter = function (config: PlainObject, path: string, value: any) {
    config[path] = value;
};

const defaultChecker: Checker = function (config: PlainObject, path: string): boolean {
    return config.hasOwnProperty(path);
};

const defaultGetter: Getter = function (instance: Config, config: PlainObject, path: string, default_value?: any): any {
    if (!instance.has(path)) {
        return default_value;
    }

    return config[path];
};


export class Config {
    protected _config: PlainObject;
    protected _setter: Setter;
    protected _checker: Checker;
    protected _getter: Getter;

    constructor(options?: {}) {
        this._config = this.defaultConfig();
        this._setter = defaultSetter;
        this._checker = defaultChecker;
        this._getter = defaultGetter;

        this.reset();

        if (options)
            this.import(options);
    }

    defaultConfig(): {} {
        return {};
    }

    set setter(setter: Setter) {
        this._setter = setter;
    }


    get config(): PlainObject {
        return this._config;
    }


    set config(options: PlainObject) {
        Object.keys(options).forEach(key => {
            this.set(key, options[key]);
        });
    }

    reset(): this {
        this._config = this.defaultConfig();

        return this;
    }

    set(path: string, value: any): this {
        this._setter(this._config, path, value);

        return this;
    }


    set checker(checker: Checker) {
        this._checker = checker;
    }

    has(path: string): boolean {
        return this._checker(this._config, path);
    }

    set getter(getter: Getter) {
        this._getter = getter;
    }

    get(path: any, default_value: any = null): any {
        return this._getter(this, this._config, path, default_value);
    }


    import(other: Config | {}, store_path: string = ''): this {
        const otherConfig = other instanceof Config ? other.config : other;

        if (store_path) {
            this.set(store_path, otherConfig);
        } else {
            this.config = otherConfig;
        }

        return this;
    }
}
