import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from '@angular/router';


export class CustomRouteReuseStrategy implements RouteReuseStrategy {

  private handlers: { [key: string]: DetachedRouteHandle | null } = {};

  /**
   * Determines if this route (and its subtree) should be detached to be reused later
   * @param route
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {

    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }
    /** Whether this route should be re used or not */
    let shouldReuse = false;

    if (route.routeConfig.data) {
      route.routeConfig.data.reuse ? shouldReuse = true : shouldReuse = false;
    }

    return shouldReuse;
  }

  /**
   * Stores the detached route.
   */
  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    if (handler) {
      this.handlers[this.getUrl(route) as string] = handler;
    }
  }

  /**
   * Determines if this route (and its subtree) should be reattached
   * @param route Stores the detached route.
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.handlers[this.getUrl(route) as string];
  }

  /**
   * Retrieves the previously stored route
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    };
    if(route.routeConfig.data?.retrieve){
      this.handlers[this.getUrl(route) as string] = null;
    }
    return this.handlers[this.getUrl(route) as string];
  }

  /**
   * Determines if a route should be reused
   * @param future
   * @param current
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    /** We only want to reuse the route if the data of the route config contains a reuse true boolean */
    let reUseUrl = false;

    if (future.routeConfig) {
      if (future.routeConfig.data) {
        reUseUrl = future.routeConfig.data.reuse;
      }
    }

    /**
     * Default reuse strategy by angular assers based on the following condition
     * @see https://github.com/angular/angular/blob/4.4.6/packages/router/src/route_reuse_strategy.ts#L67
     */
    const defaultReuse = (future.routeConfig === current.routeConfig);

    // If either of our reuseUrl and default Url are true, we want to reuse the route
    //
    return reUseUrl || defaultReuse;
  }

  /**
   * Returns a url for the current route
   * @param route
   */
  getUrl(route: ActivatedRouteSnapshot): string | undefined {
    /** The url we are going to return */
    if (route.routeConfig) {
      const url = route.routeConfig.path as string;

      return url;
    }
  }
}
