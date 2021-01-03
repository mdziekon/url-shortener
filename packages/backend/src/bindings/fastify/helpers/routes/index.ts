import { CoreApi } from '../../../../core';
import { RouteEntry } from '../RestServer';
import { linksPostRoute } from './createLink';
import { linksByLinkUidGetRoute } from './readLinkByUid';
import { linksByLinkUidRedirectGetRoute } from './readLinkRedirectByUid';

interface InitRoutesParams {
  core: CoreApi;
}

export type RouteEntryWithCore = Omit<RouteEntry, 'handler'> & {
  handler: (core: CoreApi) => RouteEntry['handler'];
};

interface CreateRouteParams {
  core: CoreApi;
  routeEntry: RouteEntryWithCore;
}

export const createRoute = (params: CreateRouteParams): RouteEntry => {
  return {
    ...params.routeEntry,
    handler: params.routeEntry.handler(params.core),
  };
};

export const initRoutes = (params: InitRoutesParams): RouteEntry[] => {
  const routeEntries = [linksPostRoute, linksByLinkUidGetRoute, linksByLinkUidRedirectGetRoute];

  return routeEntries.map((routeEntry) => {
    return createRoute({
      core: params.core,
      routeEntry,
    });
  });
};
