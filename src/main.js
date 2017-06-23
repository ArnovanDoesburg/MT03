import "angular";
import "@uirouter/angularjs";
import "angular-resource";
import "babel-polyfill";

import NemoService from "./common/NemoKennislink/NemoService";
import GoogleMapsService from "./common/ReverseGeocoding/GoogleMapsService";

import NavigationComponent from "./common/Navigation/Navigation.component.js";

import RouteConfig from "./RouteConfig";

angular.module("app", [
    "ui.router",
    "ngResource"
])
    .factory("NemoService", NemoService)
    .factory("GoogleMapsService", GoogleMapsService)
    .component("navigation", new NavigationComponent())
    .config(RouteConfig);