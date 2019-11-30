import {
  SET_FILTER,
  SET_LOADING,
  SET_DATA,
  SET_ACTIVE_VIEW,
  SET_ACTIVE_TREND
} from "./actionTypes";

export function setFilter(key, value) {
  return { type: SET_FILTER, payload: { key, value } };
}

export function setActiveView(view) {
  return { type: SET_ACTIVE_VIEW, payload: view };
}

export function setActiveTrend(trend) {
  return { type: SET_ACTIVE_TREND, payload: trend };
}

export function setData(data) {
  return { type: SET_DATA, payload: data };
}

export function setLoading(isLoading) {
  return { type: SET_LOADING, payload: isLoading };
}

export function applyFilters(filters) {
  return dispatch => {
    dispatch(setLoading(true));
    const data = new FormData();

    for (const key in filters) {
      const value = filters[key];
      if (value instanceof Array) {
        data.append(key, value.join(","));
      } else if (value instanceof Date) {
        data.append(
          key,
          value
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")
        );
      } else {
        data.append(key, value);
      }
    }
    const url = `http://csce413.loc/api/sales/`;
    fetch(url, {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setData(data));
        dispatch(setLoading(false));
      });
  };
}
