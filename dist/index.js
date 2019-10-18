"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultSetter = function (config, path, value) {
    config[path] = value;
};
var defaultChecker = function (config, path) {
    return config.hasOwnProperty(path);
};
var defaultGetter = function (instance, config, path, default_value) {
    if (!instance.has(path)) {
        return default_value;
    }
    return config[path];
};
var Config = /** @class */ (function () {
    function Config(options) {
        this._config = this.defaultConfig();
        this._setter = defaultSetter;
        this._checker = defaultChecker;
        this._getter = defaultGetter;
        this.reset();
        if (options)
            this.import(options);
    }
    Config.prototype.defaultConfig = function () {
        return {};
    };
    Object.defineProperty(Config.prototype, "setter", {
        set: function (setter) {
            this._setter = setter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (options) {
            var _this = this;
            Object.keys(options).forEach(function (key) {
                _this.set(key, options[key]);
            });
        },
        enumerable: true,
        configurable: true
    });
    Config.prototype.reset = function () {
        this._config = this.defaultConfig();
        return this;
    };
    Config.prototype.set = function (path, value) {
        this._setter(this._config, path, value);
        return this;
    };
    Object.defineProperty(Config.prototype, "checker", {
        set: function (checker) {
            this._checker = checker;
        },
        enumerable: true,
        configurable: true
    });
    Config.prototype.has = function (path) {
        return this._checker(this._config, path);
    };
    Object.defineProperty(Config.prototype, "getter", {
        set: function (getter) {
            this._getter = getter;
        },
        enumerable: true,
        configurable: true
    });
    Config.prototype.get = function (path, default_value) {
        if (default_value === void 0) { default_value = null; }
        return this._getter(this, this._config, path, default_value);
    };
    Config.prototype.import = function (other, store_path) {
        if (store_path === void 0) { store_path = ''; }
        var otherConfig = other instanceof Config ? other.config : other;
        if (store_path) {
            this.set(store_path, otherConfig);
        }
        else {
            this.config = otherConfig;
        }
        return this;
    };
    return Config;
}());
exports.Config = Config;
