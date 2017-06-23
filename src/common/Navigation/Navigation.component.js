import NavigationTemplate from "./navigation.template.html";

export default class Navigation {

    /*@ngInject;*/
    constructor() {
        this.controller = NavController;
        this.controllerAs = "navctrl";
        this.template = NavigationTemplate;
    }
}

class NavController {
    /*@ngInject;*/
    constructor($state) {
        this.state = $state;
    }

    go(state) {
        this.state.go(state);
    }

    current(state) {
        return this.state.current.name === state;
    }
}
