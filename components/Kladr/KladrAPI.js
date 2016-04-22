/* @flow */
import type {Address} from './Types';

declare function fetch(): any;

const kladrUrl = 'https://kladr.kontur.ru/v1/';
const LIMIT = 50;

export function search(searchText: string, levels: string, parentCode: ?string) {
  const data = createQuery({
    prefix: searchText,
    parentKladr: parentCode || '',
    limit: LIMIT,
    desiredAoLevels: levels,
    strictSubordination: 'false',
  });
  return fetch(`${kladrUrl}suggest?${data}`)
    .then(response => response.json())
    .then(json => toJS(json));
}

export function searchIndex(code: string, house: ?string) {
  const data = createQuery({
    code,
    house: house || '',
  });

  return fetch(`${kladrUrl}kladr/index?${data}`)
    .then(response => response.text());
}

export function verify(req: Address) {
  return fetch(`${kladrUrl}verify/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toJSON({address: req})),
  }).then((res) => res.json())
    .then((json) => toJS(json));
}

function createQuery(data){
  let params = [];
  for (const key in data) {
    if (data.hasOwnProperty) {
      params.push(`${key}=${encodeURIComponent(data[key])}`);
    }
  }
  return params.join('&');
}

function toJSON(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toJSON);
  } else if (obj && typeof obj === 'object') {
    const ret = {};
    for (const key in obj) {
      ret[key.charAt(0).toUpperCase() + key.substr(1)] = toJSON(obj[key]);
    }
    return ret;
  }
  return obj;
}

function toJS(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toJS);
  } else if (obj && typeof obj === 'object') {
    const ret = {};
    for (const key in obj) {
      ret[key.charAt(0).toLowerCase() + key.substr(1)] = toJS(obj[key]);
    }
    return ret;
  }
  return obj;
}
