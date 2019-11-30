import { NOW, TWO_YEARS_AGO, VIEWS, TRENDS, ALL } from "./constants";
import {
  SET_FILTER,
  SET_ACTIVE_VIEW,
  SET_ACTIVE_TREND,
  SET_DATA,
  SET_LOADING
} from "./actionTypes";

const DEFAULT_FILTERS = {
  cities: [ALL],
  propertyTypes: [ALL],
  startDate: TWO_YEARS_AGO,
  endDate: NOW
};

export function filters(filters = DEFAULT_FILTERS, action) {
  if (action.type !== SET_FILTER) {
    return filters;
  }

  const { key, value } = action.payload;
  if (Array.isArray(value) && value.length > 0) {
    // Selecting ALL
    if (value[value.length - 1] === ALL) {
      return { ...filters, [key]: [ALL] };
    }

    // Selecting when ALL is selected
    if (value[0] === ALL) {
      return { ...filters, [key]: value.slice(1) };
    }
  }
  return { ...filters, [key]: value };
}

export function activeView(activeView = VIEWS.DASHBOARD, action) {
  if (action.type !== SET_ACTIVE_VIEW) {
    return activeView;
  }
  return action.payload;
}

export function activeTrend(activeTrend = TRENDS.OVERVIEW, action) {
  if (action.type !== SET_ACTIVE_TREND) {
    return activeTrend;
  }
  return action.payload;
}

export function data(data = {}, action) {
  if (action.type !== SET_DATA) {
    return data;
  }
  return action.payload;
}

export function loading(loading = false, action) {
  if (action.type !== SET_LOADING) {
    return loading;
  }
  return action.payload;
}
