import {RouterLocation} from '@vaadin/router';
import {makeAutoObservable} from "mobx";

export class AppStore {
    applicationName = 'hilla-kafka';
    location = '';
    currentViewTitle = '';

    constructor() {
        makeAutoObservable(this);
    }

    setLocation(location: RouterLocation) {
        const serverSideRoute = location.route?.path == '(.*)';
        if (location.route && !serverSideRoute) {
            this.location = location.route.path;
        } else if (location.pathname.startsWith(location.baseUrl)) {
            this.location = location.pathname.substring(location.baseUrl.length);
        } else {
            this.location = location.pathname;
        }

        if (serverSideRoute) {
            this.currentViewTitle = document.title;
        } else {
            this.currentViewTitle = (location?.route as any)?.title || '';
        }
    }
}

export const appStore = new AppStore();