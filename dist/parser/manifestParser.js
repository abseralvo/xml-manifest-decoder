'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var binaryxml_1 = require("./binaryxml");
// const NS_ANDROID = 'http://schemas.android.com/apk/res/android'
var INTENT_MAIN = 'android.intent.action.MAIN';
var CATEGORY_LAUNCHER = 'android.intent.category.LAUNCHER';
var ManifestParser = /** @class */ (function () {
    function ManifestParser(buffer) {
        this.buffer = buffer;
        this.xmlParser = new binaryxml_1.default(this.buffer);
    }
    ManifestParser.prototype.collapseAttributes = function (element) {
        var collapsed = Object.create(null);
        for (var _i = 0, _a = Array.from(element.attributes); _i < _a.length; _i++) {
            var attr = _a[_i];
            collapsed[attr.name] = attr.typedValue.value;
        }
        return collapsed;
    };
    ManifestParser.prototype.parseIntents = function (element, target) {
        var _this = this;
        target.intentFilters = [];
        target.metaData = [];
        return element.childNodes.forEach(function (element) {
            switch (element.nodeName) {
                case 'intent-filter': {
                    var intentFilter_1 = _this.collapseAttributes(element);
                    intentFilter_1.actions = [];
                    intentFilter_1.categories = [];
                    intentFilter_1.data = [];
                    element.childNodes.forEach(function (element) {
                        switch (element.nodeName) {
                            case 'action':
                                intentFilter_1.actions.push(_this.collapseAttributes(element));
                                break;
                            case 'category':
                                intentFilter_1.categories.push(_this.collapseAttributes(element));
                                break;
                            case 'data':
                                intentFilter_1.data.push(_this.collapseAttributes(element));
                                break;
                        }
                    });
                    target.intentFilters.push(intentFilter_1);
                    break;
                }
                case 'meta-data':
                    target.metaData.push(_this.collapseAttributes(element));
                    break;
            }
        });
    };
    ManifestParser.prototype.parseApplication = function (element) {
        var _this = this;
        var app = this.collapseAttributes(element);
        app.activities = [];
        app.activityAliases = [];
        app.launcherActivities = [];
        app.services = [];
        app.receivers = [];
        app.providers = [];
        app.usesLibraries = [];
        element.childNodes.forEach(function (element) {
            switch (element.nodeName) {
                case 'activity': {
                    var activity = _this.collapseAttributes(element);
                    _this.parseIntents(element, activity);
                    app.activities.push(activity);
                    if (_this.isLauncherActivity(activity)) {
                        app.launcherActivities.push(activity);
                    }
                    break;
                }
                case 'activity-alias': {
                    var activityAlias = _this.collapseAttributes(element);
                    _this.parseIntents(element, activityAlias);
                    app.activityAliases.push(activityAlias);
                    if (_this.isLauncherActivity(activityAlias)) {
                        app.launcherActivities.push(activityAlias);
                    }
                    break;
                }
                case 'service': {
                    var service = _this.collapseAttributes(element);
                    _this.parseIntents(element, service);
                    app.services.push(service);
                    break;
                }
                case 'receiver': {
                    var receiver = _this.collapseAttributes(element);
                    _this.parseIntents(element, receiver);
                    app.receivers.push(receiver);
                    break;
                }
                case 'provider': {
                    var provider_1 = _this.collapseAttributes(element);
                    provider_1.grantUriPermissions = [];
                    provider_1.metaData = [];
                    provider_1.pathPermissions = [];
                    element.childNodes.forEach(function (element) {
                        switch (element.nodeName) {
                            case 'grant-uri-permission':
                                provider_1.grantUriPermissions.push(_this.collapseAttributes(element));
                                break;
                            case 'meta-data':
                                provider_1.metaData.push(_this.collapseAttributes(element));
                                break;
                            case 'path-permission':
                                provider_1.pathPermissions.push(_this.collapseAttributes(element));
                                break;
                        }
                    });
                    app.providers.push(provider_1);
                    break;
                }
                case 'uses-library':
                    app.usesLibraries.push(_this.collapseAttributes(element));
                    break;
            }
        });
        return app;
    };
    ManifestParser.prototype.isLauncherActivity = function (activity) {
        return activity.intentFilters.some(function (filter) {
            var hasMain = filter.actions.some(function (action) { return action.name === INTENT_MAIN; });
            if (!hasMain) {
                return false;
            }
            return filter.categories.some(function (category) { return category.name === CATEGORY_LAUNCHER; });
        });
    };
    ManifestParser.prototype.parse = function () {
        var _this = this;
        var document = this.xmlParser.parse();
        var manifest = this.collapseAttributes(document);
        manifest.usesPermissions = [];
        manifest.permissions = [];
        manifest.permissionTrees = [];
        manifest.permissionGroups = [];
        manifest.instrumentation = null;
        manifest.usesSdk = null;
        manifest.usesConfiguration = null;
        manifest.usesFeatures = [];
        manifest.supportsScreens = null;
        manifest.compatibleScreens = [];
        manifest.supportsGlTextures = [];
        manifest.application = Object.create(null);
        document.childNodes.forEach(function (element) {
            switch (element.nodeName) {
                case 'uses-permission':
                    manifest.usesPermissions.push(_this.collapseAttributes(element));
                    break;
                case 'permission':
                    manifest.permissions.push(_this.collapseAttributes(element));
                    break;
                case 'permission-tree':
                    manifest.permissionTrees.push(_this.collapseAttributes(element));
                    break;
                case 'permission-group':
                    manifest.permissionGroups.push(_this.collapseAttributes(element));
                    break;
                case 'instrumentation':
                    manifest.instrumentation = _this.collapseAttributes(element);
                    break;
                case 'uses-sdk':
                    manifest.usesSdk = _this.collapseAttributes(element);
                    break;
                case 'uses-configuration':
                    manifest.usesConfiguration = _this.collapseAttributes(element);
                    break;
                case 'uses-feature':
                    manifest.usesFeatures.push(_this.collapseAttributes(element));
                    break;
                case 'supports-screens':
                    manifest.supportsScreens = _this.collapseAttributes(element);
                    break;
                case 'compatible-screens':
                    element.childNodes.forEach(function (screen) { return manifest.compatibleScreens.push(_this.collapseAttributes(screen)); });
                    break;
                case 'supports-gl-texture':
                    manifest.supportsGlTextures.push(_this.collapseAttributes(element));
                    break;
                case 'application':
                case 'com.stub.StubApp': // 360 encryption services (adbkit-apkreader#13)
                    manifest.application = _this.parseApplication(element);
                    break;
            }
        });
        return manifest;
    };
    return ManifestParser;
}());
exports.default = ManifestParser;
