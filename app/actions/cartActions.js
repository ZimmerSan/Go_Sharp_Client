import {SITE_TEMPLATE_ADD, SITE_TEMPLATE_DELETE, SITE_TEMPLATE_LOAD, SITE_TEMPLATE_UPDATE} from "./actionTypes";
import {store} from "../index";

export const loadCart = (siteTemplates) => (store.dispatch({ type: SITE_TEMPLATE_LOAD, siteTemplates }));
export const addToCart = (siteTemplate) => (store.dispatch({ type: SITE_TEMPLATE_ADD, siteTemplate }));
export const updateSiteTemplate = (siteTemplate) => (store.dispatch({ type: SITE_TEMPLATE_UPDATE, siteTemplate }));
export const deleteSiteTemplate = (id) => (store.dispatch({ type: SITE_TEMPLATE_DELETE, id }));