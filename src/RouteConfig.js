import HomeTemplate from "./components/home/home.template.html";
import CalendarTemplate from "./components/calendar/calendar.template.html";
import AboutTemplate from "./components/about/about.template.html";

import HomeController from "./components/home/home.controller";
import CalendarController from "./components/calendar/calendar.controller";
import AboutController from "./components/about/about.controller";

/*@ngInject;*/
export default function RouteConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            name: "Home",
            url: "/",
            controller: HomeController,
            controllerAs: "homectrl",
            template: HomeTemplate
        })
        .state({
            name: "Calendar",
            url: "/agenda",
            controller: CalendarController,
            controllerAs: "calendarctrl",
            template: CalendarTemplate
        })
        .state({
            name: "About",
            url: "/over-mij",
            controller: AboutController,
            controllerAs: "aboutctrl",
            template: AboutTemplate
        });

    $urlRouterProvider.otherwise("/");
}
