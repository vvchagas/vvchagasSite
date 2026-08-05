import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http from 'node:http';
import https from 'node:https';
import * as node_events from 'node:events';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import * as node_path from 'node:path';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as nodeCrypto from 'node:crypto';
import { createHash, scryptSync, timingSafeEqual } from 'node:crypto';
import * as clientRuntimeUtils from '@prisma/client-runtime-utils';
import * as node_fs from 'node:fs';
import { promises, existsSync } from 'node:fs';
import * as node_async_hooks from 'node:async_hooks';
import * as node_os from 'node:os';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { getIcons } from '@iconify/utils';
import { consola } from 'consola';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length).replace(/^\/+/, "");
  return "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _$1(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_$1();let A$1 = class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}};let y$1 = class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A$1;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}};function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H$1(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H$1(n){return typeof n?.entries=="function"}function v$1(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S$1=new Set([101,204,205,304]);async function b(n,e){const t=new y$1,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S$1.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C$1(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v$1(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function getRequestIP(event, opts = {}) {
  if (event.context.clientAddress) {
    return event.context.clientAddress;
  }
  if (opts.xForwardedFor) {
    const xForwardedFor = getRequestHeader(event, "x-forwarded-for")?.split(",").shift()?.trim();
    if (xForwardedFor) {
      return xForwardedFor;
    }
  }
  if (event.node.req.socket.remoteAddress) {
    return event.node.req.socket.remoteAddress;
  }
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _rawReqUrl = event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || _rawReqUrl);
    event._path = _reqPath;
    const _needsRawUrl = _reqPath !== _rawReqUrl;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _needsRawUrl ? layer.route.length > 1 ? _rawReqUrl.slice(layer.route.length) || "/" : _rawReqUrl : _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController$1 = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController: AbortController$1 });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash$1(input) {
  return digest(serialize$1(input));
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {},
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowDown": "i-lucide-arrow-down",
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "arrowUp": "i-lucide-arrow-up",
      "caution": "i-lucide-circle-alert",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "copy": "i-lucide-copy",
      "copyCheck": "i-lucide-copy-check",
      "dark": "i-lucide-moon",
      "drag": "i-lucide-grip-vertical",
      "ellipsis": "i-lucide-ellipsis",
      "error": "i-lucide-circle-x",
      "external": "i-lucide-arrow-up-right",
      "eye": "i-lucide-eye",
      "eyeOff": "i-lucide-eye-off",
      "file": "i-lucide-file",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "hash": "i-lucide-hash",
      "info": "i-lucide-info",
      "light": "i-lucide-sun",
      "loading": "i-lucide-loader-circle",
      "menu": "i-lucide-menu",
      "minus": "i-lucide-minus",
      "panelClose": "i-lucide-panel-left-close",
      "panelOpen": "i-lucide-panel-left-open",
      "plus": "i-lucide-plus",
      "reload": "i-lucide-rotate-ccw",
      "search": "i-lucide-search",
      "stop": "i-lucide-square",
      "success": "i-lucide-circle-check",
      "system": "i-lucide-monitor",
      "tip": "i-lucide-lightbulb",
      "upload": "i-lucide-upload",
      "warning": "i-lucide-triangle-alert"
    },
    "tv": {
      "twMergeConfig": {}
    }
  },
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "cssLayer": "base",
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codex",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "cuida",
      "dashicons",
      "devicon",
      "devicon-plain",
      "dinkie-icons",
      "duo-icons",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fa7-brands",
      "fa7-regular",
      "fa7-solid",
      "fad",
      "famicons",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-color",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "garden",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "ix",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "lineicons",
      "logos",
      "ls",
      "lsicon",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-icon-theme",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "meteor-icons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "nrk",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "picon",
      "pixel",
      "pixelarticons",
      "prime",
      "proicons",
      "ps",
      "qlementine-icons",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "roentgen",
      "si",
      "si-glyph",
      "sidekickicons",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "stash",
      "streamline",
      "streamline-block",
      "streamline-color",
      "streamline-cyber",
      "streamline-cyber-color",
      "streamline-emojis",
      "streamline-flex",
      "streamline-flex-color",
      "streamline-freehand",
      "streamline-freehand-color",
      "streamline-kameleon-color",
      "streamline-logos",
      "streamline-pixel",
      "streamline-plump",
      "streamline-plump-color",
      "streamline-sharp",
      "streamline-sharp-color",
      "streamline-stickies-color",
      "streamline-ultimate",
      "streamline-ultimate-color",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "temaki",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "d9bd213f-a09d-4e82-b31b-958c0fafad53",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false,
        "isr": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {},
  "icon": {
    "serverKnownCssClasses": []
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config$1 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config$1.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await import('./error-500.mjs');
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = "\"use strict\";(()=>{const o=window,e=document.documentElement,c=[\"dark\",\"light\"],s=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let r=s===\"system\"?f():s;const l=e.getAttribute(\"data-color-mode-forced\");l&&(r=l),i(r),o[\"__NUXT_COLOR_MODE__\"]={preference:s,value:r,getColorScheme:f,addColorScheme:i,removeColorScheme:d};function i(t){const a=\"\"+t+\"\",n=\"\";e.classList?e.classList.add(a):e.className+=\" \"+a,n&&e.setAttribute(\"data-\"+n,t)}function d(t){const a=\"\"+t+\"\",n=\"\";e.classList?e.classList.remove(a):e.className=e.className.replace(new RegExp(a,\"g\"),\"\"),n&&e.removeAttribute(\"data-\"+n)}function u(t){return o.matchMedia(\"(prefers-color-scheme\"+t+\")\")}function f(){if(o.matchMedia&&u(\"\").media!==\"not all\"){for(const t of c)if(u(\":\"+t).matches)return t}return\"light\"}})();function getStorageValue(o,e){switch(o){case\"localStorage\":try{return window.localStorage.getItem(e)}catch{return null}case\"sessionStorage\":try{return window.sessionStorage.getItem(e)}catch{return null}case\"cookie\":try{return getCookie(e)}catch{return null}default:return null}}function getCookie(o){const c=(\"; \"+window.document.cookie).split(\"; \"+o+\"=\");if(c.length===2){const s=c.pop();return s?s.split(\";\").shift():null}}";

const _nybGIyqsgC5z4jfj9qn3uy6EO_9MLNVxOmNBpvXovyc = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _nybGIyqsgC5z4jfj9qn3uy6EO_9MLNVxOmNBpvXovyc
];

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : "undefined" !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(nodeCrypto);

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(clientRuntimeUtils);

const require$$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(node_path);

const require$$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(node_fs);

const require$$4 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(node_async_hooks);

const require$$5 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(node_events);

const require$$6 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(node_os);

var eu=Object.create;var Jt=Object.defineProperty;var tu=Object.getOwnPropertyDescriptor;var ru=Object.getOwnPropertyNames;var nu=Object.getPrototypeOf,iu=Object.prototype.hasOwnProperty;var yi=(e,t)=>()=>(e&&(t=e(e=0)),t);var q=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ne=(e,t)=>{for(var r in t)Jt(e,r,{get:t[r],enumerable:true});},hi=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ru(t))!iu.call(e,i)&&i!==r&&Jt(e,i,{get:()=>t[i],enumerable:!(n=tu(t,i))||n.enumerable});return e};var B=(e,t,r)=>(r=e!=null?eu(nu(e)):{},hi(t||!e||!e.__esModule?Jt(r,"default",{value:e,enumerable:true}):r,e)),ou=e=>hi(Jt({},"__esModule",{value:true}),e);var Ni=q((Cf,Cu)=>{Cu.exports={name:"@prisma/engines-version",version:"7.9.0-1.e922089b7d7502aff4249d5da3420f6fa55fc6ad",main:"index.js",types:"index.d.ts",license:"Apache-2.0",author:"Tim Suchanek <suchanek@prisma.io>",prisma:{enginesVersion:"e922089b7d7502aff4249d5da3420f6fa55fc6ad"},repository:{type:"git",url:"https://github.com/prisma/engines-wrapper.git",directory:"packages/engines-version"},devDependencies:{"@types/node":"18.19.76",typescript:"4.9.5"},files:["index.js","index.d.ts"],scripts:{build:"tsc -d"}};});var Di=q(Gt=>{Object.defineProperty(Gt,"__esModule",{value:true});Gt.enginesVersion=void 0;Gt.enginesVersion=Ni().prisma.enginesVersion;});var Fi=q((kf,Mi)=>{Mi.exports=e=>{let t=e.match(/^[ \t]*(?=\S)/gm);return t?t.reduce((r,n)=>Math.min(r,n.length),1/0):0};});var qi=q((Nf,Vi)=>{Vi.exports=(e,t=1,r)=>{if(r={indent:" ",includeEmptyLines:false,...r},typeof e!="string")throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);if(typeof t!="number")throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);if(typeof r.indent!="string")throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);if(t===0)return e;let n=r.includeEmptyLines?/^/gm:/^(?!\s*$)/gm;return e.replace(n,r.indent.repeat(t))};});var Ui=q((Lf,Wt)=>{Wt.exports=(e={})=>{let t;if(e.repoUrl)t=e.repoUrl;else if(e.user&&e.repo)t=`https://github.com/${e.user}/${e.repo}`;else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");let r=new URL(`${t}/issues/new`),n=["body","title","labels","template","milestone","assignee","projects"];for(let i of n){let o=e[i];if(o!==void 0){if(i==="labels"||i==="projects"){if(!Array.isArray(o))throw new TypeError(`The \`${i}\` option should be an array`);o=o.join(",");}r.searchParams.set(i,o);}}return r.toString()};Wt.exports.default=Wt.exports;});var an=q((kg,Ki)=>{Ki.exports=function(){function e(t,r,n,i,o){return t<r||n<r?t>n?n+1:t+1:i===o?r:r+1}return function(t,r){if(t===r)return 0;if(t.length>r.length){var n=t;t=r,r=n;}for(var i=t.length,o=r.length;i>0&&t.charCodeAt(i-1)===r.charCodeAt(o-1);)i--,o--;for(var s=0;s<i&&t.charCodeAt(s)===r.charCodeAt(s);)s++;if(i-=s,o-=s,i===0||o<3)return o;var a=0,l,u,c,p,d,h,m,E,k,w,P,b,U=[];for(l=0;l<i;l++)U.push(l+1),U.push(t.charCodeAt(s+l));for(var Oe=U.length-1;a<o-3;)for(k=r.charCodeAt(s+(u=a)),w=r.charCodeAt(s+(c=a+1)),P=r.charCodeAt(s+(p=a+2)),b=r.charCodeAt(s+(d=a+3)),h=a+=4,l=0;l<Oe;l+=2)m=U[l],E=U[l+1],u=e(m,u,c,k,E),c=e(u,c,p,w,E),p=e(c,p,d,P,E),h=e(p,d,h,b,E),U[l]=h,d=p,p=c,c=u,u=m;for(;a<o;)for(k=r.charCodeAt(s+(u=a)),h=++a,l=0;l<Oe;l+=2)m=U[l],U[l]=h=e(m,u,h,k,U[l+1]),u=m;return h}}();});var to=yi(()=>{});var ro=yi(()=>{});var Rn=q(Se=>{Object.defineProperty(Se,"__esModule",{value:true});Se.anumber=Cn;Se.abytes=Es;Se.ahash=Dp;Se.aexists=Mp;Se.aoutput=Fp;function Cn(e){if(!Number.isSafeInteger(e)||e<0)throw new Error("positive integer expected, got "+e)}function Np(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function Es(e,...t){if(!Np(e))throw new Error("Uint8Array expected");if(t.length>0&&!t.includes(e.length))throw new Error("Uint8Array expected of length "+t+", got length="+e.length)}function Dp(e){if(typeof e!="function"||typeof e.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");Cn(e.outputLen),Cn(e.blockLen);}function Mp(e,t=true){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(t&&e.finished)throw new Error("Hash#digest() has already been called")}function Fp(e,t){Es(e);let r=t.outputLen;if(e.length<r)throw new Error("digestInto() expects output buffer of length at least "+r)}});var Qs=q(g=>{Object.defineProperty(g,"__esModule",{value:true});g.add5L=g.add5H=g.add4H=g.add4L=g.add3H=g.add3L=g.rotlBL=g.rotlBH=g.rotlSL=g.rotlSH=g.rotr32L=g.rotr32H=g.rotrBL=g.rotrBH=g.rotrSL=g.rotrSH=g.shrSL=g.shrSH=g.toBig=void 0;g.fromBig=In;g.split=Ts;g.add=$s;var Er=BigInt(2**32-1),kn=BigInt(32);function In(e,t=false){return t?{h:Number(e&Er),l:Number(e>>kn&Er)}:{h:Number(e>>kn&Er)|0,l:Number(e&Er)|0}}function Ts(e,t=false){let r=new Uint32Array(e.length),n=new Uint32Array(e.length);for(let i=0;i<e.length;i++){let{h:o,l:s}=In(e[i],t);[r[i],n[i]]=[o,s];}return [r,n]}var Ss=(e,t)=>BigInt(e>>>0)<<kn|BigInt(t>>>0);g.toBig=Ss;var vs=(e,t,r)=>e>>>r;g.shrSH=vs;var As=(e,t,r)=>e<<32-r|t>>>r;g.shrSL=As;var Cs=(e,t,r)=>e>>>r|t<<32-r;g.rotrSH=Cs;var Rs=(e,t,r)=>e<<32-r|t>>>r;g.rotrSL=Rs;var ks=(e,t,r)=>e<<64-r|t>>>r-32;g.rotrBH=ks;var Is=(e,t,r)=>e>>>r-32|t<<64-r;g.rotrBL=Is;var Os=(e,t)=>t;g.rotr32H=Os;var Ns=(e,t)=>e;g.rotr32L=Ns;var Ds=(e,t,r)=>e<<r|t>>>32-r;g.rotlSH=Ds;var Ms=(e,t,r)=>t<<r|e>>>32-r;g.rotlSL=Ms;var Fs=(e,t,r)=>t<<r-32|e>>>64-r;g.rotlBH=Fs;var _s=(e,t,r)=>e<<r-32|t>>>64-r;g.rotlBL=_s;function $s(e,t,r,n){let i=(t>>>0)+(n>>>0);return {h:e+r+(i/2**32|0)|0,l:i|0}}var Ls=(e,t,r)=>(e>>>0)+(t>>>0)+(r>>>0);g.add3L=Ls;var Vs=(e,t,r,n)=>t+r+n+(e/2**32|0)|0;g.add3H=Vs;var qs=(e,t,r,n)=>(e>>>0)+(t>>>0)+(r>>>0)+(n>>>0);g.add4L=qs;var js=(e,t,r,n,i)=>t+r+n+i+(e/2**32|0)|0;g.add4H=js;var Us=(e,t,r,n,i)=>(e>>>0)+(t>>>0)+(r>>>0)+(n>>>0)+(i>>>0);g.add5L=Us;var Bs=(e,t,r,n,i,o)=>t+r+n+i+o+(e/2**32|0)|0;g.add5H=Bs;var _p={fromBig:In,split:Ts,toBig:Ss,shrSH:vs,shrSL:As,rotrSH:Cs,rotrSL:Rs,rotrBH:ks,rotrBL:Is,rotr32H:Os,rotr32L:Ns,rotlSH:Ds,rotlSL:Ms,rotlBH:Fs,rotlBL:_s,add:$s,add3L:Ls,add3H:Vs,add4L:qs,add4H:js,add5H:Bs,add5L:Us};g.default=_p;});var Js=q(Tr=>{Object.defineProperty(Tr,"__esModule",{value:true});Tr.crypto=void 0;var ge=require$$0;Tr.crypto=ge&&typeof ge=="object"&&"webcrypto"in ge?ge.webcrypto:ge&&typeof ge=="object"&&"randomBytes"in ge?ge:void 0;});var zs=q(T=>{Object.defineProperty(T,"__esModule",{value:true});T.Hash=T.nextTick=T.byteSwapIfBE=T.isLE=void 0;T.isBytes=$p;T.u8=Lp;T.u32=Vp;T.createView=qp;T.rotr=jp;T.rotl=Up;T.byteSwap=Dn;T.byteSwap32=Bp;T.bytesToHex=Jp;T.hexToBytes=Hp;T.asyncLoop=zp;T.utf8ToBytes=Gs;T.toBytes=Sr;T.concatBytes=Wp;T.checkOpts=Kp;T.wrapConstructor=Zp;T.wrapConstructorWithOpts=Yp;T.wrapXOFConstructorWithOpts=Xp;T.randomBytes=ed;var Ke=Js(),Nn=Rn();function $p(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function Lp(e){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}function Vp(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function qp(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function jp(e,t){return e<<32-t|e>>>t}function Up(e,t){return e<<t|e>>>32-t>>>0}T.isLE=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function Dn(e){return e<<24&4278190080|e<<8&16711680|e>>>8&65280|e>>>24&255}T.byteSwapIfBE=T.isLE?e=>e:e=>Dn(e);function Bp(e){for(let t=0;t<e.length;t++)e[t]=Dn(e[t]);}var Qp=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function Jp(e){(0, Nn.abytes)(e);let t="";for(let r=0;r<e.length;r++)t+=Qp[e[r]];return t}var le={_0:48,_9:57,A:65,F:70,a:97,f:102};function Hs(e){if(e>=le._0&&e<=le._9)return e-le._0;if(e>=le.A&&e<=le.F)return e-(le.A-10);if(e>=le.a&&e<=le.f)return e-(le.a-10)}function Hp(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);let t=e.length,r=t/2;if(t%2)throw new Error("hex string expected, got unpadded hex of length "+t);let n=new Uint8Array(r);for(let i=0,o=0;i<r;i++,o+=2){let s=Hs(e.charCodeAt(o)),a=Hs(e.charCodeAt(o+1));if(s===void 0||a===void 0){let l=e[o]+e[o+1];throw new Error('hex string expected, got non-hex character "'+l+'" at index '+o)}n[i]=s*16+a;}return n}var Gp=async()=>{};T.nextTick=Gp;async function zp(e,t,r){let n=Date.now();for(let i=0;i<e;i++){r(i);let o=Date.now()-n;o>=0&&o<t||(await(0, T.nextTick)(),n+=o);}}function Gs(e){if(typeof e!="string")throw new Error("utf8ToBytes expected string, got "+typeof e);return new Uint8Array(new TextEncoder().encode(e))}function Sr(e){return typeof e=="string"&&(e=Gs(e)),(0, Nn.abytes)(e),e}function Wp(...e){let t=0;for(let n=0;n<e.length;n++){let i=e[n];(0, Nn.abytes)(i),t+=i.length;}let r=new Uint8Array(t);for(let n=0,i=0;n<e.length;n++){let o=e[n];r.set(o,i),i+=o.length;}return r}var On=class{clone(){return this._cloneInto()}};T.Hash=On;function Kp(e,t){if(t!==void 0&&{}.toString.call(t)!=="[object Object]")throw new Error("Options should be object or undefined");return Object.assign(e,t)}function Zp(e){let t=n=>e().update(Sr(n)).digest(),r=e();return t.outputLen=r.outputLen,t.blockLen=r.blockLen,t.create=()=>e(),t}function Yp(e){let t=(n,i)=>e(i).update(Sr(n)).digest(),r=e({});return t.outputLen=r.outputLen,t.blockLen=r.blockLen,t.create=n=>e(n),t}function Xp(e){let t=(n,i)=>e(i).update(Sr(n)).digest(),r=e({});return t.outputLen=r.outputLen,t.blockLen=r.blockLen,t.create=n=>e(n),t}function ed(e=32){if(Ke.crypto&&typeof Ke.crypto.getRandomValues=="function")return Ke.crypto.getRandomValues(new Uint8Array(e));if(Ke.crypto&&typeof Ke.crypto.randomBytes=="function")return Ke.crypto.randomBytes(e);throw new Error("crypto.getRandomValues must be defined")}});var ra=q(R=>{Object.defineProperty(R,"__esModule",{value:true});R.shake256=R.shake128=R.keccak_512=R.keccak_384=R.keccak_256=R.keccak_224=R.sha3_512=R.sha3_384=R.sha3_256=R.sha3_224=R.Keccak=void 0;R.keccakP=ea;var Ze=Rn(),Ot=Qs(),ue=zs(),Zs=[],Ys=[],Xs=[],td=BigInt(0),It=BigInt(1),rd=BigInt(2),nd=BigInt(7),id=BigInt(256),od=BigInt(113);for(let e=0,t=It,r=1,n=0;e<24;e++){[r,n]=[n,(2*r+3*n)%5],Zs.push(2*(5*n+r)),Ys.push((e+1)*(e+2)/2%64);let i=td;for(let o=0;o<7;o++)t=(t<<It^(t>>nd)*od)%id,t&rd&&(i^=It<<(It<<BigInt(o))-It);Xs.push(i);}var[sd,ad]=(0, Ot.split)(Xs,true),Ws=(e,t,r)=>r>32?(0, Ot.rotlBH)(e,t,r):(0, Ot.rotlSH)(e,t,r),Ks=(e,t,r)=>r>32?(0, Ot.rotlBL)(e,t,r):(0, Ot.rotlSL)(e,t,r);function ea(e,t=24){let r=new Uint32Array(10);for(let n=24-t;n<24;n++){for(let s=0;s<10;s++)r[s]=e[s]^e[s+10]^e[s+20]^e[s+30]^e[s+40];for(let s=0;s<10;s+=2){let a=(s+8)%10,l=(s+2)%10,u=r[l],c=r[l+1],p=Ws(u,c,1)^r[a],d=Ks(u,c,1)^r[a+1];for(let h=0;h<50;h+=10)e[s+h]^=p,e[s+h+1]^=d;}let i=e[2],o=e[3];for(let s=0;s<24;s++){let a=Ys[s],l=Ws(i,o,a),u=Ks(i,o,a),c=Zs[s];i=e[c],o=e[c+1],e[c]=l,e[c+1]=u;}for(let s=0;s<50;s+=10){for(let a=0;a<10;a++)r[a]=e[s+a];for(let a=0;a<10;a++)e[s+a]^=~r[(a+2)%10]&r[(a+4)%10];}e[0]^=sd[n],e[1]^=ad[n];}r.fill(0);}var Nt=class e extends ue.Hash{constructor(t,r,n,i=false,o=24){if(super(),this.blockLen=t,this.suffix=r,this.outputLen=n,this.enableXOF=i,this.rounds=o,this.pos=0,this.posOut=0,this.finished=false,this.destroyed=false,(0, Ze.anumber)(n),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=(0, ue.u32)(this.state);}keccak(){ue.isLE||(0, ue.byteSwap32)(this.state32),ea(this.state32,this.rounds),ue.isLE||(0, ue.byteSwap32)(this.state32),this.posOut=0,this.pos=0;}update(t){(0, Ze.aexists)(this);let{blockLen:r,state:n}=this;t=(0, ue.toBytes)(t);let i=t.length;for(let o=0;o<i;){let s=Math.min(r-this.pos,i-o);for(let a=0;a<s;a++)n[this.pos++]^=t[o++];this.pos===r&&this.keccak();}return this}finish(){if(this.finished)return;this.finished=true;let{state:t,suffix:r,pos:n,blockLen:i}=this;t[n]^=r,(r&128)!==0&&n===i-1&&this.keccak(),t[i-1]^=128,this.keccak();}writeInto(t){(0, Ze.aexists)(this,false),(0, Ze.abytes)(t),this.finish();let r=this.state,{blockLen:n}=this;for(let i=0,o=t.length;i<o;){this.posOut>=n&&this.keccak();let s=Math.min(n-this.posOut,o-i);t.set(r.subarray(this.posOut,this.posOut+s),i),this.posOut+=s,i+=s;}return t}xofInto(t){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(t)}xof(t){return (0, Ze.anumber)(t),this.xofInto(new Uint8Array(t))}digestInto(t){if((0, Ze.aoutput)(t,this),this.finished)throw new Error("digest() was already called");return this.writeInto(t),this.destroy(),t}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=true,this.state.fill(0);}_cloneInto(t){let{blockLen:r,suffix:n,outputLen:i,rounds:o,enableXOF:s}=this;return t||(t=new e(r,n,i,s,o)),t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=o,t.suffix=n,t.outputLen=i,t.enableXOF=s,t.destroyed=this.destroyed,t}};R.Keccak=Nt;var ye=(e,t,r)=>(0, ue.wrapConstructor)(()=>new Nt(t,e,r));R.sha3_224=ye(6,144,224/8);R.sha3_256=ye(6,136,256/8);R.sha3_384=ye(6,104,384/8);R.sha3_512=ye(6,72,512/8);R.keccak_224=ye(1,144,224/8);R.keccak_256=ye(1,136,256/8);R.keccak_384=ye(1,104,384/8);R.keccak_512=ye(1,72,512/8);var ta=(e,t,r)=>(0, ue.wrapXOFConstructorWithOpts)((n={})=>new Nt(t,e,n.dkLen===void 0?r:n.dkLen,true));R.shake128=ta(31,168,128/8);R.shake256=ta(31,136,256/8);});var ca=q((bx,he)=>{var{sha3_512:ld}=ra(),ia=24,Dt=32,Mn=(e=4,t=Math.random)=>{let r="";for(;r.length<e;)r=r+Math.floor(t()*36).toString(36);return r};function oa(e){let t=8n,r=0n;for(let n of e.values()){let i=BigInt(n);r=(r<<t)+i;}return r}var sa=(e="")=>oa(ld(e)).toString(36).slice(1),na=Array.from({length:26},(e,t)=>String.fromCharCode(t+97)),ud=e=>na[Math.floor(e()*na.length)],aa=({globalObj:e=typeof commonjsGlobal<"u"?commonjsGlobal:{},random:t=Math.random}={})=>{let r=Object.keys(e).toString(),n=r.length?r+Mn(Dt,t):Mn(Dt,t);return sa(n).substring(0,Dt)},la=e=>()=>e++,cd=476782367,ua=({random:e=Math.random,counter:t=la(Math.floor(e()*cd)),length:r=ia,fingerprint:n=aa({random:e})}={})=>function(){let o=ud(e),s=Date.now().toString(36),a=t().toString(36),l=Mn(r,e),u=`${s+l+a+n}`;return `${o+sa(u).substring(1,r)}`},pd=ua(),dd=(e,{minLength:t=2,maxLength:r=Dt}={})=>{let n=e.length,i=/^[0-9a-z]+$/;try{if(typeof e=="string"&&n>=t&&n<=r&&i.test(e))return !0}finally{}return  false};he.exports.getConstants=()=>({defaultLength:ia,bigLength:Dt});he.exports.init=ua;he.exports.createId=pd;he.exports.bufToBigInt=oa;he.exports.createCounter=la;he.exports.createFingerprint=aa;he.exports.isCuid=dd;});var pa=q((xx,Mt)=>{var{createId:md,init:fd,getConstants:gd,isCuid:yd}=ca();Mt.exports.createId=md;Mt.exports.init=fd;Mt.exports.getConstants=gd;Mt.exports.isCuid=yd;});var zm={};Ne(zm,{AnyNull:()=>N.AnyNull,DMMF:()=>ht,DbNull:()=>N.DbNull,Debug:()=>_,Decimal:()=>Kl.Decimal,Extensions:()=>Gr,JsonNull:()=>N.JsonNull,NullTypes:()=>N.NullTypes,ObjectEnumValue:()=>N.ObjectEnumValue,PrismaClientInitializationError:()=>x.PrismaClientInitializationError,PrismaClientKnownRequestError:()=>x.PrismaClientKnownRequestError,PrismaClientRustPanicError:()=>x.PrismaClientRustPanicError,PrismaClientUnknownRequestError:()=>x.PrismaClientUnknownRequestError,PrismaClientValidationError:()=>x.PrismaClientValidationError,Public:()=>zr,Sql:()=>oe.Sql,createParam:()=>Po,defineDmmfProperty:()=>Co,deserializeJsonObject:()=>Z,deserializeRawResult:()=>Qr,dmmfToRuntimeDataModel:()=>Ei,empty:()=>oe.empty,getPrismaClient:()=>Gl,getRuntime:()=>Wl,isAnyNull:()=>N.isAnyNull,isDbNull:()=>N.isDbNull,isJsonNull:()=>N.isJsonNull,isObjectEnumValue:()=>N.isObjectEnumValue,join:()=>oe.join,makeStrictEnum:()=>zl,makeTypedQueryFactory:()=>Ro,raw:()=>oe.raw,serializeJsonQuery:()=>pr,skip:()=>cr,sqltag:()=>oe.sql,warnOnce:()=>sn});var client=ou(zm);var Gr={};Ne(Gr,{defineExtension:()=>wi,getExtensionContext:()=>bi});function wi(e){return typeof e=="function"?e:t=>t.$extends(e)}function bi(e){return e}var zr={};Ne(zr,{validator:()=>xi});function xi(...e){return t=>t}var Y=class{_map=new Map;get(t){return this._map.get(t)?.value}set(t,r){this._map.set(t,{value:r});}getOrCreate(t,r){let n=this._map.get(t);if(n)return n.value;let i=r();return this.set(t,i),i}};function de(e){return e.substring(0,1).toLowerCase()+e.substring(1)}function Pi(e,t){let r={};for(let n of e){let i=n[t];r[i]=n;}return r}function ot(e){let t;return {get(){return t||(t={value:e()}),t.value}}}function Ei(e){return {models:Wr(e.models),enums:Wr(e.enums),types:Wr(e.types)}}function Wr(e){let t={};for(let{name:r,...n}of e)t[r]=n;return t}var To=require$$1;var Ht={};Ne(Ht,{$:()=>Ci,bgBlack:()=>gu,bgBlue:()=>bu,bgCyan:()=>Pu,bgGreen:()=>hu,bgMagenta:()=>xu,bgRed:()=>yu,bgWhite:()=>Eu,bgYellow:()=>wu,black:()=>pu,blue:()=>xe,bold:()=>G,cyan:()=>se,dim:()=>st,gray:()=>ct,green:()=>lt,grey:()=>fu,hidden:()=>uu,inverse:()=>lu,italic:()=>au,magenta:()=>du,red:()=>be,reset:()=>su,strikethrough:()=>cu,underline:()=>at,white:()=>mu,yellow:()=>ut});var Kr,Ti,Si,vi,Ai=true;typeof process<"u"&&({FORCE_COLOR:Kr,NODE_DISABLE_COLORS:Ti,NO_COLOR:Si,TERM:vi}=process.env||{},Ai=process.stdout&&process.stdout.isTTY);var Ci={enabled:!Ti&&Si==null&&vi!=="dumb"&&(Kr!=null&&Kr!=="0"||Ai)};function A(e,t){let r=new RegExp(`\\x1b\\[${t}m`,"g"),n=`\x1B[${e}m`,i=`\x1B[${t}m`;return function(o){return !Ci.enabled||o==null?o:n+(~(""+o).indexOf(i)?o.replace(r,i+n):o)+i}}var su=A(0,0),G=A(1,22),st=A(2,22),au=A(3,23),at=A(4,24),lu=A(7,27),uu=A(8,28),cu=A(9,29),pu=A(30,39),be=A(31,39),lt=A(32,39),ut=A(33,39),xe=A(34,39),du=A(35,39),se=A(36,39),mu=A(37,39),ct=A(90,39),fu=A(90,39),gu=A(40,49),yu=A(41,49),hu=A(42,49),wu=A(43,49),bu=A(44,49),xu=A(45,49),Pu=A(46,49),Eu=A(47,49);var Tu=100,Ri=["green","yellow","blue","magenta","cyan","red"],pt=[],ki=Date.now(),Su=0,Zr=typeof process<"u"?process.env:{};globalThis.DEBUG??=Zr.DEBUG??"";globalThis.DEBUG_COLORS??=Zr.DEBUG_COLORS?Zr.DEBUG_COLORS==="true":true;var dt={enable(e){typeof e=="string"&&(globalThis.DEBUG=e);},disable(){let e=globalThis.DEBUG;return globalThis.DEBUG="",e},enabled(e){let t=globalThis.DEBUG.split(",").map(i=>i.replace(/[.+?^${}()|[\]\\]/g,"\\$&")),r=t.some(i=>i===""||i[0]==="-"?false:e.match(RegExp(i.split("*").join(".*")+"$"))),n=t.some(i=>i===""||i[0]!=="-"?false:e.match(RegExp(i.slice(1).split("*").join(".*")+"$")));return r&&!n},log:(...e)=>{let[t,r,...n]=e;(console.warn??console.log)(`${t} ${r}`,...n);},formatters:{}};function vu(e){let t={color:Ri[Su++%Ri.length],enabled:dt.enabled(e),namespace:e,log:dt.log,extend:()=>{}},r=(...n)=>{let{enabled:i,namespace:o,color:s,log:a}=t;if(n.length!==0&&pt.push([o,...n]),pt.length>Tu&&pt.shift(),dt.enabled(o)||i){let l=n.map(c=>typeof c=="string"?c:Au(c)),u=`+${Date.now()-ki}ms`;ki=Date.now(),globalThis.DEBUG_COLORS?a(Ht[s](G(o)),...l,Ht[s](u)):a(o,...l,u);}};return new Proxy(r,{get:(n,i)=>t[i],set:(n,i,o)=>t[i]=o})}var _=new Proxy(vu,{get:(e,t)=>dt[t],set:(e,t,r)=>dt[t]=r});function Au(e,t=2){let r=new Set;return JSON.stringify(e,(n,i)=>{if(typeof i=="object"&&i!==null){if(r.has(i))return "[Circular *]";r.add(i);}else if(typeof i=="bigint")return i.toString();return i},t)}function Ii(e=7500){let t=pt.map(([r,...n])=>`${r} ${n.map(i=>typeof i=="string"?i:JSON.stringify(i)).join(" ")}`).join(`
`);return t.length<e?t:t.slice(-e)}function Oi(){pt.length=0;}function ae(e,t){throw new Error(t)}B(Fi(),1);var $i="prisma+postgres",zt=`${$i}:`;function Li(e){return e?.toString().startsWith(`${zt}//`)??false}function Xr(e){if(!Li(e))return  false;let{host:t}=new URL(e);return t.includes("localhost")||t.includes("127.0.0.1")||t.includes("[::1]")}var ft={};Ne(ft,{error:()=>Iu,info:()=>ku,log:()=>Ru,query:()=>Ou,should:()=>ji,tags:()=>mt,warn:()=>en});var mt={error:be("prisma:error"),warn:ut("prisma:warn"),info:se("prisma:info"),query:xe("prisma:query")},ji={warn:()=>!process.env.PRISMA_DISABLE_WARNINGS};function Ru(...e){console.log(...e);}function en(e,...t){ji.warn()&&console.warn(`${mt.warn} ${e}`,...t);}function ku(e,...t){console.info(`${mt.info} ${e}`,...t);}function Iu(e,...t){console.error(`${mt.error} ${e}`,...t);}function Ou(e,...t){console.log(`${mt.query} ${e}`,...t);}function tn({onlyFirst:e=false}={}){let r=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");return new RegExp(r,e?void 0:"g")}var Nu=tn();function De(e){if(typeof e!="string")throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);return e.replace(Nu,"")}var gt=B(require$$2);function rn(e){return gt.default.sep===gt.default.posix.sep?e:e.split(gt.default.sep).join(gt.default.posix.sep)}function nn(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function Kt(e,t){let r={};for(let n of Object.keys(e))r[n]=t(e[n],n);return r}function on(e,t){if(e.length===0)return;let r=e[0];for(let n=1;n<e.length;n++)t(r,e[n])<0&&(r=e[n]);return r}function yt(e,t){Object.defineProperty(e,"name",{value:t,configurable:true});}var Bi=new Set,sn=(e,t,...r)=>{Bi.has(e)||(Bi.add(e),en(t,...r));};function Me(e){return e instanceof Date||Object.prototype.toString.call(e)==="[object Date]"}function Fe(e){return e.toString()!=="Invalid Date"}var Qi=require$$1;function _e(e){return Qi.Decimal.isDecimal(e)?true:e!==null&&typeof e=="object"&&typeof e.s=="number"&&typeof e.e=="number"&&typeof e.toFixed=="function"&&Array.isArray(e.d)}var go=require$$1;var ht={};Ne(ht,{ModelAction:()=>$e,datamodelEnumToSchemaEnum:()=>Du});function Du(e){return {name:e.name,values:e.values.map(t=>t.name)}}var $e=(b=>(b.findUnique="findUnique",b.findUniqueOrThrow="findUniqueOrThrow",b.findFirst="findFirst",b.findFirstOrThrow="findFirstOrThrow",b.findMany="findMany",b.create="create",b.createMany="createMany",b.createManyAndReturn="createManyAndReturn",b.update="update",b.updateMany="updateMany",b.updateManyAndReturn="updateManyAndReturn",b.upsert="upsert",b.delete="delete",b.deleteMany="deleteMany",b.groupBy="groupBy",b.count="count",b.aggregate="aggregate",b.findRaw="findRaw",b.aggregateRaw="aggregateRaw",b))($e||{});B(qi());B(require$$3);var Ji={keyword:se,entity:se,value:e=>G(xe(e)),punctuation:xe,directive:se,function:se,variable:e=>G(xe(e)),string:e=>G(lt(e)),boolean:ut,number:se,comment:ct};var Mu=e=>e,Zt={},Fu=0,y={manual:Zt.Prism&&Zt.Prism.manual,disableWorkerMessageHandler:Zt.Prism&&Zt.Prism.disableWorkerMessageHandler,util:{encode:function(e){if(e instanceof z){let t=e;return new z(t.type,y.util.encode(t.content),t.alias)}else return Array.isArray(e)?e.map(y.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++Fu}),e.__id},clone:function e(t,r){let n,i,o=y.util.type(t);switch(r=r||{},o){case "Object":if(i=y.util.objId(t),r[i])return r[i];n={},r[i]=n;for(let s in t)t.hasOwnProperty(s)&&(n[s]=e(t[s],r));return n;case "Array":return i=y.util.objId(t),r[i]?r[i]:(n=[],r[i]=n,t.forEach(function(s,a){n[a]=e(s,r);}),n);default:return t}}},languages:{extend:function(e,t){let r=y.util.clone(y.languages[e]);for(let n in t)r[n]=t[n];return r},insertBefore:function(e,t,r,n){n=n||y.languages;let i=n[e],o={};for(let a in i)if(i.hasOwnProperty(a)){if(a==t)for(let l in r)r.hasOwnProperty(l)&&(o[l]=r[l]);r.hasOwnProperty(a)||(o[a]=i[a]);}let s=n[e];return n[e]=o,y.languages.DFS(y.languages,function(a,l){l===s&&a!=e&&(this[a]=o);}),o},DFS:function e(t,r,n,i){i=i||{};let o=y.util.objId;for(let s in t)if(t.hasOwnProperty(s)){r.call(t,s,t[s],n||s);let a=t[s],l=y.util.type(a);l==="Object"&&!i[o(a)]?(i[o(a)]=true,e(a,r,null,i)):l==="Array"&&!i[o(a)]&&(i[o(a)]=true,e(a,r,s,i));}}}};y.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:true},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:true,greedy:true}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:true},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:true,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};y.languages.javascript=y.languages.extend("clike",{"class-name":[y.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:true}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:true},{pattern:/(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:true}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/});y.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;y.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:true,greedy:true},"function-variable":{pattern:/[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:true,inside:y.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:y.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:true,inside:y.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:true,inside:y.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});y.languages.markup&&y.languages.markup.tag.addInlined("script","javascript");y.languages.js=y.languages.javascript;y.languages.typescript=y.languages.extend("javascript",{keyword:/\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,builtin:/\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/});y.languages.ts=y.languages.typescript;function z(e,t,r,n,i){this.type=e,this.content=t,this.alias=r,this.length=(n||"").length|0,this.greedy=!!i;}z.stringify=function(e,t){return typeof e=="string"?e:Array.isArray(e)?e.map(function(r){return z.stringify(r,t)}).join(""):_u(e.type)(e.content)};function _u(e){return Ji[e]||Mu}var Lu={red:be,gray:ct,dim:st,bold:G,underline:at,highlightSource:e=>e.highlight()},Vu={red:e=>e,gray:e=>e,dim:e=>e,bold:e=>e,underline:e=>e,highlightSource:e=>e};function qu({message:e,originalMethod:t,isPanic:r,callArguments:n}){return {functionName:`prisma.${t}()`,message:e,isPanic:r??false,callArguments:n}}function ju({callsite:e,message:t,originalMethod:r,isPanic:n,callArguments:i},o){let s=qu({message:t,originalMethod:r,isPanic:n,callArguments:i});return s;}function Qu({functionName:e,location:t,message:r,isPanic:n,contextLines:i,callArguments:o},s){let a=[""],l=t?" in":":";if(n?(a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)),a.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`))):a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)),t&&a.push(s.underline(Ju(t))),i){a.push("");let u=[i.toString()];o&&(u.push(o),u.push(s.dim(")"))),a.push(u.join("")),o&&a.push("");}else a.push(""),o&&a.push(o),a.push("");return a.push(r),a.join(`
`)}function Ju(e){let t=[e.fileName];return e.lineNumber&&t.push(String(e.lineNumber)),e.columnNumber&&t.push(String(e.columnNumber)),t.join(":")}function Xt(e){let t=e.showColors?Lu:Vu,r;return r=ju(e),Qu(r,t)}var io=B(an());function Xi(e,t,r){let n=eo(e),i=Hu(n),o=zu(i);o?er(o,t,r):t.addErrorMessage(()=>"Unknown error");}function eo(e){return e.errors.flatMap(t=>t.kind==="Union"?eo(t):[t])}function Hu(e){let t=new Map,r=[];for(let n of e){if(n.kind!=="InvalidArgumentType"){r.push(n);continue}let i=`${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`,o=t.get(i);o?t.set(i,{...n,argument:{...n.argument,typeNames:Gu(o.argument.typeNames,n.argument.typeNames)}}):t.set(i,n);}return r.push(...t.values()),r}function Gu(e,t){return [...new Set(e.concat(t))]}function zu(e){return on(e,(t,r)=>{let n=Zi(t),i=Zi(r);return n!==i?n-i:Yi(t)-Yi(r)})}function Zi(e){let t=0;return Array.isArray(e.selectionPath)&&(t+=e.selectionPath.length),Array.isArray(e.argumentPath)&&(t+=e.argumentPath.length),t}function Yi(e){switch(e.kind){case "InvalidArgumentValue":case "ValueTooLarge":return 20;case "InvalidArgumentType":return 10;case "RequiredArgumentMissing":return  -10;default:return 0}}var j=class{constructor(t,r){this.name=t;this.value=r;}isRequired=false;makeRequired(){return this.isRequired=true,this}write(t){let{colors:{green:r}}=t.context;t.addMarginSymbol(r(this.isRequired?"+":"?")),t.write(r(this.name)),this.isRequired||t.write(r("?")),t.write(r(": ")),typeof this.value=="string"?t.write(r(this.value)):t.write(this.value);}};ro();var Le=class{constructor(t=0,r){this.context=r;this.currentIndent=t;}lines=[];currentLine="";currentIndent=0;marginSymbol;afterNextNewLineCallback;write(t){return typeof t=="string"?this.currentLine+=t:t.write(this),this}writeJoined(t,r,n=(i,o)=>o.write(i)){let i=r.length-1;for(let o=0;o<r.length;o++)n(r[o],this),o!==i&&this.write(t);return this}writeLine(t){return this.write(t).newLine()}newLine(){this.lines.push(this.indentedCurrentLine()),this.currentLine="",this.marginSymbol=void 0;let t=this.afterNextNewLineCallback;return this.afterNextNewLineCallback=void 0,t?.(),this}withIndent(t){return this.indent(),t(this),this.unindent(),this}afterNextNewline(t){return this.afterNextNewLineCallback=t,this}indent(){return this.currentIndent++,this}unindent(){return this.currentIndent>0&&this.currentIndent--,this}addMarginSymbol(t){return this.marginSymbol=t,this}toString(){return this.lines.concat(this.indentedCurrentLine()).join(`
`)}getCurrentLineLength(){return this.currentLine.length}indentedCurrentLine(){let t=this.currentLine.padStart(this.currentLine.length+2*this.currentIndent);return this.marginSymbol?this.marginSymbol+t.slice(1):t}};to();var tr=class{constructor(t){this.value=t;}write(t){t.write(this.value);}markAsError(){this.value.markAsError();}};var rr=e=>e,nr={bold:rr,red:rr,green:rr,dim:rr,enabled:false},no={bold:G,red:be,green:lt,dim:st,enabled:true},Ve={write(e){e.writeLine(",");}};var X=class{constructor(t){this.contents=t;}isUnderlined=false;color=t=>t;underline(){return this.isUnderlined=true,this}setColor(t){return this.color=t,this}write(t){let r=t.getCurrentLineLength();t.write(this.color(this.contents)),this.isUnderlined&&t.afterNextNewline(()=>{t.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));});}};var me=class{hasError=false;markAsError(){return this.hasError=true,this}};var qe=class extends me{items=[];addItem(t){return this.items.push(new tr(t)),this}getField(t){return this.items[t]}getPrintWidth(){return this.items.length===0?2:Math.max(...this.items.map(r=>r.value.getPrintWidth()))+2}write(t){if(this.items.length===0){this.writeEmpty(t);return}this.writeWithItems(t);}writeEmpty(t){let r=new X("[]");this.hasError&&r.setColor(t.context.colors.red).underline(),t.write(r);}writeWithItems(t){let{colors:r}=t.context;t.writeLine("[").withIndent(()=>t.writeJoined(Ve,this.items).newLine()).write("]"),this.hasError&&t.afterNextNewline(()=>{t.writeLine(r.red("~".repeat(this.getPrintWidth())));});}asObject(){}};var je=class e extends me{fields={};suggestions=[];addField(t){this.fields[t.name]=t;}addSuggestion(t){this.suggestions.push(t);}getField(t){return this.fields[t]}getDeepField(t){let[r,...n]=t,i=this.getField(r);if(!i)return;let o=i;for(let s of n){let a;if(o.value instanceof e?a=o.value.getField(s):o.value instanceof qe&&(a=o.value.getField(Number(s))),!a)return;o=a;}return o}getDeepFieldValue(t){return t.length===0?this:this.getDeepField(t)?.value}hasField(t){return !!this.getField(t)}removeAllFields(){this.fields={};}removeField(t){delete this.fields[t];}getFields(){return this.fields}isEmpty(){return Object.keys(this.fields).length===0}getFieldValue(t){return this.getField(t)?.value}getDeepSubSelectionValue(t){let r=this;for(let n of t){if(!(r instanceof e))return;let i=r.getSubSelectionValue(n);if(!i)return;r=i;}return r}getDeepSelectionParent(t){let r=this.getSelectionParent();if(!r)return;let n=r;for(let i of t){let o=n.value.getFieldValue(i);if(!o||!(o instanceof e))return;let s=o.getSelectionParent();if(!s)return;n=s;}return n}getSelectionParent(){let t=this.getField("select")?.value.asObject();if(t)return {kind:"select",value:t};let r=this.getField("include")?.value.asObject();if(r)return {kind:"include",value:r}}getSubSelectionValue(t){return this.getSelectionParent()?.value.fields[t].value}getPrintWidth(){let t=Object.values(this.fields);return t.length==0?2:Math.max(...t.map(n=>n.getPrintWidth()))+2}write(t){let r=Object.values(this.fields);if(r.length===0&&this.suggestions.length===0){this.writeEmpty(t);return}this.writeWithContents(t,r);}asObject(){return this}writeEmpty(t){let r=new X("{}");this.hasError&&r.setColor(t.context.colors.red).underline(),t.write(r);}writeWithContents(t,r){t.writeLine("{").withIndent(()=>{t.writeJoined(Ve,[...r,...this.suggestions]).newLine();}),t.write("}"),this.hasError&&t.afterNextNewline(()=>{t.writeLine(t.context.colors.red("~".repeat(this.getPrintWidth())));});}};var I=class extends me{constructor(r){super();this.text=r;}getPrintWidth(){return this.text.length}write(r){let n=new X(this.text);this.hasError&&n.underline().setColor(r.context.colors.red),r.write(n);}asObject(){}};var wt=class{fields=[];addField(t,r){return this.fields.push({write(n){let{green:i,dim:o}=n.context.colors;n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));}}),this}write(t){let{colors:{green:r}}=t.context;t.writeLine(r("{")).withIndent(()=>{t.writeJoined(Ve,this.fields).newLine();}).write(r("}")).addMarginSymbol(r("+"));}};function er(e,t,r){switch(e.kind){case "MutuallyExclusiveFields":Wu(e,t);break;case "IncludeOnScalar":Ku(e,t);break;case "EmptySelection":Zu(e,t,r);break;case "UnknownSelectionField":tc(e,t);break;case "InvalidSelectionValue":rc(e,t);break;case "UnknownArgument":nc(e,t);break;case "UnknownInputField":ic(e,t);break;case "RequiredArgumentMissing":oc(e,t);break;case "InvalidArgumentType":sc(e,t);break;case "InvalidArgumentValue":ac(e,t);break;case "ValueTooLarge":lc(e,t);break;case "SomeFieldsMissing":uc(e,t);break;case "TooManyFieldsGiven":cc(e,t);break;case "Union":Xi(e,t,r);break;default:throw new Error("not implemented: "+e.kind)}}function Wu(e,t){let r=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();r&&(r.getField(e.firstField)?.markAsError(),r.getField(e.secondField)?.markAsError()),t.addErrorMessage(n=>`Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`);}function Ku(e,t){let[r,n]=Ue(e.selectionPath),i=e.outputType,o=t.arguments.getDeepSelectionParent(r)?.value;if(o&&(o.getField(n)?.markAsError(),i))for(let s of i.fields)s.isRelation&&o.addSuggestion(new j(s.name,"true"));t.addErrorMessage(s=>{let a=`Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;return i?a+=` on model ${s.bold(i.name)}. ${bt(s)}`:a+=".",a+=`
Note that ${s.bold("include")} statements only accept relation fields.`,a});}function Zu(e,t,r){let n=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();if(n){let i=n.getField("omit")?.value.asObject();if(i){Yu(e,t,i);return}if(n.hasField("select")){Xu(e,t);return}}if(r?.[de(e.outputType.name)]){ec(e,t);return}t.addErrorMessage(()=>`Unknown field at "${e.selectionPath.join(".")} selection"`);}function Yu(e,t,r){r.removeAllFields();for(let n of e.outputType.fields)r.addSuggestion(new j(n.name,"false"));t.addErrorMessage(n=>`The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`);}function Xu(e,t){let r=e.outputType,n=t.arguments.getDeepSelectionParent(e.selectionPath)?.value,i=n?.isEmpty()??false;n&&(n.removeAllFields(),ao(n,r)),t.addErrorMessage(o=>i?`The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${bt(o)}`:`The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);}function ec(e,t){let r=new wt;for(let i of e.outputType.fields)i.isRelation||r.addField(i.name,"false");let n=new j("omit",r).makeRequired();if(e.selectionPath.length===0)t.arguments.addSuggestion(n);else {let[i,o]=Ue(e.selectionPath),a=t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);if(a){let l=a?.value.asObject()??new je;l.addSuggestion(n),a.value=l;}}t.addErrorMessage(i=>`The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`);}function tc(e,t){let r=lo(e.selectionPath,t);if(r.parentKind!=="unknown"){r.field.markAsError();let n=r.parent;switch(r.parentKind){case "select":ao(n,e.outputType);break;case "include":pc(n,e.outputType);break;case "omit":dc(n,e.outputType);break}}t.addErrorMessage(n=>{let i=[`Unknown field ${n.red(`\`${r.fieldName}\``)}`];return r.parentKind!=="unknown"&&i.push(`for ${n.bold(r.parentKind)} statement`),i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`),i.push(bt(n)),i.join(" ")});}function rc(e,t){let r=lo(e.selectionPath,t);r.parentKind!=="unknown"&&r.field.value.markAsError(),t.addErrorMessage(n=>`Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e.underlyingError}`);}function nc(e,t){let r=e.argumentPath[0],n=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();n&&(n.getField(r)?.markAsError(),mc(n,e.arguments)),t.addErrorMessage(i=>oo(i,r,e.arguments.map(o=>o.name)));}function ic(e,t){let[r,n]=Ue(e.argumentPath),i=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();if(i){i.getDeepField(e.argumentPath)?.markAsError();let o=i.getDeepFieldValue(r)?.asObject();o&&uo(o,e.inputType);}t.addErrorMessage(o=>oo(o,n,e.inputType.fields.map(s=>s.name)));}function oo(e,t,r){let n=[`Unknown argument \`${e.red(t)}\`.`],i=gc(t,r);return i&&n.push(`Did you mean \`${e.green(i)}\`?`),r.length>0&&n.push(bt(e)),n.join(" ")}function oc(e,t){let r;t.addErrorMessage(l=>r?.value instanceof I&&r.value.text==="null"?`Argument \`${l.green(o)}\` must not be ${l.red("null")}.`:`Argument \`${l.green(o)}\` is missing.`);let n=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();if(!n)return;let[i,o]=Ue(e.argumentPath),s=new wt,a=n.getDeepFieldValue(i)?.asObject();if(a){if(r=a.getField(o),r&&a.removeField(o),e.inputTypes.length===1&&e.inputTypes[0].kind==="object"){for(let l of e.inputTypes[0].fields)s.addField(l.name,l.typeNames.join(" | "));a.addSuggestion(new j(o,s).makeRequired());}else {let l=e.inputTypes.map(so).join(" | ");a.addSuggestion(new j(o,l).makeRequired());}if(e.dependentArgumentPath){n.getDeepField(e.dependentArgumentPath)?.markAsError();let[,l]=Ue(e.dependentArgumentPath);t.addErrorMessage(u=>`Argument \`${u.green(o)}\` is required because argument \`${u.green(l)}\` was provided.`);}}}function so(e){return e.kind==="list"?`${so(e.elementType)}[]`:e.name}function sc(e,t){let r=e.argument.name,n=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();n&&n.getDeepFieldValue(e.argumentPath)?.markAsError(),t.addErrorMessage(i=>{let o=ir("or",e.argument.typeNames.map(s=>i.green(s)));return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`});}function ac(e,t){let r=e.argument.name,n=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();n&&n.getDeepFieldValue(e.argumentPath)?.markAsError(),t.addErrorMessage(i=>{let o=[`Invalid value for argument \`${i.bold(r)}\``];if(e.underlyingError&&o.push(`: ${e.underlyingError}`),o.push("."),e.argument.typeNames.length>0){let s=ir("or",e.argument.typeNames.map(a=>i.green(a)));o.push(` Expected ${s}.`);}return o.join("")});}function lc(e,t){let r=e.argument.name,n=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),i;if(n){let s=n.getDeepField(e.argumentPath)?.value;s?.markAsError(),s instanceof I&&(i=s.text);}t.addErrorMessage(o=>{let s=["Unable to fit value"];return i&&s.push(o.red(i)),s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``),s.join(" ")});}function uc(e,t){let r=e.argumentPath[e.argumentPath.length-1],n=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();if(n){let i=n.getDeepFieldValue(e.argumentPath)?.asObject();i&&uo(i,e.inputType);}t.addErrorMessage(i=>{let o=[`Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`];return e.constraints.minFieldCount===1?e.constraints.requiredFields?o.push(`${i.green("at least one of")} ${ir("or",e.constraints.requiredFields.map(s=>`\`${i.bold(s)}\``))} arguments.`):o.push(`${i.green("at least one")} argument.`):o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`),o.push(bt(i)),o.join(" ")});}function cc(e,t){let r=e.argumentPath[e.argumentPath.length-1],n=t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),i=[];if(n){let o=n.getDeepFieldValue(e.argumentPath)?.asObject();o&&(o.markAsError(),i=Object.keys(o.getFields()));}t.addErrorMessage(o=>{let s=[`Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`];return e.constraints.minFieldCount===1&&e.constraints.maxFieldCount==1?s.push(`${o.green("exactly one")} argument,`):e.constraints.maxFieldCount==1?s.push(`${o.green("at most one")} argument,`):s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`),s.push(`but you provided ${ir("and",i.map(a=>o.red(a)))}. Please choose`),e.constraints.maxFieldCount===1?s.push("one."):s.push(`${e.constraints.maxFieldCount}.`),s.join(" ")});}function ao(e,t){for(let r of t.fields)e.hasField(r.name)||e.addSuggestion(new j(r.name,"true"));}function pc(e,t){for(let r of t.fields)r.isRelation&&!e.hasField(r.name)&&e.addSuggestion(new j(r.name,"true"));}function dc(e,t){for(let r of t.fields)!e.hasField(r.name)&&!r.isRelation&&e.addSuggestion(new j(r.name,"true"));}function mc(e,t){for(let r of t)e.hasField(r.name)||e.addSuggestion(new j(r.name,r.typeNames.join(" | ")));}function lo(e,t){let[r,n]=Ue(e),i=t.arguments.getDeepSubSelectionValue(r)?.asObject();if(!i)return {parentKind:"unknown",fieldName:n};let o=i.getFieldValue("select")?.asObject(),s=i.getFieldValue("include")?.asObject(),a=i.getFieldValue("omit")?.asObject(),l=o?.getField(n);return o&&l?{parentKind:"select",parent:o,field:l,fieldName:n}:(l=s?.getField(n),s&&l?{parentKind:"include",field:l,parent:s,fieldName:n}:(l=a?.getField(n),a&&l?{parentKind:"omit",field:l,parent:a,fieldName:n}:{parentKind:"unknown",fieldName:n}))}function uo(e,t){if(t.kind==="object")for(let r of t.fields)e.hasField(r.name)||e.addSuggestion(new j(r.name,r.typeNames.join(" | ")));}function Ue(e){let t=[...e],r=t.pop();if(!r)throw new Error("unexpected empty path");return [t,r]}function bt({green:e,enabled:t}){return "Available options are "+(t?`listed in ${e("green")}`:"marked with ?")+"."}function ir(e,t){if(t.length===1)return t[0];let r=[...t],n=r.pop();return `${r.join(", ")} ${e} ${n}`}var fc=3;function gc(e,t){let r=1/0,n;for(let i of t){let o=(0, io.default)(e,i);o>fc||o<r&&(r=o,n=i);}return n}var po=require$$1;var xt=class{modelName;name;typeName;isList;isEnum;constructor(t,r,n,i,o){this.modelName=t,this.name=r,this.typeName=n,this.isList=i,this.isEnum=o;}_toGraphQLInputType(){let t=this.isList?"List":"",r=this.isEnum?"Enum":"";return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`}};function Be(e){return e instanceof xt}var co=": ",or=class{constructor(t,r){this.name=t;this.value=r;}hasError=false;markAsError(){this.hasError=true;}getPrintWidth(){return this.name.length+this.value.getPrintWidth()+co.length}write(t){let r=new X(this.name);this.hasError&&r.underline().setColor(t.context.colors.red),t.write(r).write(co).write(this.value);}};var un=class{arguments;errorMessages=[];constructor(t){this.arguments=t;}write(t){t.write(this.arguments);}addErrorMessage(t){this.errorMessages.push(t);}renderAllMessages(t){return this.errorMessages.map(r=>r(t)).join(`
`)}};function Qe(e){return new un(mo(e))}function mo(e){let t=new je;for(let[r,n]of Object.entries(e)){let i=new or(r,fo(n));t.addField(i);}return t}function fo(e){if(typeof e=="string")return new I(JSON.stringify(e));if(typeof e=="number"||typeof e=="boolean")return new I(String(e));if(typeof e=="bigint")return new I(`${e}n`);if(e===null)return new I("null");if(e===void 0)return new I("undefined");if(_e(e))return new I(`new Prisma.Decimal("${e.toFixed()}")`);if(e instanceof Uint8Array)return Buffer.isBuffer(e)?new I(`Buffer.alloc(${e.byteLength})`):new I(`new Uint8Array(${e.byteLength})`);if(e instanceof Date){let t=Fe(e)?e.toISOString():"Invalid Date";return new I(`new Date("${t}")`)}return (0, po.isObjectEnumValue)(e)?new I(`Prisma.${e._getName()}`):Be(e)?new I(`prisma.${de(e.modelName)}.$fields.${e.name}`):Array.isArray(e)?yc(e):typeof e=="object"?mo(e):new I(Object.prototype.toString.call(e))}function yc(e){let t=new qe;for(let r of e)t.addItem(fo(r));return t}function sr(e,t){let r=t==="pretty"?no:nr,n=e.renderAllMessages(r),i=new Le(0,{colors:r}).write(e).toString();return {message:n,args:i}}function ar({args:e,errors:t,errorFormat:r,callsite:n,originalMethod:i,clientVersion:o,globalOmit:s}){let a=Qe(e);for(let p of t)er(p,a,s);let{message:l,args:u}=sr(a,r),c=Xt({message:l,callsite:n,originalMethod:i,showColors:r==="pretty",callArguments:u});throw new go.PrismaClientValidationError(c,{clientVersion:o})}function ee(e){return e.replace(/^./,t=>t.toLowerCase())}function ho(e,t,r){let n=ee(r);return !t.result||!(t.result.$allModels||t.result[n])?e:hc({...e,...yo(t.name,e,t.result.$allModels),...yo(t.name,e,t.result[n])})}function hc(e){let t=new Y,r=(n,i)=>t.getOrCreate(n,()=>i.has(n)?[n]:(i.add(n),e[n]?e[n].needs.flatMap(o=>r(o,i)):[n]));return Kt(e,n=>({...n,needs:r(n.name,new Set)}))}function yo(e,t,r){return r?Kt(r,({needs:n,compute:i},o)=>({name:o,needs:n?Object.keys(n).filter(s=>n[s]):[],compute:wc(t,o,i)})):{}}function wc(e,t,r){let n=e?.[t]?.compute;return n?i=>r({...i,[t]:n(i)}):r}function wo(e,t){if(!t)return e;let r={...e};for(let n of Object.values(t))if(e[n.name])for(let i of n.needs)r[i]=true;return r}function bo(e,t){if(!t)return e;let r={...e};for(let n of Object.values(t))if(!e[n.name])for(let i of n.needs)delete r[i];return r}var lr=class{constructor(t,r){this.extension=t;this.previous=r;}computedFieldsCache=new Y;modelExtensionsCache=new Y;queryCallbacksCache=new Y;clientExtensions=ot(()=>this.extension.client?{...this.previous?.getAllClientExtensions(),...this.extension.client}:this.previous?.getAllClientExtensions());batchCallbacks=ot(()=>{let t=this.previous?.getAllBatchQueryCallbacks()??[],r=this.extension.query?.$__internalBatch;return r?t.concat(r):t});getAllComputedFields(t){return this.computedFieldsCache.getOrCreate(t,()=>ho(this.previous?.getAllComputedFields(t),this.extension,t))}getAllClientExtensions(){return this.clientExtensions.get()}getAllModelExtensions(t){return this.modelExtensionsCache.getOrCreate(t,()=>{let r=ee(t);return !this.extension.model||!(this.extension.model[r]||this.extension.model.$allModels)?this.previous?.getAllModelExtensions(t):{...this.previous?.getAllModelExtensions(t),...this.extension.model.$allModels,...this.extension.model[r]}})}getAllQueryCallbacks(t,r){return this.queryCallbacksCache.getOrCreate(`${t}:${r}`,()=>{let n=this.previous?.getAllQueryCallbacks(t,r)??[],i=[],o=this.extension.query;return !o||!(o[t]||o.$allModels||o[r]||o.$allOperations)?n:(o[t]!==void 0&&(o[t][r]!==void 0&&i.push(o[t][r]),o[t].$allOperations!==void 0&&i.push(o[t].$allOperations)),t!=="$none"&&o.$allModels!==void 0&&(o.$allModels[r]!==void 0&&i.push(o.$allModels[r]),o.$allModels.$allOperations!==void 0&&i.push(o.$allModels.$allOperations)),o[r]!==void 0&&i.push(o[r]),o.$allOperations!==void 0&&i.push(o.$allOperations),n.concat(i))})}getAllBatchQueryCallbacks(){return this.batchCallbacks.get()}},Je=class e{constructor(t){this.head=t;}static empty(){return new e}static single(t){return new e(new lr(t))}isEmpty(){return this.head===void 0}append(t){return new e(new lr(t,this.head))}getAllComputedFields(t){return this.head?.getAllComputedFields(t)}getAllClientExtensions(){return this.head?.getAllClientExtensions()}getAllModelExtensions(t){return this.head?.getAllModelExtensions(t)}getAllQueryCallbacks(t,r){return this.head?.getAllQueryCallbacks(t,r)??[]}getAllBatchQueryCallbacks(){return this.head?.getAllBatchQueryCallbacks()??[]}};var ur=class{constructor(t){this.name=t;}};function xo(e){return e instanceof ur}function Po(e){return new ur(e)}var Eo=Symbol(),Pt=class{constructor(t){if(t!==Eo)throw new Error("Skip instance can not be constructed directly")}ifUndefined(t){return t===void 0?cr:t}},cr=new Pt(Eo);function Q(e){return e instanceof Pt}var bc={findUnique:"findUnique",findUniqueOrThrow:"findUniqueOrThrow",findFirst:"findFirst",findFirstOrThrow:"findFirstOrThrow",findMany:"findMany",count:"aggregate",create:"createOne",createMany:"createMany",createManyAndReturn:"createManyAndReturn",update:"updateOne",updateMany:"updateMany",updateManyAndReturn:"updateManyAndReturn",upsert:"upsertOne",delete:"deleteOne",deleteMany:"deleteMany",executeRaw:"executeRaw",queryRaw:"queryRaw",aggregate:"aggregate",groupBy:"groupBy",runCommandRaw:"runCommandRaw",findRaw:"findRaw",aggregateRaw:"aggregateRaw"},So="explicitly `undefined` values are not allowed";function pr({modelName:e,action:t,args:r,runtimeDataModel:n,extensions:i=Je.empty(),callsite:o,clientMethod:s,errorFormat:a,clientVersion:l,previewFeatures:u,globalOmit:c,wrapRawValues:p}){let d=new cn({runtimeDataModel:n,modelName:e,action:t,rootArgs:r,callsite:o,extensions:i,selectionPath:[],argumentPath:[],originalMethod:s,errorFormat:a,clientVersion:l,previewFeatures:u,globalOmit:c,wrapRawValues:p});return {modelName:e,action:bc[t],query:Et(r,d)}}function Et({select:e,include:t,...r}={},n){let i=r.omit;return delete r.omit,{arguments:Ao(r,n),selection:xc(e,t,i,n)}}function xc(e,t,r,n){return e?(t?n.throwValidationError({kind:"MutuallyExclusiveFields",firstField:"include",secondField:"select",selectionPath:n.getSelectionPath()}):r&&n.throwValidationError({kind:"MutuallyExclusiveFields",firstField:"omit",secondField:"select",selectionPath:n.getSelectionPath()}),Sc(e,n)):Pc(n,t,r)}function Pc(e,t,r){let n={};return e.modelOrType&&!e.isRawAction()&&(n.$composites=true,n.$scalars=true),t&&Ec(n,t,e),Tc(n,r,e),n}function Ec(e,t,r){for(let[n,i]of Object.entries(t)){if(Q(i))continue;let o=r.nestSelection(n);if(pn(i,o),i===false||i===void 0){e[n]=false;continue}let s=r.findField(n);if(s&&s.kind!=="object"&&r.throwValidationError({kind:"IncludeOnScalar",selectionPath:r.getSelectionPath().concat(n),outputType:r.getOutputTypeDescription()}),s){e[n]=Et(i===true?{}:i,o);continue}if(i===true){e[n]=true;continue}e[n]=Et(i,o);}}function Tc(e,t,r){let n=r.getComputedFields(),i={...r.getGlobalOmit(),...t},o=bo(i,n);for(let[s,a]of Object.entries(o)){if(Q(a))continue;pn(a,r.nestSelection(s));let l=r.findField(s);n?.[s]&&!l||(e[s]=!a);}}function Sc(e,t){let r={},n=t.getComputedFields(),i=wo(e,n);for(let[o,s]of Object.entries(i)){if(Q(s))continue;let a=t.nestSelection(o);pn(s,a);let l=t.findField(o);if(!(n?.[o]&&!l)){if(s===false||s===void 0||Q(s)){r[o]=false;continue}if(s===true){l?.kind==="object"?r[o]=Et({},a):r[o]=true;continue}r[o]=Et(s,a);}}return r}function vo(e,t){if(e===null)return null;if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return e;if(typeof e=="bigint")return {$type:"BigInt",value:String(e)};if(Me(e)){if(Fe(e))return {$type:"DateTime",value:e.toISOString()};t.throwValidationError({kind:"InvalidArgumentValue",selectionPath:t.getSelectionPath(),argumentPath:t.getArgumentPath(),argument:{name:t.getArgumentName(),typeNames:["Date"]},underlyingError:"Provided Date object is invalid"});}if(xo(e))return {$type:"Param",value:e.name};if(Be(e))return {$type:"FieldRef",value:{_ref:e.name,_container:e.modelName}};if(Array.isArray(e))return vc(e,t);if(ArrayBuffer.isView(e)){let{buffer:r,byteOffset:n,byteLength:i}=e;return {$type:"Bytes",value:Buffer.from(r,n,i).toString("base64")}}if(Ac(e))return e.values;if(_e(e))return {$type:"Decimal",value:e.toFixed()};if((0, To.isObjectEnumValue)(e)){let r=e._getName();if(r!=="DbNull"&&r!=="JsonNull"&&r!=="AnyNull")throw new Error(`Invalid ObjectEnumValue: expected DbNull, JsonNull, or AnyNull, got ${r}`);return {$type:"Enum",value:r}}if(Cc(e))return e.toJSON();if(typeof e=="object")return Ao(e,t);t.throwValidationError({kind:"InvalidArgumentValue",selectionPath:t.getSelectionPath(),argumentPath:t.getArgumentPath(),argument:{name:t.getArgumentName(),typeNames:[]},underlyingError:`We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it`});}function Ao(e,t){if(t.shouldWrapRawValues()&&e.$type)return {$type:"Raw",value:e};let r={};for(let n in e){let i=e[n],o=t.nestArgument(n);Q(i)||(i!==void 0?r[n]=vo(i,o):t.isPreviewFeatureOn("strictUndefinedChecks")&&t.throwValidationError({kind:"InvalidArgumentValue",argumentPath:o.getArgumentPath(),selectionPath:t.getSelectionPath(),argument:{name:t.getArgumentName(),typeNames:[]},underlyingError:So}));}return r}function vc(e,t){let r=[];for(let n=0;n<e.length;n++){let i=t.nestArgument(String(n)),o=e[n];if(o===void 0||Q(o)){let s=o===void 0?"undefined":"Prisma.skip";t.throwValidationError({kind:"InvalidArgumentValue",selectionPath:i.getSelectionPath(),argumentPath:i.getArgumentPath(),argument:{name:`${t.getArgumentName()}[${n}]`,typeNames:[]},underlyingError:`Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values`});}r.push(vo(o,i));}return r}function Ac(e){return typeof e=="object"&&e!==null&&e.__prismaRawParameters__===true}function Cc(e){return typeof e=="object"&&e!==null&&typeof e.toJSON=="function"}function pn(e,t){e===void 0&&t.isPreviewFeatureOn("strictUndefinedChecks")&&t.throwValidationError({kind:"InvalidSelectionValue",selectionPath:t.getSelectionPath(),underlyingError:So});}var cn=class e{constructor(t){this.params=t;this.params.modelName&&(this.modelOrType=this.params.runtimeDataModel.models[this.params.modelName]??this.params.runtimeDataModel.types[this.params.modelName]);}modelOrType;throwValidationError(t){ar({errors:[t],originalMethod:this.params.originalMethod,args:this.params.rootArgs??{},callsite:this.params.callsite,errorFormat:this.params.errorFormat,clientVersion:this.params.clientVersion,globalOmit:this.params.globalOmit});}getSelectionPath(){return this.params.selectionPath}getArgumentPath(){return this.params.argumentPath}getArgumentName(){return this.params.argumentPath[this.params.argumentPath.length-1]}getOutputTypeDescription(){if(!(!this.params.modelName||!this.modelOrType))return {name:this.params.modelName,fields:this.modelOrType.fields.map(t=>({name:t.name,typeName:"boolean",isRelation:t.kind==="object"}))}}isRawAction(){return ["executeRaw","queryRaw","runCommandRaw","findRaw","aggregateRaw"].includes(this.params.action)}isPreviewFeatureOn(t){return this.params.previewFeatures.includes(t)}shouldWrapRawValues(){return this.params.wrapRawValues??true}getComputedFields(){if(this.params.modelName)return this.params.extensions.getAllComputedFields(this.params.modelName)}findField(t){return this.modelOrType?.fields.find(r=>r.name===t)}nestSelection(t){let r=this.findField(t),n=r?.kind==="object"?r.type:void 0;return new e({...this.params,modelName:n,selectionPath:this.params.selectionPath.concat(t)})}getGlobalOmit(){return this.params.modelName&&this.shouldApplyGlobalOmit()?this.params.globalOmit?.[de(this.params.modelName)]??{}:{}}shouldApplyGlobalOmit(){switch(this.params.action){case "findFirst":case "findFirstOrThrow":case "findUniqueOrThrow":case "findMany":case "upsert":case "findUnique":case "createManyAndReturn":case "create":case "update":case "updateManyAndReturn":case "delete":return  true;case "executeRaw":case "aggregateRaw":case "runCommandRaw":case "findRaw":case "createMany":case "deleteMany":case "groupBy":case "updateMany":case "count":case "aggregate":case "queryRaw":return  false;default:ae(this.params.action,"Unknown action");}}nestArgument(t){return new e({...this.params,argumentPath:this.params.argumentPath.concat(t)})}};function Co(e,t){let r=ot(()=>Rc(t));Object.defineProperty(e,"dmmf",{get:()=>r.get()});}function Rc(e){return {datamodel:{models:dn(e.models),enums:dn(e.enums),types:dn(e.types)}}}function dn(e){return Object.entries(e).map(([t,r])=>({name:t,...r}))}var mn=new WeakMap,dr="$$PrismaTypedSql",Tt=class{constructor(t,r){mn.set(this,{sql:t,values:r}),Object.defineProperty(this,dr,{value:dr});}get sql(){return mn.get(this).sql}get values(){return mn.get(this).values}};function Ro(e){return (...t)=>new Tt(e,t)}function mr(e){return e!=null&&e[dr]===dr}var Bl=require$$1;var Ql=require$$4,Jl=require$$5;function St(e){return {getKeys(){return Object.keys(e)},getPropertyValue(t){return e[t]}}}function $(e,t){return {getKeys(){return [e]},getPropertyValue(){return t()}}}function Pe(e){let t=new Y;return {getKeys(){return e.getKeys()},getPropertyValue(r){return t.getOrCreate(r,()=>e.getPropertyValue(r))},getPropertyDescriptor(r){return e.getPropertyDescriptor?.(r)}}}var fr={enumerable:true,configurable:true,writable:true};function gr(e){let t=new Set(e);return {getPrototypeOf:()=>Object.prototype,getOwnPropertyDescriptor:()=>fr,has:(r,n)=>t.has(n),set:(r,n,i)=>t.add(n)&&Reflect.set(r,n,i),ownKeys:()=>[...t]}}var ko=Symbol.for("nodejs.util.inspect.custom");function W(e,t){let r=kc(t),n=new Set,i=new Proxy(e,{get(o,s){if(n.has(s))return o[s];let a=r.get(s);return a?a.getPropertyValue(s):o[s]},has(o,s){if(n.has(s))return  true;let a=r.get(s);return a?a.has?.(s)??true:Reflect.has(o,s)},ownKeys(o){let s=Io(Reflect.ownKeys(o),r),a=Io(Array.from(r.keys()),r);return [...new Set([...s,...a,...n])]},set(o,s,a){return r.get(s)?.getPropertyDescriptor?.(s)?.writable===false?false:(n.add(s),Reflect.set(o,s,a))},getOwnPropertyDescriptor(o,s){let a=Reflect.getOwnPropertyDescriptor(o,s);if(a&&!a.configurable)return a;let l=r.get(s);return l?l.getPropertyDescriptor?{...fr,...l?.getPropertyDescriptor(s)}:fr:a},defineProperty(o,s,a){return n.add(s),Reflect.defineProperty(o,s,a)},getPrototypeOf:()=>Object.prototype});return i[ko]=function(){let o={...this};return delete o[ko],o},i}function kc(e){let t=new Map;for(let r of e){let n=r.getKeys();for(let i of n)t.set(i,r);}return t}function Io(e,t){return e.filter(r=>t.get(r)?.has?.(r)??true)}function He(e){return {getKeys(){return e},has(){return  false},getPropertyValue(){}}}function Oo(e){if(e===void 0)return "";let t=Qe(e);return new Le(0,{colors:nr}).write(t).toString()}var vt="<unknown>";function No(e){var t=e.split(`
`);return t.reduce(function(r,n){var i=Nc(n)||Mc(n)||$c(n)||jc(n)||Vc(n);return i&&r.push(i),r},[])}var Ic=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|rsc|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Oc=/\((\S*)(?::(\d+))(?::(\d+))\)/;function Nc(e){var t=Ic.exec(e);if(!t)return null;var r=t[2]&&t[2].indexOf("native")===0,n=t[2]&&t[2].indexOf("eval")===0,i=Oc.exec(t[2]);return n&&i!=null&&(t[2]=i[1],t[3]=i[2],t[4]=i[3]),{file:r?null:t[2],methodName:t[1]||vt,arguments:r?[t[2]]:[],lineNumber:t[3]?+t[3]:null,column:t[4]?+t[4]:null}}var Dc=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|rsc|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;function Mc(e){var t=Dc.exec(e);return t?{file:t[2],methodName:t[1]||vt,arguments:[],lineNumber:+t[3],column:t[4]?+t[4]:null}:null}var Fc=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|rsc|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,_c=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i;function $c(e){var t=Fc.exec(e);if(!t)return null;var r=t[3]&&t[3].indexOf(" > eval")>-1,n=_c.exec(t[3]);return r&&n!=null&&(t[3]=n[1],t[4]=n[2],t[5]=null),{file:t[3],methodName:t[1]||vt,arguments:t[2]?t[2].split(","):[],lineNumber:t[4]?+t[4]:null,column:t[5]?+t[5]:null}}var Lc=/^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;function Vc(e){var t=Lc.exec(e);return t?{file:t[3],methodName:t[1]||vt,arguments:[],lineNumber:+t[4],column:t[5]?+t[5]:null}:null}var qc=/^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;function jc(e){var t=qc.exec(e);return t?{file:t[2],methodName:t[1]||vt,arguments:[],lineNumber:+t[3],column:t[4]?+t[4]:null}:null}var fn=class{getLocation(){return null}},gn=class{_error;constructor(){this._error=new Error;}getLocation(){let t=this._error.stack;if(!t)return null;let n=No(t).find(i=>{if(!i.file)return  false;let o=rn(i.file);return o!=="<anonymous>"&&!o.includes("@prisma")&&!o.includes("/packages/client/src/runtime/")&&!o.endsWith("/runtime/client.js")&&!o.startsWith("internal/")&&!i.methodName.includes("new ")&&!i.methodName.includes("getCallSite")&&!i.methodName.includes("Proxy.")&&i.methodName.split(".").length<4});return !n||!n.file?null:{fileName:n.file,lineNumber:n.lineNumber,columnNumber:n.column}}};function fe(e){return e==="minimal"?typeof $EnabledCallSite=="function"&&e!=="minimal"?new $EnabledCallSite:new fn:new gn}var Do={_avg:true,_count:true,_sum:true,_min:true,_max:true};function Ge(e={}){let t=Bc(e);return Object.entries(t).reduce((n,[i,o])=>(Do[i]!==void 0?n.select[i]={select:o}:n[i]=o,n),{select:{}})}function Bc(e={}){return typeof e._count=="boolean"?{...e,_count:{_all:e._count}}:e}function yr(e={}){return t=>(typeof e._count=="boolean"&&(t._count=t._count._all),t)}function Mo(e,t){let r=yr(e);return t({action:"aggregate",unpacker:r,argsMapper:Ge})(e)}function Qc(e={}){let{select:t,...r}=e;return typeof t=="object"?Ge({...r,_count:t}):Ge({...r,_count:{_all:true}})}function Jc(e={}){return typeof e.select=="object"?t=>yr(e)(t)._count:t=>yr(e)(t)._count._all}function Fo(e,t){return t({action:"count",unpacker:Jc(e),argsMapper:Qc})(e)}function Hc(e={}){let t=Ge(e);if(Array.isArray(t.by))for(let r of t.by)typeof r=="string"&&(t.select[r]=true);else typeof t.by=="string"&&(t.select[t.by]=true);return t}function Gc(e={}){return t=>(typeof e?._count=="boolean"&&t.forEach(r=>{r._count=r._count._all;}),t)}function _o(e,t){return t({action:"groupBy",unpacker:Gc(e),argsMapper:Hc})(e)}function $o(e,t,r){if(t==="aggregate")return n=>Mo(n,r);if(t==="count")return n=>Fo(n,r);if(t==="groupBy")return n=>_o(n,r)}function Lo(e,t){let r=t.fields.filter(i=>!i.relationName),n=Pi(r,"name");return new Proxy({},{get(i,o){if(o in i||typeof o=="symbol")return i[o];let s=n[o];if(s)return new xt(e,o,s.type,s.isList,s.kind==="enum")},...gr(Object.keys(n))})}var Vo=e=>Array.isArray(e)?e:e.split("."),yn=(e,t)=>Vo(t).reduce((r,n)=>r&&r[n],e),qo=(e,t,r)=>Vo(t).reduceRight((n,i,o,s)=>Object.assign({},yn(e,s.slice(0,o)),{[i]:n}),r);function zc(e,t){return e===void 0||t===void 0?[]:[...t,"select",e]}function Wc(e,t,r){return t===void 0?e??{}:qo(t,r,e||true)}function hn(e,t,r,n,i,o){let a=e._runtimeDataModel.models[t].fields.reduce((l,u)=>({...l,[u.name]:u}),{});return l=>{let u=fe(e._errorFormat),c=zc(n,i),p=Wc(l,o,c),d=r({dataPath:c,callsite:u})(p),h=Kc(e,t);return new Proxy(d,{get(m,E){if(!h.includes(E))return m[E];let w=[a[E].type,r,E],P=[c,p];return hn(e,...w,...P)},...gr([...h,...Object.getOwnPropertyNames(d)])})}}function Kc(e,t){return e._runtimeDataModel.models[t].fields.filter(r=>r.kind==="object").map(r=>r.name)}var Zc=["findUnique","findUniqueOrThrow","findFirst","findFirstOrThrow","create","update","upsert","delete"],Yc=["aggregate","count","groupBy"];function wn(e,t){let r=e._extensions.getAllModelExtensions(t)??{},n=[Xc(e,t),tp(e,t),St(r),$("name",()=>t),$("$name",()=>t),$("$parent",()=>e._appliedParent)];return W({},n)}function Xc(e,t){let r=ee(t),n=Object.keys($e).concat("count");return {getKeys(){return n},getPropertyValue(i){let o=i,s=a=>l=>{let u=fe(e._errorFormat);return e._createPrismaPromise(c=>{let p={args:l,dataPath:[],action:o,model:t,clientMethod:`${r}.${i}`,jsModelName:r,transaction:c,callsite:u};return e._request({...p,...a})},{action:o,args:l,model:t})};return Zc.includes(o)?hn(e,t,s):ep(i)?$o(e,i,s):s({})}}}function ep(e){return Yc.includes(e)}function tp(e,t){return Pe($("fields",()=>{let r=e._runtimeDataModel.models[t];return Lo(t,r)}))}function jo(e){return e.replace(/^./,t=>t.toUpperCase())}var bn=Symbol();function At(e){let t=[rp(e),np(e),$(bn,()=>e),$("$parent",()=>e._appliedParent)],r=e._extensions.getAllClientExtensions();return r&&t.push(St(r)),W(e,t)}function rp(e){let t=Object.getPrototypeOf(e._originalClient),r=[...new Set(Object.getOwnPropertyNames(t))];return {getKeys(){return r},getPropertyValue(n){return e[n]}}}function np(e){let t=Object.keys(e._runtimeDataModel.models),r=t.map(ee),n=[...new Set(t.concat(r))];return Pe({getKeys(){return n},getPropertyValue(i){let o=jo(i);if(e._runtimeDataModel.models[o]!==void 0)return wn(e,o);if(e._runtimeDataModel.models[i]!==void 0)return wn(e,i)},getPropertyDescriptor(i){if(!r.includes(i))return {enumerable:false}}})}function Uo(e){return e[bn]?e[bn]:e}function Bo(e){if(typeof e=="function")return e(this);let t=Object.create(this._originalClient,{_extensions:{value:this._extensions.append(e)},_appliedParent:{value:this,configurable:true},$on:{value:void 0}});return At(t)}function Qo({result:e,modelName:t,select:r,omit:n,extensions:i}){let o=i.getAllComputedFields(t);if(!o)return e;let s=[],a=[];for(let l of Object.values(o)){if(n){if(n[l.name])continue;let u=l.needs.filter(c=>n[c]);u.length>0&&a.push(He(u));}else if(r){if(!r[l.name])continue;let u=l.needs.filter(c=>!r[c]);u.length>0&&a.push(He(u));}ip(e,l.needs)&&s.push(op(l,W(e,s)));}return s.length>0||a.length>0?W(e,[...s,...a]):e}function ip(e,t){return t.every(r=>nn(e,r))}function op(e,t){return Pe($(e.name,()=>e.compute(t)))}function hr({visitor:e,result:t,args:r,runtimeDataModel:n,modelName:i}){if(Array.isArray(t)){for(let s=0;s<t.length;s++)t[s]=hr({result:t[s],args:r,modelName:i,runtimeDataModel:n,visitor:e});return t}let o=e(t,i,r)??t;return r.include&&Jo({includeOrSelect:r.include,result:o,parentModelName:i,runtimeDataModel:n,visitor:e}),r.select&&Jo({includeOrSelect:r.select,result:o,parentModelName:i,runtimeDataModel:n,visitor:e}),o}function Jo({includeOrSelect:e,result:t,parentModelName:r,runtimeDataModel:n,visitor:i}){for(let[o,s]of Object.entries(e)){if(!s||t[o]==null||Q(s))continue;let l=n.models[r].fields.find(c=>c.name===o);if(!l||l.kind!=="object"||!l.relationName)continue;let u=typeof s=="object"?s:{};t[o]=hr({visitor:i,result:t[o],args:u,modelName:l.type,runtimeDataModel:n});}}function Ho({result:e,modelName:t,args:r,extensions:n,runtimeDataModel:i,globalOmit:o}){return n.isEmpty()||e==null||typeof e!="object"||!i.models[t]?e:hr({result:e,args:r??{},modelName:t,runtimeDataModel:i,visitor:(a,l,u)=>{let c=ee(l);return Qo({result:a,modelName:c,select:u.select,omit:u.select?void 0:{...o?.[c],...u.omit},extensions:n})}})}var Ee=require$$1;var sp=["$connect","$disconnect","$on","$use","$extends"],Go=sp;function zo(e){if(e instanceof Ee.Sql)return ap(e);if(mr(e))return lp(e);if(Array.isArray(e)){let r=[e[0]];for(let n=1;n<e.length;n++)r[n]=Ct(e[n]);return r}let t={};for(let r in e)t[r]=Ct(e[r]);return t}function ap(e){return new Ee.Sql(e.strings,e.values)}function lp(e){return new Tt(e.sql,e.values)}function Ct(e){if(typeof e!="object"||e==null||(0, Ee.isObjectEnumValue)(e)||Be(e)||Q(e))return e;if(_e(e))return new Ee.Decimal(e.toFixed());if(Me(e))return new Date(+e);if(ArrayBuffer.isView(e))return e.slice(0);if(Array.isArray(e)){let t=e.length,r;for(r=Array(t);t--;)r[t]=Ct(e[t]);return r}if(typeof e=="object"){let t={};for(let r in e)r==="__proto__"?Object.defineProperty(t,r,{value:Ct(e[r]),configurable:true,enumerable:true,writable:true}):t[r]=Ct(e[r]);return t}ae(e,"Unknown value");}function Ko(e,t,r,n=0){return e._createPrismaPromise(i=>{let o=t.customDataProxyFetch;return "transaction"in t&&i!==void 0&&(t.transaction?.kind==="batch"&&t.transaction.lock.then(),t.transaction=i),n===r.length?e._executeRequest(t):r[n]({model:t.model,operation:t.model?t.action:t.clientMethod,args:zo(t.args??{}),__internalParams:t,query:(s,a=t)=>{let l=a.customDataProxyFetch;return a.customDataProxyFetch=es(o,l),a.args=s,Ko(e,a,r,n+1)}})})}function Zo(e,t){let{jsModelName:r,action:n,clientMethod:i}=t,o=r?n:i;if(e._extensions.isEmpty())return e._executeRequest(t);let s=e._extensions.getAllQueryCallbacks(r??"$none",o);return Ko(e,t,s)}function Yo(e){return t=>{let r={requests:t},n=t[0].extensions.getAllBatchQueryCallbacks();return n.length?Xo(r,n,0,e):e(r)}}function Xo(e,t,r,n){if(r===t.length)return n(e);let i=e.customDataProxyFetch,o=e.requests[0].transaction;return t[r]({args:{queries:e.requests.map(s=>({model:s.modelName,operation:s.action,args:s.args})),transaction:o?{isolationLevel:o.kind==="batch"?o.isolationLevel:void 0}:void 0},__internalParams:e,query(s,a=e){let l=a.customDataProxyFetch;return a.customDataProxyFetch=es(i,l),Xo(a,t,r+1,n)}})}var Wo=e=>e;function es(e=Wo,t=Wo){return r=>e(t(r))}function rs({dataPath:e,modelName:t,args:r,runtimeDataModel:n}){let i={modelName:t,args:r??{}},o=up(e);if(!o||o.length===0)return i;let s=t,a=r??{};for(let l of o){let u=n.models[s];if(!u)return i;let c=u.fields.find(p=>p.name===l);if(!c)throw new Error(`Could not resolve relation field "${l}" on model "${s}" from dataPath "${e.join(".")}"`);if(c.kind!=="object"||!c.relationName)return i;s=c.type,a=cp(a,l);}return {modelName:s,args:a}}function up(e){let t=[];for(let r=0;r<e.length;r+=2){let n=e[r],i=e[r+1];if(n!=="select"&&n!=="include"||i===void 0)return;t.push(i);}return t}function cp(e,t){let r=e.select?.[t];if(ts(r))return r;let n=e.include?.[t];return ts(n)?n:{}}function ts(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}var ls=require$$1;var Rt=require$$1;function S(e,t){throw new Error(t)}function xn(e,t){return e===t||e!==null&&t!==null&&typeof e=="object"&&typeof t=="object"&&Object.keys(e).length===Object.keys(t).length&&Object.keys(e).every(r=>xn(e[r],t[r]))}function ze(e,t){let r=Object.keys(e),n=Object.keys(t);return (r.length<n.length?r:n).every(o=>{if(typeof e[o]==typeof t[o]&&typeof e[o]!="object")return e[o]===t[o];if(Rt.Decimal.isDecimal(e[o])||Rt.Decimal.isDecimal(t[o])){let s=ns(e[o]),a=ns(t[o]);return s&&a&&s.equals(a)}else if(e[o]instanceof Uint8Array||t[o]instanceof Uint8Array){let s=is(e[o]),a=is(t[o]);return s&&a&&s.equals(a)}else {if(e[o]instanceof Date||t[o]instanceof Date)return os(e[o])?.getTime()===os(t[o])?.getTime();if(typeof e[o]=="bigint"||typeof t[o]=="bigint")return ss(e[o])===ss(t[o]);if(typeof e[o]=="number"||typeof t[o]=="number")return as(e[o])===as(t[o])}return xn(e[o],t[o])})}function ns(e){return Rt.Decimal.isDecimal(e)?e:typeof e=="number"||typeof e=="string"?new Rt.Decimal(e):void 0}function is(e){return Buffer.isBuffer(e)?e:e instanceof Uint8Array?Buffer.from(e.buffer,e.byteOffset,e.byteLength):typeof e=="string"?Buffer.from(e,"base64"):void 0}function os(e){return e instanceof Date?e:typeof e=="string"||typeof e=="number"?new Date(e):void 0}function ss(e){return typeof e=="bigint"?e:typeof e=="number"||typeof e=="string"?BigInt(e):void 0}function as(e){return typeof e=="number"?e:typeof e=="string"?Number(e):void 0}function K(e){return JSON.stringify(e,(t,r)=>typeof r=="bigint"?r.toString():ArrayBuffer.isView(r)?Buffer.from(r.buffer,r.byteOffset,r.byteLength).toString("base64"):r)}function pp(e){return e!==null&&typeof e=="object"&&typeof e.$type=="string"}function dp(e,t){let r={};for(let n of Object.keys(e))r[n]=t(e[n],n);return r}function Z(e){return e===null?e:Array.isArray(e)?e.map(Z):typeof e=="object"?pp(e)?mp(e):e.constructor!==null&&e.constructor.name!=="Object"?e:dp(e,Z):e}function mp({$type:e,value:t}){switch(e){case "BigInt":return BigInt(t);case "Bytes":{let{buffer:r,byteOffset:n,byteLength:i}=Buffer.from(t,"base64");return new Uint8Array(r,n,i)}case "DateTime":return new Date(t);case "Decimal":return new ls.Decimal(t);case "Json":return JSON.parse(t);case "Raw":return t;case "FieldRef":throw new Error("FieldRef tagged values cannot be deserialized to JavaScript values");case "Enum":return t;default:S(t,"Unknown tagged value");}}function wr(e){return e.name==="DriverAdapterError"&&typeof e.cause=="object"}var f={Int32:0,Int64:1,Float:2,Double:3,Numeric:4,Boolean:5,Character:6,Text:7,Date:8,Time:9,DateTime:10,Json:11,Enum:12,Bytes:13,Set:14,Uuid:15,Int32Array:64,Int64Array:65,FloatArray:66,DoubleArray:67,NumericArray:68,BooleanArray:69,CharacterArray:70,TextArray:71,DateArray:72,TimeArray:73,DateTimeArray:74,JsonArray:75,EnumArray:76,BytesArray:77,UuidArray:78,UnknownNumber:128};var O=class extends Error{name="UserFacingError";code;meta;constructor(t,r,n){super(t),this.code=r,this.meta=n??{};}toQueryResponseErrorObject(){return {error:this.message,user_facing_error:{is_panic:false,message:this.message,meta:this.meta,error_code:this.code}}}};function We(e){if(!wr(e))throw e;let t=hp(e),r=cs(e);throw t!==void 0&&r!==void 0?new O(r,t,{driverAdapterError:e}):yp(e.cause.kind)?gp(e):e}function En(e){throw wr(e)?fp(e):e}function fp(e){let t=e.cause.originalCode??"N/A",r=us(e);return new O(`Raw query failed. Code: \`${t}\`. Message: \`${r}\``,"P2010",{driverAdapterError:e})}function gp(e){let t=e.cause.originalCode??"N/A",r=us(e);return new O(`Database error. Code: \`${t}\`. Message: \`${r}\``,"P2039",{driverAdapterError:e})}function us(e){return e.cause.originalMessage??cs(e)??e.message??"N/A"}function yp(e){switch(e){case "postgres":case "mysql":case "sqlite":case "mssql":return  true;default:return  false}}function hp(e){switch(e.cause.kind){case "AuthenticationFailed":return "P1000";case "DatabaseNotReachable":return "P1001";case "DatabaseDoesNotExist":return "P1003";case "SocketTimeout":return "P1008";case "DatabaseAlreadyExists":return "P1009";case "DatabaseAccessDenied":return "P1010";case "TlsConnectionError":return "P1011";case "ConnectionClosed":return "P1017";case "TransactionAlreadyClosed":return "P1018";case "LengthMismatch":return "P2000";case "UniqueConstraintViolation":return "P2002";case "ForeignKeyConstraintViolation":return "P2003";case "InvalidInputValue":return "P2007";case "UnsupportedNativeDataType":return "P2010";case "NullConstraintViolation":return "P2011";case "ValueOutOfRange":return "P2020";case "TableDoesNotExist":return "P2021";case "ColumnNotFound":return "P2022";case "InvalidIsolationLevel":case "InconsistentColumnData":return "P2023";case "MissingFullTextSearchIndex":return "P2030";case "TransactionWriteConflict":return "P2034";case "GenericJs":return "P2036";case "TooManyConnections":return "P2037";case "postgres":case "sqlite":case "mysql":case "mssql":return;default:S(e.cause,`Unknown error: ${K(e.cause)}`);}}function cs(e){switch(e.cause.kind){case "AuthenticationFailed":return `Authentication failed against the database server, the provided database credentials for \`${e.cause.user??"(not available)"}\` are not valid`;case "DatabaseNotReachable":{let t=e.cause.host&&e.cause.port?`${e.cause.host}:${e.cause.port}`:e.cause.host;return `Can't reach database server${t?` at ${t}`:""}`}case "DatabaseDoesNotExist":return `Database \`${e.cause.db??"(not available)"}\` does not exist on the database server`;case "SocketTimeout":return "Operation has timed out";case "DatabaseAlreadyExists":return `Database \`${e.cause.db??"(not available)"}\` already exists on the database server`;case "DatabaseAccessDenied":return `User was denied access on the database \`${e.cause.db??"(not available)"}\``;case "TlsConnectionError":return `Error opening a TLS connection: ${e.cause.reason}`;case "ConnectionClosed":return "Server has closed the connection.";case "TransactionAlreadyClosed":return e.cause.cause;case "LengthMismatch":return `The provided value for the column is too long for the column's type. Column: ${e.cause.column??"(not available)"}`;case "UniqueConstraintViolation":return `Unique constraint failed on the ${Pn(e.cause.constraint)}`;case "ForeignKeyConstraintViolation":return `Foreign key constraint violated on the ${Pn(e.cause.constraint)}`;case "UnsupportedNativeDataType":return `Failed to deserialize column of type '${e.cause.type}'. If you're using $queryRaw and this column is explicitly marked as \`Unsupported\` in your Prisma schema, try casting this column to any supported Prisma type such as \`String\`.`;case "NullConstraintViolation":return `Null constraint violation on the ${Pn(e.cause.constraint)}`;case "ValueOutOfRange":return `Value out of range for the type: ${e.cause.cause}`;case "TableDoesNotExist":return `The table \`${e.cause.table??"(not available)"}\` does not exist in the current database.`;case "ColumnNotFound":return `The column \`${e.cause.column??"(not available)"}\` does not exist in the current database.`;case "InvalidIsolationLevel":return `Error in connector: Conversion error: ${e.cause.level}`;case "InconsistentColumnData":return `Inconsistent column data: ${e.cause.cause}`;case "MissingFullTextSearchIndex":return "Cannot find a fulltext index to use for the native search, try adding a @@fulltext([Fields...]) to your schema";case "TransactionWriteConflict":return "Transaction failed due to a write conflict or a deadlock. Please retry your transaction";case "GenericJs":return `Error in external connector (id ${e.cause.id})`;case "TooManyConnections":return `Too many database connections opened: ${e.cause.cause}`;case "InvalidInputValue":return `Invalid input value: ${e.cause.message}`;case "sqlite":case "postgres":case "mysql":case "mssql":return;default:S(e.cause,`Unknown error: ${K(e.cause)}`);}}function Pn(e){return e&&"fields"in e?`fields: (${e.fields.map(t=>`\`${t}\``).join(", ")})`:e&&"index"in e?`constraint: \`${e.index}\``:e&&"foreignKey"in e?"foreign key":"(not available)"}function wp(e){if(typeof e!="object"||e===null)return  false;let t=e;return "$type"in t&&t.$type==="Param"||"prisma__type"in t&&t.prisma__type==="param"}function bp(e){return "prisma__type"in e?e.prisma__value?.name:e.value.name}function xp(e,t){let r={};for(let[n,i]of Object.entries(e))if(r[n]=i,wp(i)){let o=bp(i);o&&o in t&&(r[n]=t[o]);}return r}function ps(e,t,r={}){let n=e.map(o=>t.keys.reduce((s,a)=>(s[a]=Z(o[a]),s),{})),i=new Set(t.nestedSelection);return t.arguments.map(o=>{let s=xp(o,r),a=n.findIndex(l=>ze(l,s));if(a===-1)return t.expectNonEmpty?new O("An operation failed because it depends on one or more records that were required but not found","P2025"):null;{let l=Object.entries(e[a]).filter(([u])=>i.has(u));return Object.fromEntries(l)}})}var fs=require$$1;var C=class extends O{name="DataMapperError";constructor(t,r){super(t,"P2023",r);}},ds=new WeakMap;function Pp(e){let t=ds.get(e);return t||(t=Object.entries(e),ds.set(e,t)),t}function gs(e,t,r){switch(t.type){case "affectedRows":if(typeof e!="number")throw new C(`Expected an affected rows count, got: ${typeof e} (${e})`);return {count:e};case "object":return Sn(e,t.fields,r,t.skipNulls);case "field":return Tn(e,"<result>",t.fieldType,r);default:S(t,`Invalid data mapping type: '${t.type}'`);}}function Sn(e,t,r,n){if(e===null)return null;if(Array.isArray(e)){let i=e;return n&&(i=i.filter(o=>o!==null)),i.map(o=>ms(o,t,r))}if(typeof e=="object")return ms(e,t,r);if(typeof e=="string"){let i;try{i=JSON.parse(e);}catch(o){throw new C("Expected an array or object, got a string that is not valid JSON",{cause:o})}return Sn(i,t,r,n)}throw new C(`Expected an array or an object, got: ${typeof e}`)}function ms(e,t,r){if(typeof e!="object")throw new C(`Expected an object, but got '${typeof e}'`);let n={};for(let[i,o]of Pp(t))switch(o.type){case "affectedRows":throw new C(`Unexpected 'AffectedRows' node in data mapping for field '${i}'`);case "object":{let{serializedName:s,fields:a,skipNulls:l}=o;if(s!==null&&!Object.hasOwn(e,s))throw new C(`Missing data field (Object): '${i}'; node: ${JSON.stringify(o)}; data: ${JSON.stringify(e)}`);let u=s!==null?e[s]:e;n[i]=Sn(u,a,r,l);break}case "field":{let s=o.dbName;if(Object.hasOwn(e,s))n[i]=Ep(e[s],s,o.fieldType,r);else throw new C(`Missing data field (Value): '${s}'; node: ${JSON.stringify(o)}; data: ${JSON.stringify(e)}`)}break;default:S(o,`DataMapper: Invalid data mapping node type: '${o.type}'`);}return n}function Ep(e,t,r,n){return e===null?r.arity==="list"?[]:null:r.arity==="list"?e.map((o,s)=>Tn(o,`${t}[${s}]`,r,n)):Tn(e,t,r,n)}function Tn(e,t,r,n){switch(r.type){case "unsupported":return e;case "string":{if(typeof e!="string")throw new C(`Expected a string in column '${t}', got ${typeof e}: ${e}`);return e}case "int":switch(typeof e){case "number":return Math.trunc(e);case "string":{let i=Math.trunc(Number(e));if(Number.isNaN(i)||!Number.isFinite(i))throw new C(`Expected an integer in column '${t}', got string: ${e}`);if(!Number.isSafeInteger(i))throw new C(`Integer value in column '${t}' is too large to represent as a JavaScript number without loss of precision, got: ${e}. Consider using BigInt type.`);return i}default:throw new C(`Expected an integer in column '${t}', got ${typeof e}: ${e}`)}case "bigint":{if(typeof e!="number"&&typeof e!="string")throw new C(`Expected a bigint in column '${t}', got ${typeof e}: ${e}`);return {$type:"BigInt",value:e}}case "float":{if(typeof e=="number")return e;if(typeof e=="string"){let i=Number(e);if(Number.isNaN(i)&&!/^[-+]?nan$/.test(e.toLowerCase()))throw new C(`Expected a float in column '${t}', got string: ${e}`);return i}throw new C(`Expected a float in column '${t}', got ${typeof e}: ${e}`)}case "boolean":{if(typeof e=="boolean")return e;if(typeof e=="number")return e===1;if(typeof e=="string"){if(e==="true"||e==="TRUE"||e==="1")return  true;if(e==="false"||e==="FALSE"||e==="0")return  false;throw new C(`Expected a boolean in column '${t}', got ${typeof e}: ${e}`)}if(Array.isArray(e)||e instanceof Uint8Array){for(let i of e)if(i!==0)return  true;return  false}throw new C(`Expected a boolean in column '${t}', got ${typeof e}: ${e}`)}case "decimal":if(typeof e!="number"&&typeof e!="string"&&!fs.Decimal.isDecimal(e))throw new C(`Expected a decimal in column '${t}', got ${typeof e}: ${e}`);return {$type:"Decimal",value:e};case "datetime":{if(typeof e=="string")return {$type:"DateTime",value:Sp(e)};if(typeof e=="number"||e instanceof Date)return {$type:"DateTime",value:e};throw new C(`Expected a date in column '${t}', got ${typeof e}: ${e}`)}case "object":return {$type:"Json",value:K(e)};case "json":return {$type:"Json",value:`${e}`};case "bytes":{switch(r.encoding){case "base64":if(typeof e!="string")throw new C(`Expected a base64-encoded byte array in column '${t}', got ${typeof e}: ${e}`);return {$type:"Bytes",value:e};case "hex":if(typeof e!="string"||!e.startsWith("\\x"))throw new C(`Expected a hex-encoded byte array in column '${t}', got ${typeof e}: ${e}`);return {$type:"Bytes",value:Buffer.from(e.slice(2),"hex").toString("base64")};case "array":if(Array.isArray(e))return {$type:"Bytes",value:Buffer.from(e).toString("base64")};if(e instanceof Uint8Array)return {$type:"Bytes",value:Buffer.from(e).toString("base64")};throw new C(`Expected a byte array in column '${t}', got ${typeof e}: ${e}`);default:S(r.encoding,`DataMapper: Unknown bytes encoding: ${r.encoding}`);}break}case "enum":{let i=n[r.name];if(i===void 0)throw new C(`Unknown enum '${r.name}'`);let o=i[`${e}`];if(o===void 0)throw new C(`Value '${e}' not found in enum '${r.name}'`);return o}default:S(r,`DataMapper: Unknown result type: ${r.type}`);}}var Tp=/\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[+-]\d{2}(:?\d{2})?)?$/;function Sp(e){let t=Tp.exec(e);if(t===null)return `${e}T00:00:00Z`;let r=e,[n,i,o]=t;if(i!==void 0&&i!=="Z"&&o===void 0?r=`${e}:00`:i===void 0&&(r=`${e}Z`),n.length===e.length)return `1970-01-01T${r}`;let s=t.index-1;return r[s]===" "&&(r=`${r.slice(0,s)}T${r.slice(s+1)}`),r}function J(e){if(typeof e!="object")return e;var t,r,n=Object.prototype.toString.call(e);if(n==="[object Object]"){if(e.constructor!==Object&&typeof e.constructor=="function"){r=new e.constructor;for(t in e)e.hasOwnProperty(t)&&r[t]!==e[t]&&(r[t]=J(e[t]));}else {r={};for(t in e)t==="__proto__"?Object.defineProperty(r,t,{value:J(e[t]),configurable:true,enumerable:true,writable:true}):r[t]=J(e[t]);}return r}if(n==="[object Array]"){for(t=e.length,r=Array(t);t--;)r[t]=J(e[t]);return r}return n==="[object Set]"?(r=new Set,e.forEach(function(i){r.add(J(i));}),r):n==="[object Map]"?(r=new Map,e.forEach(function(i,o){r.set(J(o),J(i));}),r):n==="[object Date]"?new Date(+e):n==="[object RegExp]"?(r=new RegExp(e.source,e.flags),r.lastIndex=e.lastIndex,r):n==="[object DataView]"?new e.constructor(J(e.buffer)):n==="[object ArrayBuffer]"?e.slice(0):n.slice(-6)==="Array]"?new e.constructor(e):e}function vp(e){let t=Object.entries(e);return t.length===0?"":(t.sort(([n],[i])=>n.localeCompare(i)),`/*${t.map(([n,i])=>{let o=encodeURIComponent(n),s=encodeURIComponent(i).replace(/'/g,"\\'");return `${o}='${s}'`}).join(",")}*/`)}function br(e,t){let r={};for(let n of e){let i=n(J(t));for(let[o,s]of Object.entries(i))s!==void 0&&(r[o]=s);}return r}function ys(e,t){let r=br(e,t);return vp(r)}function hs(e,t){return t?`${e} ${t}`:e}var kt;(function(e){e[e.INTERNAL=0]="INTERNAL",e[e.SERVER=1]="SERVER",e[e.CLIENT=2]="CLIENT",e[e.PRODUCER=3]="PRODUCER",e[e.CONSUMER=4]="CONSUMER";})(kt||(kt={}));function Ap(e){switch(e){case "postgresql":case "postgres":case "prisma+postgres":return "postgresql";case "sqlserver":return "mssql";case "mysql":case "sqlite":case "cockroachdb":case "mongodb":return e;default:S(e,`Unknown provider: ${e}`);}}async function xr({query:e,tracingHelper:t,provider:r,onQuery:n,execute:i}){let o=n===void 0?i:async()=>{let s=new Date,a=performance.now(),l=await i(),u=performance.now();return n({timestamp:s,duration:u-a,query:e.sql,params:e.args}),l};return t.isEnabled()?await t.runInChildSpan({name:"db_query",kind:kt.CLIENT,attributes:{"db.query.text":e.sql,"db.system.name":Ap(r)}},o):o()}function Te(e,t){var r="000000000"+e;return r.substr(r.length-t)}var ws=B(require$$6,1);function Cp(){try{return ws.default.hostname()}catch{return process.env._CLUSTER_NETWORK_NAME_||process.env.COMPUTERNAME||"hostname"}}var bs=2,Rp=Te(process.pid.toString(36),bs),xs=Cp(),kp=xs.length,Ip=Te(xs.split("").reduce(function(e,t){return +e+t.charCodeAt(0)},+kp+36).toString(36),bs);function vn(){return Rp+Ip}function Pr(e){return typeof e=="string"&&/^c[a-z0-9]{20,32}$/.test(e)}function An(e){let n=Math.pow(36,4),i=0;function o(){return Te((Math.random()*n<<0).toString(36),4)}function s(){return i=i<n?i:0,i++,i-1}function a(){var l="c",u=new Date().getTime().toString(36),c=Te(s().toString(36),4),p=e(),d=o()+o();return l+u+c+p+d}return a.fingerprint=e,a.isCuid=Pr,a}var Op=An(vn);var Ps=Op;var wa=B(pa());var Fn=require$$0;var da="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var hd=128,ve,Ye;function wd(e){!ve||ve.length<e?(ve=Buffer.allocUnsafe(e*hd),Fn.webcrypto.getRandomValues(ve),Ye=0):Ye+e>ve.length&&(Fn.webcrypto.getRandomValues(ve),Ye=0),Ye+=e;}function _n(e=21){wd(e|=0);let t="";for(let r=Ye-e;r<Ye;r++)t+=da[ve[r]&63];return t}var Ft=B(require$$0,1);var fa="0123456789ABCDEFGHJKMNPQRSTVWXYZ",_t=32;var bd=16,ga=10,ma=0xffffffffffff;var Ae;(function(e){e.Base32IncorrectEncoding="B32_ENC_INVALID",e.DecodeTimeInvalidCharacter="DEC_TIME_CHAR",e.DecodeTimeValueMalformed="DEC_TIME_MALFORMED",e.EncodeTimeNegative="ENC_TIME_NEG",e.EncodeTimeSizeExceeded="ENC_TIME_SIZE_EXCEED",e.EncodeTimeValueMalformed="ENC_TIME_MALFORMED",e.PRNGDetectFailure="PRNG_DETECT",e.ULIDInvalid="ULID_INVALID",e.Unexpected="UNEXPECTED",e.UUIDInvalid="UUID_INVALID";})(Ae||(Ae={}));var Ce=class extends Error{constructor(t,r){super(`${r} (${t})`),this.name="ULIDError",this.code=t;}};function xd(e){let t=Math.floor(e()*_t);return t===_t&&(t=_t-1),fa.charAt(t)}function Pd(e){let t=Ed(),r=t&&(t.crypto||t.msCrypto)||(typeof Ft.default<"u"?Ft.default:null);if(typeof r?.getRandomValues=="function")return ()=>{let n=new Uint8Array(1);return r.getRandomValues(n),n[0]/255};if(typeof r?.randomBytes=="function")return ()=>r.randomBytes(1).readUInt8()/255;if(Ft.default?.randomBytes)return ()=>Ft.default.randomBytes(1).readUInt8()/255;throw new Ce(Ae.PRNGDetectFailure,"Failed to find a reliable PRNG")}function Ed(){return vd()?self:typeof commonjsGlobal<"u"?commonjsGlobal:typeof globalThis<"u"?globalThis:null}function Td(e,t){let r="";for(;e>0;e--)r=xd(t)+r;return r}function Sd(e,t=ga){if(isNaN(e))throw new Ce(Ae.EncodeTimeValueMalformed,`Time must be a number: ${e}`);if(e>ma)throw new Ce(Ae.EncodeTimeSizeExceeded,`Cannot encode a time larger than ${ma}: ${e}`);if(e<0)throw new Ce(Ae.EncodeTimeNegative,`Time must be positive: ${e}`);if(Number.isInteger(e)===false)throw new Ce(Ae.EncodeTimeValueMalformed,`Time must be an integer: ${e}`);let r,n="";for(let i=t;i>0;i--)r=e%_t,n=fa.charAt(r)+n,e=(e-r)/_t;return n}function vd(){return typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope}function ya(e,t){let r=Pd(),n=Date.now();return Sd(n,ga)+Td(bd,r)}var D=[];for(let e=0;e<256;++e)D.push((e+256).toString(16).slice(1));function vr(e,t=0){return (D[e[t+0]]+D[e[t+1]]+D[e[t+2]]+D[e[t+3]]+"-"+D[e[t+4]]+D[e[t+5]]+"-"+D[e[t+6]]+D[e[t+7]]+"-"+D[e[t+8]]+D[e[t+9]]+"-"+D[e[t+10]]+D[e[t+11]]+D[e[t+12]]+D[e[t+13]]+D[e[t+14]]+D[e[t+15]]).toLowerCase()}var Ad=new Uint8Array(16);function Xe(){return crypto.getRandomValues(Ad)}function Cd(e,t,r){return !t&&!e&&crypto.randomUUID?crypto.randomUUID():Rd(e,t,r)}function Rd(e,t,r){e=e||{};let n=e.random??e.rng?.()??Xe();if(n.length<16)throw new Error("Random bytes length must be >= 16");if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){if(r=r||0,r<0||r+16>t.length)throw new RangeError(`UUID byte range ${r}:${r+15} is out of buffer bounds`);for(let i=0;i<16;++i)t[r+i]=n[i];return t}return vr(n)}var $n=Cd;var Ln={};function kd(e,t,r){let n;if(e)n=ha(e.random??e.rng?.()??Xe(),e.msecs,e.seq,t,r);else {let i=Date.now(),o=Xe();Id(Ln,i,o),n=ha(o,Ln.msecs,Ln.seq,t,r);}return t??vr(n)}function Id(e,t,r){return e.msecs??=-1/0,e.seq??=0,t>e.msecs?(e.seq=r[6]<<23|r[7]<<16|r[8]<<8|r[9],e.msecs=t):(e.seq=e.seq+1|0,e.seq===0&&e.msecs++),e}function ha(e,t,r,n,i=0){if(e.length<16)throw new Error("Random bytes length must be >= 16");if(!n)n=new Uint8Array(16),i=0;else if(i<0||i+16>n.length)throw new RangeError(`UUID byte range ${i}:${i+15} is out of buffer bounds`);return t??=Date.now(),r??=e[6]*127<<24|e[7]<<16|e[8]<<8|e[9],n[i++]=t/1099511627776&255,n[i++]=t/4294967296&255,n[i++]=t/16777216&255,n[i++]=t/65536&255,n[i++]=t/256&255,n[i++]=t&255,n[i++]=112|r>>>28&15,n[i++]=r>>>20&255,n[i++]=128|r>>>14&63,n[i++]=r>>>6&255,n[i++]=r<<2&255|e[10]&3,n[i++]=e[11],n[i++]=e[12],n[i++]=e[13],n[i++]=e[14],n[i++]=e[15],n}var Vn=kd;var Ar=class{#e={};constructor(){this.register("uuid",new jn),this.register("cuid",new Un),this.register("ulid",new Bn),this.register("nanoid",new Qn),this.register("product",new Jn);}snapshot(){return Object.create(this.#e,{now:{value:new qn}})}register(t,r){this.#e[t]=r;}},qn=class{#e;generate(){return this.#e===void 0&&(this.#e=new Date),this.#e.toISOString()}},jn=class{generate(t){if(t===4)return $n();if(t===7)return Vn();throw new Error("Invalid UUID generator arguments")}},Un=class{generate(t){if(t===1)return Ps();if(t===2)return (0, wa.createId)();throw new Error("Invalid CUID generator arguments")}},Bn=class{generate(){return ya()}},Qn=class{generate(t){if(typeof t=="number")return _n(t);if(t===void 0)return _n();throw new Error("Invalid Nanoid generator arguments")}},Jn=class{generate(t,r){if(t===void 0||r===void 0)throw new Error("Invalid Product generator arguments");return Array.isArray(t)&&Array.isArray(r)?t.flatMap(n=>r.map(i=>[n,i])):Array.isArray(t)?t.map(n=>[n,r]):Array.isArray(r)?r.map(n=>[t,n]):[[t,r]]}};function Cr(e,t){return e==null?e:typeof e=="string"?Cr(JSON.parse(e),t):Array.isArray(e)?Nd(e,t):Od(e,t)}function Od(e,t){if(t.pagination){let{skip:r,take:n,cursor:i}=t.pagination;if(r!==null&&r>0||n===0||i!==null&&!ze(e,i))return null}return xa(e,t.nested)}function xa(e,t){for(let[r,n]of Object.entries(t))e[r]=Cr(e[r],n);return e}function Nd(e,t){if(t.distinct!==null){let r=t.linkingFields!==null?[...t.distinct,...t.linkingFields]:t.distinct;e=Dd(e,r);}return t.pagination&&(e=Md(e,t.pagination,t.linkingFields)),t.reverse&&e.reverse(),Object.keys(t.nested).length===0?e:e.map(r=>xa(r,t.nested))}function Dd(e,t){let r=new Set,n=[];for(let i of e){let o=et(i,t);r.has(o)||(r.add(o),n.push(i));}return n}function Md(e,t,r){if(r===null)return ba(e,t);let n=new Map;for(let o of e){let s=et(o,r);n.has(s)||n.set(s,[]),n.get(s).push(o);}let i=Array.from(n.entries());return i.sort(([o],[s])=>o<s?-1:o>s?1:0),i.flatMap(([,o])=>ba(o,t))}function ba(e,{cursor:t,skip:r,take:n}){let i=t!==null?e.findIndex(a=>ze(a,t)):0;if(i===-1)return [];let o=i+(r??0),s=n!==null?o+n:e.length;return e.slice(o,s)}function et(e,t,r){let n=t.map((i,o)=>r?.[o]?e[i]!==null?r[o](e[i]):null:e[i]);return JSON.stringify(n)}function Hn(e){return typeof e=="object"&&e!==null&&e.prisma__type==="param"}function Gn(e){return typeof e=="object"&&e!==null&&e.prisma__type==="generatorCall"}function Kn(e,t,r,n){let i=e.args.map(o=>H(o,t,r));switch(e.type){case "rawSql":return [$d(e.sql,i,e.argTypes)];case "templateSql":return (e.chunkable?Vd(e.fragments,i,n):[i]).map(s=>{let a=Fd(e.fragments,e.placeholderFormat,s,e.argTypes);if(n!==void 0&&a.args.length>n)throw new O("The query parameter limit supported by your database is exceeded.","P2029");return a});default:S(e.type,"Invalid query type");}}function H(e,t,r){for(;Ld(e);)if(Hn(e)){let n=t[e.prisma__value.name];if(n===void 0)throw new Error(`Missing value for query variable ${e.prisma__value.name}`);e.prisma__value.type==="DateTime"&&typeof n=="string"?e=new Date(n):e=n;}else if(Gn(e)){let{name:n,args:i}=e.prisma__value,o=r[n];if(!o)throw new Error(`Encountered an unknown generator '${n}'`);e=o.generate(...i.map(s=>H(s,t,r)));}else S(e,`Unexpected unevaluated value type: ${e}`);return Array.isArray(e)&&(e=e.map(n=>H(n,t,r))),e}function Fd(e,t,r,n){let i="",o={placeholderNumber:1},s=[],a=[];for(let l of Wn(e,r,n)){if(i+=_d(l,t,o),l.type==="stringChunk")continue;let u=s.length,c=s.push(...Pa(l))-u;if(l.argType.arity==="tuple"){if(c%l.argType.elements.length!==0)throw new Error(`Malformed query template. Expected the number of parameters to match the tuple arity, but got ${c} parameters for a tuple of arity ${l.argType.elements.length}.`);for(let p=0;p<c/l.argType.elements.length;p++)a.push(...l.argType.elements);}else for(let p=0;p<c;p++)a.push(l.argType);}return {sql:i,args:s,argTypes:a}}function _d(e,t,r){let n=e.type;switch(n){case "parameter":return zn(t,r.placeholderNumber++);case "stringChunk":return e.chunk;case "parameterTuple":return `(${e.value.length==0?"NULL":e.value.map(()=>{let o=zn(t,r.placeholderNumber++);return `${e.itemPrefix}${o}${e.itemSuffix}`}).join(e.itemSeparator)})`;case "parameterTupleList":return e.value.map(i=>{let o=i.map(()=>zn(t,r.placeholderNumber++)).join(e.itemSeparator);return `${e.itemPrefix}${o}${e.itemSuffix}`}).join(e.groupSeparator);default:S(n,"Invalid fragment type");}}function zn(e,t){return e.hasNumbering?`${e.prefix}${t}`:e.prefix}function $d(e,t,r){return {sql:e,args:t,argTypes:r}}function Ld(e){return Hn(e)||Gn(e)}function*Wn(e,t,r){let n=0;for(let i of e)switch(i.type){case "parameter":{if(n>=t.length)throw new Error(`Malformed query template. Fragments attempt to read over ${t.length} parameters.`);yield {...i,value:t[n],argType:r?.[n]},n++;break}case "stringChunk":{yield i;break}case "parameterTuple":{if(n>=t.length)throw new Error(`Malformed query template. Fragments attempt to read over ${t.length} parameters.`);let o=t[n];yield {...i,value:Array.isArray(o)?o:[o],argType:r?.[n]},n++;break}case "parameterTupleList":{if(n>=t.length)throw new Error(`Malformed query template. Fragments attempt to read over ${t.length} parameters.`);let o=t[n];if(!Array.isArray(o))throw new Error("Malformed query template. Tuple list expected.");if(o.length===0)throw new Error("Malformed query template. Tuple list cannot be empty.");for(let s of o)if(!Array.isArray(s))throw new Error("Malformed query template. Tuple expected.");yield {...i,value:o,argType:r?.[n]},n++;break}}}function*Pa(e){switch(e.type){case "parameter":yield e.value;break;case "stringChunk":break;case "parameterTuple":yield*e.value;break;case "parameterTupleList":for(let t of e.value)yield*t;break}}function Vd(e,t,r){let n=0,i=0;for(let s of Wn(e,t,void 0)){let a=0;for(let l of Pa(s))a++;i=Math.max(i,a),n+=a;}let o=[[]];for(let s of Wn(e,t,void 0))switch(s.type){case "parameter":{for(let a of o)a.push(s.value);break}case "stringChunk":break;case "parameterTuple":{let a=s.value.length,l=[];if(r&&o.length===1&&a===i&&n>r&&n-a<r){let u=r-(n-a);l=qd(s.value,u);}else l=[s.value];o=o.flatMap(u=>l.map(c=>[...u,c]));break}case "parameterTupleList":{let a=s.value.reduce((p,d)=>p+d.length,0),l=[],u=[],c=0;for(let p of s.value)r&&o.length===1&&a===i&&u.length>0&&n-a+c+p.length>r&&(l.push(u),u=[],c=0),u.push(p),c+=p.length;u.length>0&&l.push(u),o=o.flatMap(p=>l.map(d=>[...p,d]));break}}return o}function qd(e,t){let r=[];for(let n=0;n<e.length;n+=t)r.push(e.slice(n,n+t));return r}function Ea(e){return e.rows.map(t=>t.reduce((r,n,i)=>(r[e.columnNames[i]]=n,r),{}))}function Ta(e){return {columns:e.columnNames,types:e.columnTypes.map(t=>jd(t)),rows:e.rows.map(t=>t.map((r,n)=>$t(r,e.columnTypes[n])))}}function $t(e,t){if(e===null)return null;switch(t){case f.Int32:switch(typeof e){case "number":return Math.trunc(e);case "string":return Math.trunc(Number(e));default:throw new Error(`Cannot serialize value of type ${typeof e} as Int32`)}case f.Int32Array:if(!Array.isArray(e))throw new Error(`Cannot serialize value of type ${typeof e} as Int32Array`);return e.map(r=>$t(r,f.Int32));case f.Int64:switch(typeof e){case "number":return BigInt(Math.trunc(e));case "string":return e;default:throw new Error(`Cannot serialize value of type ${typeof e} as Int64`)}case f.Int64Array:if(!Array.isArray(e))throw new Error(`Cannot serialize value of type ${typeof e} as Int64Array`);return e.map(r=>$t(r,f.Int64));case f.Json:switch(typeof e){case "string":return JSON.parse(e);default:throw new Error(`Cannot serialize value of type ${typeof e} as Json`)}case f.JsonArray:if(!Array.isArray(e))throw new Error(`Cannot serialize value of type ${typeof e} as JsonArray`);return e.map(r=>$t(r,f.Json));case f.Boolean:switch(typeof e){case "boolean":return e;case "string":return e==="true"||e==="1";case "number":return e===1;default:throw new Error(`Cannot serialize value of type ${typeof e} as Boolean`)}case f.BooleanArray:if(!Array.isArray(e))throw new Error(`Cannot serialize value of type ${typeof e} as BooleanArray`);return e.map(r=>$t(r,f.Boolean));default:return e}}function jd(e){switch(e){case f.Int32:return "int";case f.Int64:return "bigint";case f.Float:return "float";case f.Double:return "double";case f.Text:return "string";case f.Enum:return "enum";case f.Bytes:return "bytes";case f.Boolean:return "bool";case f.Character:return "char";case f.Numeric:return "decimal";case f.Json:return "json";case f.Uuid:return "uuid";case f.DateTime:return "datetime";case f.Date:return "date";case f.Time:return "time";case f.Int32Array:return "int-array";case f.Int64Array:return "bigint-array";case f.FloatArray:return "float-array";case f.DoubleArray:return "double-array";case f.TextArray:return "string-array";case f.EnumArray:return "string-array";case f.BytesArray:return "bytes-array";case f.BooleanArray:return "bool-array";case f.CharacterArray:return "char-array";case f.NumericArray:return "decimal-array";case f.JsonArray:return "json-array";case f.UuidArray:return "uuid-array";case f.DateTimeArray:return "datetime-array";case f.DateArray:return "date-array";case f.TimeArray:return "time-array";case f.UnknownNumber:return "unknown";case f.Set:return "string";default:S(e,`Unexpected column type: ${e}`);}}function Sa(e,t,r){if(!t.every(n=>Zn(e,n))){let n=Ud(e,r),i=Bd(r);throw new O(n,i,r.context)}}function Zn(e,t){switch(t.type){case "rowCountEq":return Array.isArray(e)?e.length===t.args:e===null?t.args===0:t.args===1;case "rowCountNeq":return Array.isArray(e)?e.length!==t.args:e===null?t.args!==0:t.args!==1;case "affectedRowCountEq":return e===t.args;case "never":return  false;default:S(t,`Unknown rule type: ${t.type}`);}}function Ud(e,t){switch(t.errorIdentifier){case "RELATION_VIOLATION":return `The change you are trying to make would violate the required relation '${t.context.relation}' between the \`${t.context.modelA}\` and \`${t.context.modelB}\` models.`;case "MISSING_RECORD":return `An operation failed because it depends on one or more records that were required but not found. No record was found for ${t.context.operation}.`;case "MISSING_RELATED_RECORD":{let r=t.context.neededFor?` (needed to ${t.context.neededFor})`:"";return `An operation failed because it depends on one or more records that were required but not found. No '${t.context.model}' record${r} was found for ${t.context.operation} on ${t.context.relationType} relation '${t.context.relation}'.`}case "INCOMPLETE_CONNECT_INPUT":return `An operation failed because it depends on one or more records that were required but not found. Expected ${t.context.expectedRows} records to be connected, found only ${Array.isArray(e)?e.length:e}.`;case "INCOMPLETE_CONNECT_OUTPUT":return `The required connected records were not found. Expected ${t.context.expectedRows} records to be connected after connect operation on ${t.context.relationType} relation '${t.context.relation}', found ${Array.isArray(e)?e.length:e}.`;case "RECORDS_NOT_CONNECTED":return `The records for relation \`${t.context.relation}\` between the \`${t.context.parent}\` and \`${t.context.child}\` models are not connected.`;default:S(t,`Unknown error identifier: ${t}`);}}function Bd(e){switch(e.errorIdentifier){case "RELATION_VIOLATION":return "P2014";case "RECORDS_NOT_CONNECTED":return "P2017";case "INCOMPLETE_CONNECT_OUTPUT":return "P2018";case "MISSING_RECORD":case "MISSING_RELATED_RECORD":case "INCOMPLETE_CONNECT_INPUT":return "P2025";default:S(e,`Unknown error identifier: ${e}`);}}var Lt=class e{#e;#t=new Ar;#r;#n;#i;#o;#s;constructor({onQuery:t,tracingHelper:r,serializer:n,rawSerializer:i,provider:o,connectionInfo:s}){this.#e=t,this.#r=r,this.#n=n,this.#i=i??n,this.#o=o,this.#s=s;}static forSql(t){return new e({onQuery:t.onQuery,tracingHelper:t.tracingHelper,serializer:Ea,rawSerializer:Ta,provider:t.provider,connectionInfo:t.connectionInfo})}async run(t,r){let{value:n}=await this.interpretNode(t,{...r,generators:this.#t.snapshot()}).catch(i=>We(i));return n}async interpretNode(t,r){switch(t.type){case "value":return {value:H(t.args,r.scope,r.generators)};case "seq":{let n;for(let i of t.args)n=await this.interpretNode(i,r);return n??{value:void 0}}case "get":return {value:r.scope[t.args.name]};case "let":{let n=Object.create(r.scope);for(let i of t.args.bindings){let{value:o}=await this.interpretNode(i.expr,{...r,scope:n});n[i.name]=o;}return this.interpretNode(t.args.expr,{...r,scope:n})}case "getFirstNonEmpty":{for(let n of t.args.names){let i=r.scope[n];if(!va(i))return {value:i}}return {value:[]}}case "concat":{let n=await Promise.all(t.args.map(i=>this.interpretNode(i,r).then(o=>o.value)));return {value:n.length>0?n.reduce((i,o)=>i.concat(Yn(o)),[]):[]}}case "sum":{let n=await Promise.all(t.args.map(i=>this.interpretNode(i,r).then(o=>o.value)));return {value:n.length>0?n.reduce((i,o)=>te(i)+te(o)):0}}case "execute":{let n=Kn(t.args,r.scope,r.generators,this.#a()),i=0;for(let o of n){let s=Aa(o,r.sqlCommenter);i+=await this.#u(s,r.queryable,()=>r.queryable.executeRaw(Xn(s)).catch(a=>t.args.type==="rawSql"?En(a):We(a)));}return {value:i}}case "query":{let n=Kn(t.args,r.scope,r.generators,this.#a()),i;for(let o of n){let s=Aa(o,r.sqlCommenter),a=await this.#u(s,r.queryable,()=>r.queryable.queryRaw(Xn(s)).catch(l=>t.args.type==="rawSql"?En(l):We(l)));i===void 0?i=a:(i.rows.push(...a.rows),i.lastInsertId=a.lastInsertId);}return {value:t.args.type==="rawSql"?this.#i(i):this.#n(i),lastInsertId:i?.lastInsertId}}case "reverse":{let{value:n,lastInsertId:i}=await this.interpretNode(t.args,r);return {value:Array.isArray(n)?n.reverse():n,lastInsertId:i}}case "unique":{let{value:n,lastInsertId:i}=await this.interpretNode(t.args,r);if(!Array.isArray(n))return {value:n,lastInsertId:i};if(n.length>1)throw new Error(`Expected zero or one element, got ${n.length}`);return {value:n[0]??null,lastInsertId:i}}case "required":{let{value:n,lastInsertId:i}=await this.interpretNode(t.args,r);if(va(n))throw new Error("Required value is empty");return {value:n,lastInsertId:i}}case "mapField":{let{value:n,lastInsertId:i}=await this.interpretNode(t.args.records,r);return {value:Ca(n,t.args.field),lastInsertId:i}}case "join":{let{value:n,lastInsertId:i}=await this.interpretNode(t.args.parent,r);if(n===null)return {value:null,lastInsertId:i};let o=await Promise.all(t.args.children.map(async s=>({joinExpr:s,childRecords:(await this.interpretNode(s.child,r)).value})));return {value:Qd(n,o,t.args.canAssumeStrictEquality),lastInsertId:i}}case "transaction":{if(!r.transactionManager.enabled)return this.interpretNode(t.args,r);let n=r.transactionManager.manager,i=await n.startInternalTransaction(),o=await n.getTransaction(i,"query");try{let s=await this.interpretNode(t.args,{...r,queryable:o});return await n.commitTransaction(i.id),s}catch(s){throw await n.rollbackTransaction(i.id),s}}case "dataMap":{let{value:n,lastInsertId:i}=await this.interpretNode(t.args.expr,r);return {value:gs(n,t.args.structure,t.args.enums),lastInsertId:i}}case "validate":{let{value:n,lastInsertId:i}=await this.interpretNode(t.args.expr,r);return Sa(n,t.args.rules,t.args),{value:n,lastInsertId:i}}case "if":{let{value:n}=await this.interpretNode(t.args.value,r);return Zn(n,t.args.rule)?await this.interpretNode(t.args.then,r):await this.interpretNode(t.args.else,r)}case "unit":return {value:void 0};case "diff":{let{value:n}=await this.interpretNode(t.args.from,r),{value:i}=await this.interpretNode(t.args.to,r),o=a=>a!==null?et(Vt(a),t.args.fields):null,s=new Set(Yn(i).map(o));return {value:Yn(n).filter(a=>!s.has(o(a)))}}case "process":{let{value:n,lastInsertId:i}=await this.interpretNode(t.args.expr,r),o=Xn(t.args.operations);return Ra(o,r.scope,r.generators),{value:Cr(n,o),lastInsertId:i}}case "initializeRecord":{let{lastInsertId:n}=await this.interpretNode(t.args.expr,r),i={};for(let[o,s]of Object.entries(t.args.fields))i[o]=Hd(s,n,r.scope,r.generators);return {value:i,lastInsertId:n}}case "mapRecord":{let{value:n,lastInsertId:i}=await this.interpretNode(t.args.expr,r),o=n===null?{}:Vt(n);for(let[s,a]of Object.entries(t.args.fields))o[s]=Gd(a,o[s],r.scope,r.generators);return {value:o,lastInsertId:i}}default:S(t,`Unexpected node type: ${t.type}`);}}#a(){return this.#s?.maxBindValues!==void 0?this.#s.maxBindValues:this.#l()}#l(){if(this.#o!==void 0)switch(this.#o){case "cockroachdb":case "postgres":case "postgresql":case "prisma+postgres":return 32766;case "mysql":return 65535;case "sqlite":return 999;case "sqlserver":return 2098;case "mongodb":return;default:S(this.#o,`Unexpected provider: ${this.#o}`);}}#u(t,r,n){return xr({query:t,execute:n,provider:this.#o??r.provider,tracingHelper:this.#r,onQuery:this.#e})}};function va(e){return Array.isArray(e)?e.length===0:e==null}function Yn(e){return Array.isArray(e)?e:[e]}function te(e){if(typeof e=="number")return e;if(typeof e=="string")return Number(e);throw new Error(`Expected number, got ${typeof e}`)}function Vt(e){if(typeof e=="object"&&e!==null)return e;throw new Error(`Expected object, got ${typeof e}`)}function Ca(e,t){return Array.isArray(e)?e.map(r=>Ca(r,t)):typeof e=="object"&&e!==null?e[t]??null:e}function Qd(e,t,r){for(let{joinExpr:n,childRecords:i}of t){let o=n.on.map(([c])=>c),s=n.on.map(([,c])=>c),a={},l=Array.isArray(e)?e:[e];for(let c of l){let p=Vt(c),d=et(p,o);a[d]||(a[d]=[]),a[d].push(p),n.isRelationUnique?p[n.parentField]=null:p[n.parentField]=[];}let u=r?void 0:Jd(l,o);for(let c of Array.isArray(i)?i:[i]){if(c===null)continue;let p=et(Vt(c),s,u);for(let d of a[p]??[])n.isRelationUnique?d[n.parentField]=c:d[n.parentField].push(c);}}return e}function Jd(e,t){function r(o){switch(o){case "number":return Number;case "string":return String;case "boolean":return Boolean;case "bigint":return BigInt;default:return}}let n=Array.from({length:t.length}),i=0;for(let o of e){let s=Vt(o);for(let[a,l]of t.entries())if(s[l]!==null&&n[a]===void 0){let u=r(typeof s[l]);u!==void 0&&(n[a]=u),i++;}if(i===t.length)break}return n}function Hd(e,t,r,n){switch(e.type){case "value":return H(e.value,r,n);case "lastInsertId":return t;default:S(e,`Unexpected field initializer type: ${e.type}`);}}function Gd(e,t,r,n){switch(e.type){case "set":return H(e.value,r,n);case "add":return te(t)+te(H(e.value,r,n));case "subtract":return te(t)-te(H(e.value,r,n));case "multiply":return te(t)*te(H(e.value,r,n));case "divide":{let i=te(t),o=te(H(e.value,r,n));return o===0?null:i/o}default:S(e,`Unexpected field operation type: ${e.type}`);}}function Aa(e,t){if(!t||t.plugins.length===0)return e;let r=ys(t.plugins,{query:t.queryInfo,sql:e.sql});return r?{...e,sql:hs(e.sql,r)}:e}function Ra(e,t,r){let n=e.pagination?.cursor;if(n)for(let[i,o]of Object.entries(n))n[i]=H(o,t,r);for(let i of Object.values(e.nested))Ra(i,t,r);}function Xn(e){return J(e)}function ka(e){return new ei(e).deserialize()}function zd(e){return Buffer.from(e,"base64url")}var ei=class{#e;#t;#r=0;constructor(t){this.#e=t;let r=zd(t.graph);this.#t=new DataView(r.buffer,r.byteOffset,r.byteLength);}deserialize(){let{inputNodeCount:t,outputNodeCount:r,rootCount:n}=this.#a(),i=this.#l(t),o=this.#u(r),s=this.#p(n);return {strings:this.#e.strings,inputNodes:i,outputNodes:o,roots:s}}#n(){let t=0,r=0,n;do n=this.#t.getUint8(this.#r++),t|=(n&127)<<r,r+=7;while(n>=128);return t}#i(){let t=this.#n();return t===0?void 0:t-1}#o(){let t=this.#t.getUint8(this.#r);return this.#r+=1,t}#s(){let t=this.#t.getUint16(this.#r,true);return this.#r+=2,t}#a(){let t=this.#n(),r=this.#n(),n=this.#n();return {inputNodeCount:t,outputNodeCount:r,rootCount:n}}#l(t){let r=[];for(let n=0;n<t;n++){let i=this.#n(),o={};for(let s=0;s<i;s++){let a=this.#n(),l=this.#s(),u=this.#i(),c=this.#i(),d={flags:this.#o()};l!==0&&(d.scalarMask=l),u!==void 0&&(d.childNodeId=u),c!==void 0&&(d.enumNameIndex=c),o[a]=d;}r.push({edges:o});}return r}#u(t){let r=[];for(let n=0;n<t;n++){let i=this.#n(),o={};for(let s=0;s<i;s++){let a=this.#n(),l=this.#i(),u=this.#i(),c={};l!==void 0&&(c.argsNodeId=l),u!==void 0&&(c.outputNodeId=u),o[a]=c;}r.push({edges:o});}return r}#p(t){let r={};for(let n=0;n<t;n++){let i=this.#n(),o=this.#i(),s=this.#i(),a=this.#e.strings[i],l={};o!==void 0&&(l.argsNodeId=o),s!==void 0&&(l.outputNodeId=s),r[a]=l;}return r}};var qt=class e{#e;#t;#r;constructor(t,r){this.#e=t,this.#r=r,this.#t=new Map;for(let n=0;n<t.strings.length;n++)this.#t.set(t.strings[n],n);}static deserialize(t,r){let n=ka(t);return new e(n,r)}static fromData(t,r){return new e(t,r)}root(t){let r=this.#e.roots[t];if(r)return {argsNodeId:r.argsNodeId,outputNodeId:r.outputNodeId}}inputNode(t){if(!(t===void 0||t<0||t>=this.#e.inputNodes.length))return {id:t}}outputNode(t){if(!(t===void 0||t<0||t>=this.#e.outputNodes.length))return {id:t}}inputEdge(t,r){if(!t)return;let n=this.#e.inputNodes[t.id];if(!n)return;let i=this.#t.get(r);if(i===void 0)return;let o=n.edges[i];if(o)return {flags:o.flags,childNodeId:o.childNodeId,scalarMask:o.scalarMask??0,enumNameIndex:o.enumNameIndex}}outputEdge(t,r){if(!t)return;let n=this.#e.outputNodes[t.id];if(!n)return;let i=this.#t.get(r);if(i===void 0)return;let o=n.edges[i];if(o)return {argsNodeId:o.argsNodeId,outputNodeId:o.outputNodeId}}enumValues(t){if(t?.enumNameIndex===void 0)return;let r=this.#e.strings[t.enumNameIndex];if(r)return this.#r(r)}getString(t){return this.#e.strings[t]}},re={ParamScalar:1,ParamEnum:2,ParamListScalar:4,ListObject:16,Object:32},M={String:1,Int:2,BigInt:4,Float:8,Decimal:16,Boolean:32,DateTime:64,Json:128,Bytes:256};function ne(e,t){return (e.flags&t)!==0}function we(e){return e.scalarMask}var Wd=new Set(["DateTime","Decimal","BigInt","Bytes","Json","Raw"]);function Rr(e){if(e==null)return {kind:"null"};if(typeof e=="string")return {kind:"primitive",value:e};if(typeof e=="number")return {kind:"primitive",value:e};if(typeof e=="boolean")return {kind:"primitive",value:e};if(Array.isArray(e))return {kind:"array",items:e};if(typeof e=="object"){let t=e;if("$type"in t&&typeof t.$type=="string"){let r=t.$type;return Wd.has(r)?{kind:"taggedScalar",tag:r,value:t.value}:{kind:"structural",value:t.value}}return {kind:"object",entries:t}}return {kind:"structural",value:e}}function Ia(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)&&!("$type"in e)}function Oa(e){return typeof e=="object"&&e!==null&&"$type"in e&&typeof e.$type=="string"}function ti(e,t){let r=new kr(t),n=e.modelName?`${e.modelName}.${e.action}`:e.action,i=t.root(n);return {parameterizedQuery:{...e,query:r.parameterizeFieldSelection(e.query,i?.argsNodeId,i?.outputNodeId)},placeholderValues:r.getPlaceholderValues()}}function ri(e,t){let r=new kr(t),n=[];for(let i=0;i<e.batch.length;i++){let o=e.batch[i],s=o.modelName?`${o.modelName}.${o.action}`:o.action,a=t.root(s);n.push({...o,query:r.parameterizeFieldSelection(o.query,a?.argsNodeId,a?.outputNodeId)});}return {parameterizedBatch:{...e,batch:n},placeholderValues:r.getPlaceholderValues()}}var kr=class{#e;#t=new Map;#r=new Map;#n=1;constructor(t){this.#e=t;}getPlaceholderValues(){return Object.fromEntries(this.#t)}#i(t,r){let n=Zd(t,r),i=this.#r.get(n);if(i!==void 0)return Na(i,r);let o=`%${this.#n++}`;return this.#r.set(n,o),this.#t.set(o,t),Na(o,r)}parameterizeFieldSelection(t,r,n){let i=this.#e.inputNode(r),o=this.#e.outputNode(n),s={...t};return t.arguments&&t.arguments.$type!=="Raw"&&(s.arguments=this.#o(t.arguments,i)),t.selection&&(s.selection=this.#c(t.selection,o)),s}#o(t,r){if(!r)return t;let n={};for(let[i,o]of Object.entries(t)){let s=this.#e.inputEdge(r,i);s?n[i]=this.#s(o,s):n[i]=o;}return n}#s(t,r){let n=Rr(t);switch(n.kind){case "null":return t;case "structural":return t;case "primitive":return this.#a(n.value,r);case "taggedScalar":return this.#l(t,n.tag,r);case "array":return this.#u(n.items,t,r);case "object":return this.#p(n.entries,r);default:throw new Error(`Unknown value kind ${n.kind}`)}}#a(t,r){if(ne(r,re.ParamEnum)&&r.enumNameIndex!==void 0&&typeof t=="string"){let o=this.#e.enumValues(r);if(o&&Object.hasOwn(o,t)){let s={type:"Enum"};return this.#i(o[t],s)}}if(!ne(r,re.ParamScalar))return t;let n=we(r);if(n===0)return t;let i=ni(t);return Ma(i,n)?(n&M.Json&&(t=JSON.stringify(t)),this.#i(t,i)):t}#l(t,r,n){if(!ne(n,re.ParamScalar))return t;let i=we(n);if(i===0||!_a$1(r,i))return t;let o=Fa(t.$type),s=$a(t);return this.#i(s,o)}#u(t,r,n){if(ne(n,re.ParamScalar)&&we(n)&M.Json){let i=K(Z(t)),o={type:"Json"};return this.#i(i,o)}if(ne(n,re.ParamEnum)){let i=this.#e.enumValues(n);if(i&&t.every(o=>typeof o=="string"&&Object.hasOwn(i,o))){let o={type:"List",inner:{type:"Enum"}};return this.#i(t,o)}}if(ne(n,re.ParamListScalar)&&t.every(o=>rm(o,n))&&t.length>0){let o=t.map(l=>nm(l)),a={type:"List",inner:em(t)};return this.#i(o,a)}if(ne(n,re.ListObject)){let i=this.#e.inputNode(n.childNodeId);if(i)return t.map(o=>Ia(o)?this.#o(o,i):o)}return r}#p(t,r){if(ne(r,re.Object)){let i=this.#e.inputNode(r.childNodeId);if(i)return this.#o(t,i)}if(we(r)&M.Json){let i=K(Z(t)),o={type:"Json"};return this.#i(i,o)}return t}#c(t,r){if(!t||!r)return t;let n={};for(let[i,o]of Object.entries(t)){if(i==="$scalars"||i==="$composites"||typeof o=="boolean"){n[i]=o;continue}let s=this.#e.outputEdge(r,i);if(s){let a=o,l=this.#e.inputNode(s.argsNodeId),u=this.#e.outputNode(s.outputNodeId),c={selection:a.selection?this.#c(a.selection,u):{}};a.arguments&&(c.arguments=this.#o(a.arguments,l)),n[i]=c;}else n[i]=o;}return n}};function Na(e,t){return {$type:"Param",value:{name:e,...t}}}function Da(e){return e.type==="List"?`List<${Da(e.inner)}>`:e.type}function Kd(e){return ArrayBuffer.isView(e)?Buffer.from(e.buffer,e.byteOffset,e.byteLength).toString("base64"):JSON.stringify(e)}function Zd(e,t){let r=Da(t),n=Kd(e);return `${r}:${n}`}var Yd=2**31-1,Xd=-2147483648;function ni(e){switch(typeof e){case "boolean":return {type:"Boolean"};case "number":return Number.isInteger(e)?Xd<=e&&e<=Yd?{type:"Int"}:{type:"BigInt"}:{type:"Float"};case "string":return {type:"String"};default:throw new Error("unreachable")}}function Ma({type:e},t){switch(e){case "Boolean":return (t&M.Boolean)!==0;case "Int":return (t&(M.Int|M.BigInt|M.Float))!==0;case "BigInt":return (t&M.BigInt)!==0;case "Float":return (t&M.Float)!==0;case "String":return (t&M.String)!==0;default:return  false}}function Fa(e){switch(e){case "BigInt":case "Bytes":case "DateTime":case "Json":return {type:e};case "Decimal":return {type:"Float"};default:return}}function em(e){let t={type:"Any"};for(let r of e){let n=Rr(r),i;switch(n.kind){case "primitive":i=ni(n.value);break;case "taggedScalar":i=Fa(n.tag)??{type:"Any"};break;default:return {type:"Any"}}t=tm(t,i);}return t}function tm(e,t){if(e.type==="Any")return t;if(t.type==="Any"||e.type===t.type)return e;let r={Int:0,BigInt:1,Float:2},n=r[e.type],i=r[t.type];return n!==void 0&&i!==void 0?n>=i?e:t:{type:"Any"}}function _a$1(e,t){switch(e){case "DateTime":return (t&M.DateTime)!==0;case "Decimal":return (t&M.Decimal)!==0;case "BigInt":return (t&M.BigInt)!==0;case "Bytes":return (t&M.Bytes)!==0;case "Json":return (t&M.Json)!==0;default:return  false}}function rm(e,t){let r=Rr(e);switch(r.kind){case "structural":return  false;case "null":return  false;case "primitive":{let n=ni(r.value),i=we(t);return i!==0&&Ma(n,i)}case "taggedScalar":{let n=we(t);return n!==0&&_a$1(r.tag,n)}default:return  false}}function nm(e){return Oa(e)?$a(e):e}function $a(e){return e.value}async function im(){return globalThis.crypto??await import('node:crypto')}async function La(){return (await im()).randomUUID()}async function Va(e,t){return new Promise(r=>{e.addEventListener(t,r,{once:true});})}var V=class extends O{name="TransactionManagerError";constructor(t,r){super("Transaction API error: "+t,"P2028",r);}},Re=class extends V{constructor(){super("Transaction not found. Transaction ID is invalid, refers to an old closed transaction Prisma doesn't have information about anymore, or was obtained before disconnecting.");}},Ir=class extends V{constructor(t){super(`Transaction already closed: A ${t} cannot be executed on a committed transaction.`);}},Or=class extends V{constructor(t){super(`Transaction already closed: A ${t} cannot be executed on a transaction that was rolled back.`);}},Nr=class extends V{constructor(){super("Unable to start a transaction in the given time.");}},Dr=class extends V{constructor(t,{timeout:r,timeTaken:n}){super(`A ${t} cannot be executed on an expired transaction. The timeout for this transaction was ${r} ms, however ${n} ms passed since the start of the transaction. Consider increasing the interactive transaction timeout or doing less work in the transaction.`,{operation:t,timeout:r,timeTaken:n});}},ie=class extends V{constructor(t){super(`Internal Consistency Error: ${t}`);}},Mr=class extends V{constructor(t){super(`Invalid isolation level: ${t}`,{isolationLevel:t});}};var om=100,tt=_("prisma:client:transactionManager"),sm=()=>({sql:"COMMIT",args:[],argTypes:[]}),qa=()=>({sql:"ROLLBACK",args:[],argTypes:[]}),am=()=>({sql:'-- Implicit "COMMIT" query via underlying driver',args:[],argTypes:[]}),lm=()=>({sql:'-- Implicit "ROLLBACK" query via underlying driver',args:[],argTypes:[]}),jt=class{transactions=new Map;closedTransactions=[];driverAdapter;transactionOptions;tracingHelper;#e;#t;constructor({driverAdapter:t,transactionOptions:r,tracingHelper:n,onQuery:i,provider:o}){this.driverAdapter=t,this.transactionOptions=r,this.tracingHelper=n,this.#e=i,this.#t=o;}async startInternalTransaction(t){let r=t!==void 0?this.#m(t):{};return await this.tracingHelper.runInChildSpan("start_transaction",()=>this.#r(r))}async startTransaction(t){let r=t!==void 0?this.#m(t):this.transactionOptions;return await this.tracingHelper.runInChildSpan("start_transaction",()=>this.#r(r))}async#r(t){if(t.newTxId)return await this.#p(t.newTxId,"start",async s=>{if(s.status!=="running")throw new ie(`Transaction in invalid state ${s.status} when starting a nested transaction.`);if(!s.transaction)throw new ie("Transaction missing underlying driver transaction when starting a nested transaction.");s.depth+=1;let a=this.#i(s);s.savepoints.push(a);try{await this.#o(s.transaction)(a);}catch(l){throw s.depth-=1,s.savepoints.pop(),l}return {id:s.id}});let r={id:await La(),status:"waiting",timer:void 0,timeout:t.timeout,startedAt:Date.now(),transaction:void 0,operationQueue:Promise.resolve(),depth:1,savepoints:[],savepointCounter:0},n=new AbortController,i=ja(()=>n.abort(),t.maxWait);i?.unref?.();let o=this.driverAdapter.startTransaction(t.isolationLevel).catch(We);switch(r.transaction=await Promise.race([o.finally(()=>clearTimeout(i)),Va(n.signal,"abort").then(()=>{})]),this.transactions.set(r.id,r),r.status){case "waiting":if(n.signal.aborted)throw o.then(async s=>{if(s.options.usePhantomQuery)await s.rollback();else try{await s.executeRaw(qa());}finally{await s.rollback();}}).catch(s=>tt("error in discarded transaction:",s)),await this.#d(r,"timed_out"),new Nr;return r.status="running",r.timer=this.#u(r.id,t.timeout),{id:r.id};case "timed_out":case "running":case "committed":case "rolled_back":throw new ie(`Transaction in invalid state ${r.status} although it just finished startup.`);default:S(r.status,"Unknown transaction status.");}}async commitTransaction(t){return await this.tracingHelper.runInChildSpan("commit_transaction",async()=>{await this.#p(t,"commit",async r=>{if(r.depth>1){if(!r.transaction)throw new Re;let n=r.savepoints.at(-1);if(!n)throw new ie(`Missing savepoint for nested commit. Depth: ${r.depth}, transactionId: ${r.id}`);try{await this.#a(r.transaction,n);}finally{r.savepoints.pop(),r.depth-=1;}return}await this.#d(r,"committed");});})}async rollbackTransaction(t){return await this.tracingHelper.runInChildSpan("rollback_transaction",async()=>{await this.#p(t,"rollback",async r=>{if(r.depth>1){if(!r.transaction)throw new Re;let n=r.savepoints.at(-1);if(!n)throw new ie(`Missing savepoint for nested rollback. Depth: ${r.depth}, transactionId: ${r.id}`);try{await this.#s(r.transaction)(n),await this.#a(r.transaction,n);}finally{r.savepoints.pop(),r.depth-=1;}return}await this.#d(r,"rolled_back");});})}async getTransaction(t,r){let n=this.#n(t.id,r);if(n.status==="closing"&&(await n.closing,n=this.#n(t.id,r)),!n.transaction)throw new Re;return n.transaction}#n(t,r){let n=this.transactions.get(t);if(!n){let i=this.closedTransactions.find(o=>o.id===t);if(i)switch(tt("Transaction already closed.",{transactionId:t,status:i.status}),i.status){case "closing":case "waiting":case "running":throw new ie("Active transaction found in closed transactions list.");case "committed":throw new Ir(r);case "rolled_back":throw new Or(r);case "timed_out":throw new Dr(r,{timeout:i.timeout,timeTaken:Date.now()-i.startedAt})}else throw tt("Transaction not found.",t),new Re}if(["committed","rolled_back","timed_out"].includes(n.status))throw new ie("Closed transaction found in active transactions map.");return n}async cancelAllTransactions(){await Promise.allSettled([...this.transactions.values()].map(t=>this.#c(t,async()=>{let r=this.transactions.get(t.id);r&&await this.#d(r,"rolled_back");})));}#i(t){return `prisma_sp_${t.savepointCounter++}`}#o(t){if(t.createSavepoint)return t.createSavepoint.bind(t);throw new V(`Nested transactions are not supported by adapter "${t.adapterName}" (${t.provider}): createSavepoint is not implemented.`)}#s(t){if(t.rollbackToSavepoint)return t.rollbackToSavepoint.bind(t);throw new V(`Nested transactions are not supported by adapter "${t.adapterName}" (${t.provider}): rollbackToSavepoint is not implemented.`)}async#a(t,r){t.releaseSavepoint&&await t.releaseSavepoint(r);}#l(t){tt("Transaction already committed or rolled back when timeout happened.",t);}#u(t,r){let n=Date.now(),i=ja(async()=>{tt("Transaction timed out.",{transactionId:t,timeoutStartedAt:n,timeout:r});let o=this.transactions.get(t);if(!o){this.#l(t);return}await this.#c(o,async()=>{let s=this.transactions.get(t);s&&["running","waiting"].includes(s.status)?await this.#d(s,"timed_out"):this.#l(t);});},r);return i?.unref?.(),i}async#p(t,r,n){let i=this.#n(t,r);return await this.#c(i,async()=>{let o=this.#n(t,r);return await n(o)})}async#c(t,r){let n=t.operationQueue,i;t.operationQueue=new Promise(o=>{i=o;}),await n;try{return await r()}finally{i();}}async#d(t,r){let n=async()=>{tt("Closing transaction.",{transactionId:t.id,status:r});try{if(t.transaction&&r==="committed")if(t.transaction.options.usePhantomQuery)await this.#f(am(),t.transaction,()=>t.transaction.commit());else {let i=sm();await this.#f(i,t.transaction,()=>t.transaction.executeRaw(i)).then(()=>t.transaction.commit(),o=>{let s=()=>Promise.reject(o);return t.transaction.rollback().then(s,s)});}else if(t.transaction)if(t.transaction.options.usePhantomQuery)await this.#f(lm(),t.transaction,()=>t.transaction.rollback());else {let i=qa();try{await this.#f(i,t.transaction,()=>t.transaction.executeRaw(i));}finally{await t.transaction.rollback();}}}finally{t.status=r,clearTimeout(t.timer),t.timer=void 0,this.transactions.delete(t.id),this.closedTransactions.push(t),this.closedTransactions.length>om&&this.closedTransactions.shift();}};t.status==="closing"?(await t.closing,this.#n(t.id,r==="committed"?"commit":"rollback")):await Object.assign(t,{status:"closing",reason:r,closing:n()}).closing;}#m(t){if(!t.timeout)throw new V("timeout is required");if(!t.maxWait)throw new V("maxWait is required");if(t.isolationLevel==="SNAPSHOT")throw new Mr(t.isolationLevel);return {...t,timeout:t.timeout,maxWait:t.maxWait}}#f(t,r,n){return xr({query:t,execute:n,provider:this.#t??r.provider,tracingHelper:this.tracingHelper,onQuery:this.#e})}};function ja(e,t){return t!==void 0?setTimeout(e,t):void 0}var F=require$$1;var Fr="7.9.0";var Ua={bigint:"bigint",date:"datetime",decimal:"decimal",bytes:"bytes"};function Qa(e){let t;try{t=JSON.parse(e);}catch(i){throw new Error(`Received invalid serialized parameters: ${i.message}`)}if(!Array.isArray(t))throw new Error("Received invalid serialized parameters: expected an array");let r=t.map(i=>Ja(i)),n=t.map(i=>cm(i));return {args:r,argTypes:n}}function Ja(e){if(Array.isArray(e))return e.map(t=>Ja(t));if(typeof e=="object"&&e!==null&&"prisma__value"in e){if(!("prisma__type"in e))throw new Error("Invalid serialized parameter, prisma__type should be present when prisma__value is present");return `${e.prisma__value}`}return typeof e=="object"&&e!==null?JSON.stringify(e):e}function cm(e){return Array.isArray(e)?{scalarType:e.length>0?Ba(e[0]):"unknown",arity:"list"}:{scalarType:Ba(e),arity:"scalar"}}function Ba(e){return typeof e=="object"&&e!==null&&"prisma__type"in e&&typeof e.prisma__type=="string"&&e.prisma__type in Ua?Ua[e.prisma__type]:typeof e=="number"?"decimal":typeof e=="string"?"string":"unknown"}function Ha(e,t){return {batch:e,transaction:t?.kind==="batch"?{isolationLevel:t.options.isolationLevel}:void 0}}function Ga(e){return e?e.replace(/"(?:[^"\\]|\\.)*"/g,'"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g,t=>`${t[0]}5`):""}function za(e){return e.split(`
`).map(t=>t.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/,"").replace(/\+\d+\s*ms$/,"")).join(`
`)}var Wa=B(Ui());function Ka({title:e,user:t="prisma",repo:r="prisma",template:n="bug_report.yml",body:i}){return (0, Wa.default)({user:t,repo:r,template:n,title:e,body:i})}function Za({version:e,binaryTarget:t,title:r,description:n,engineVersion:i,database:o,query:s}){let a=Ii(6e3-(s?.length??0)),l=za(De(a)),u=n?`# Description
\`\`\`
${n}
\`\`\``:"",c=De(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${t?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s?Ga(s):""}
\`\`\`
`),p=Ka({title:r,body:c});return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${at(p)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`}var _r=class e{#e;#t;#r;#n;#i;constructor(t,r,n){this.#e=t,this.#t=r,this.#r=n,this.#n=r.getConnectionInfo?.(),this.#i=Lt.forSql({onQuery:this.#e.onQuery,tracingHelper:this.#e.tracingHelper,provider:this.#e.provider,connectionInfo:this.#n});}static async connect(t){let r,n;try{r=await t.driverAdapterFactory.connect(),n=new jt({driverAdapter:r,transactionOptions:t.transactionOptions,tracingHelper:t.tracingHelper,onQuery:t.onQuery,provider:t.provider});}catch(i){throw await r?.dispose(),i}return new e(t,r,n)}getConnectionInfo(){let t=this.#n??{supportsRelationJoins:false};return Promise.resolve({provider:this.#t.provider,connectionInfo:t})}async execute({plan:t,placeholderValues:r,transaction:n,batchIndex:i,queryInfo:o}){let s=n?await this.#r.getTransaction(n,i!==void 0?"batch query":"query"):this.#t;return await this.#i.run(t,{queryable:s,transactionManager:n?{enabled:false}:{enabled:true,manager:this.#r},scope:r,sqlCommenter:this.#e.sqlCommenters&&{plugins:this.#e.sqlCommenters,queryInfo:o}})}async startTransaction(t){return {...await this.#r.startTransaction(t),payload:void 0}}async commitTransaction(t){await this.#r.commitTransaction(t.id);}async rollbackTransaction(t){await this.#r.rollbackTransaction(t.id);}async disconnect(){try{await this.#r.cancelAllTransactions();}finally{await this.#t.dispose();}}apiKey(){return null}};var $r=class{#e;#t;#r;constructor(t=1e3){this.#e=new Map,this.#t=new Map,this.#r=t;}getSingle(t){let r=this.#e.get(t);return r&&(this.#e.delete(t),this.#e.set(t,r)),r}setSingle(t,r){if(this.#e.has(t)){this.#e.delete(t),this.#e.set(t,r);return}if(this.#e.size>=this.#r){let n=this.#e.keys().next().value;n!==void 0&&this.#e.delete(n);}this.#e.set(t,r);}getBatch(t){let r=this.#t.get(t);return r&&(this.#t.delete(t),this.#t.set(t,r)),r}setBatch(t,r){if(this.#t.has(t)){this.#t.delete(t),this.#t.set(t,r);return}if(this.#t.size>=this.#r){let n=this.#t.keys().next().value;n!==void 0&&this.#t.delete(n);}this.#t.set(t,r);}clear(){this.#e.clear(),this.#t.clear();}get size(){return this.#e.size+this.#t.size}get singleCacheSize(){return this.#e.size}get batchCacheSize(){return this.#t.size}};var nl=require$$1;var Lr=/^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;function Ya(e,t,r){let n={},i=n.encode||encodeURIComponent;if(typeof i!="function")throw new TypeError("option encode is invalid");if(!Lr.test(e))throw new TypeError("argument name is invalid");let o=i(t);if(o&&!Lr.test(o))throw new TypeError("argument val is invalid");let s=e+"="+o;if(n.maxAge!==void 0&&n.maxAge!==null){let a=n.maxAge-0;if(Number.isNaN(a)||!Number.isFinite(a))throw new TypeError("option maxAge is invalid");s+="; Max-Age="+Math.floor(a);}if(n.domain){if(!Lr.test(n.domain))throw new TypeError("option domain is invalid");s+="; Domain="+n.domain;}if(n.path){if(!Lr.test(n.path))throw new TypeError("option path is invalid");s+="; Path="+n.path;}if(n.expires){if(!pm(n.expires)||Number.isNaN(n.expires.valueOf()))throw new TypeError("option expires is invalid");s+="; Expires="+n.expires.toUTCString();}if(n.httpOnly&&(s+="; HttpOnly"),n.secure&&(s+="; Secure"),n.priority)switch(typeof n.priority=="string"?n.priority.toLowerCase():n.priority){case "low":{s+="; Priority=Low";break}case "medium":{s+="; Priority=Medium";break}case "high":{s+="; Priority=High";break}default:throw new TypeError("option priority is invalid")}if(n.sameSite)switch(typeof n.sameSite=="string"?n.sameSite.toLowerCase():n.sameSite){case  true:{s+="; SameSite=Strict";break}case "lax":{s+="; SameSite=Lax";break}case "strict":{s+="; SameSite=Strict";break}case "none":{s+="; SameSite=None";break}default:throw new TypeError("option sameSite is invalid")}return n.partitioned&&(s+="; Partitioned"),s}function pm(e){return Object.prototype.toString.call(e)==="[object Date]"||e instanceof Date}function Xa(e,t){let r=(e||"").split(";").filter(l=>typeof l=="string"&&!!l.trim()),n=r.shift()||"",i=dm(n),o=i.name,s=i.value;try{s=t?.decode===!1?s:(t?.decode||decodeURIComponent)(s);}catch{}let a={name:o,value:s};for(let l of r){let u=l.split("="),c=(u.shift()||"").trimStart().toLowerCase(),p=u.join("=");switch(c){case "expires":{a.expires=new Date(p);break}case "max-age":{a.maxAge=Number.parseInt(p,10);break}case "secure":{a.secure=true;break}case "httponly":{a.httpOnly=true;break}case "samesite":{a.sameSite=p;break}default:a[c]=p;}}return a}function dm(e){let t="",r="",n=e.split("=");return n.length>1?(t=n.shift(),r=n.join("=")):r=e,{name:t,value:r}}var Vr=class extends Error{clientVersion;cause;constructor(t,r){super(t),this.clientVersion=r.clientVersion,this.cause=r.cause;}get[Symbol.toStringTag](){return this.name}};var qr=class extends Vr{isRetryable;constructor(t,r){super(t,r),this.isRetryable=r.isRetryable??true;}};function el(e,t){return {...e,isRetryable:t}}var ke=class extends qr{name="InvalidDatasourceError";code="P6001";constructor(t,r){super(t,el(r,false));}};yt(ke,"InvalidDatasourceError");function tl(e){let t={clientVersion:e.clientVersion},r;try{r=new URL(e.accelerateUrl);}catch(l){let u=l.message;throw new ke(`Error validating \`accelerateUrl\`, the URL cannot be parsed, reason: ${u}`,t)}let{protocol:n,searchParams:i}=r;if(n!=="prisma:"&&n!==zt)throw new ke("Error validating `accelerateUrl`: the URL must start with the protocol `prisma://` or `prisma+postgres://`",t);let o=i.get("api_key");if(o===null||o.length<1)throw new ke("Error validating `accelerateUrl`: the URL must contain a valid API key",t);let s=Xr(r)?"http:":"https:";process.env.TEST_CLIENT_ENGINE_REMOTE_EXECUTOR&&r.searchParams.has("use_http")&&(s="http:");let a=new URL(r.href.replace(n,s));return {apiKey:o,url:a}}var rl=B(Di()),jr=class{apiKey;tracingHelper;logLevel;logQueries;engineHash;constructor({apiKey:t,tracingHelper:r,logLevel:n,logQueries:i,engineHash:o}){this.apiKey=t,this.tracingHelper=r,this.logLevel=n,this.logQueries=i,this.engineHash=o;}build({traceparent:t,transactionId:r}={}){let n={Accept:"application/json",Authorization:`Bearer ${this.apiKey}`,"Content-Type":"application/json","Prisma-Engine-Hash":this.engineHash,"Prisma-Engine-Version":rl.enginesVersion};this.tracingHelper.isEnabled()&&(n.traceparent=t??this.tracingHelper.getTraceParent()),r&&(n["X-Transaction-Id"]=r);let i=this.#e();return i.length>0&&(n["X-Capture-Telemetry"]=i.join(", ")),n}#e(){let t=[];return this.tracingHelper.isEnabled()&&t.push("tracing"),this.logLevel&&t.push(this.logLevel),this.logQueries&&t.push("query"),t}};function mm(e){return e[0]*1e3+e[1]/1e6}function ii(e){return new Date(mm(e))}var il=_("prisma:client:clientEngine:remoteExecutor"),Ur=class{#e;#t;#r;#n;#i;#o;constructor(t){this.#e=t.clientVersion,this.#n=t.logEmitter,this.#i=t.tracingHelper,this.#o=t.sqlCommenters;let{url:r,apiKey:n}=tl({clientVersion:t.clientVersion,accelerateUrl:t.accelerateUrl});this.#r=new oi(r),this.#t=new jr({apiKey:n,engineHash:t.clientVersion,logLevel:t.logLevel,logQueries:t.logQueries,tracingHelper:t.tracingHelper});}async getConnectionInfo(){return await this.#s({path:"/connection-info",method:"GET"})}async execute({plan:t,placeholderValues:r,batchIndex:n,model:i,operation:o,transaction:s,customFetch:a,queryInfo:l}){let u=l&&this.#o?.length?br(this.#o,{query:l}):void 0;return (await this.#s({path:s?`/transaction/${s.id}/query`:"/query",method:"POST",body:{model:i,operation:o,plan:t,params:r,comments:u&&Object.keys(u).length>0?u:void 0},batchRequestIdx:n,fetch:a})).data}async startTransaction(t){return {...await this.#s({path:"/transaction/start",method:"POST",body:t}),payload:void 0}}async commitTransaction(t){await this.#s({path:`/transaction/${t.id}/commit`,method:"POST"});}async rollbackTransaction(t){await this.#s({path:`/transaction/${t.id}/rollback`,method:"POST"});}disconnect(){return Promise.resolve()}apiKey(){return this.#t.apiKey}async#s({path:t,method:r,body:n,fetch:i=globalThis.fetch,batchRequestIdx:o}){let s=await this.#r.request({method:r,path:t,headers:this.#t.build(),body:n,fetch:i});s.ok||await this.#a(s,o);let a=await s.json();return typeof a.extensions=="object"&&a.extensions!==null&&this.#l(a.extensions),a}async#a(t,r){let n=t.headers.get("Prisma-Error-Code"),i=await t.text(),o,s=i;try{o=JSON.parse(i);}catch{o={};}typeof o.code=="string"&&(n=o.code),typeof o.error=="string"?s=o.error:typeof o.message=="string"?s=o.message:typeof o.InvalidRequestError=="object"&&o.InvalidRequestError!==null&&typeof o.InvalidRequestError.reason=="string"&&(s=o.InvalidRequestError.reason),s=s||`HTTP ${t.status}: ${t.statusText}`;let a=typeof o.meta=="object"&&o.meta!==null?o.meta:o;throw new nl.PrismaClientKnownRequestError(s,{clientVersion:this.#e,code:n??"P6000",batchRequestIdx:r,meta:a})}#l(t){if(t.logs)for(let r of t.logs)this.#u(r);t.spans&&this.#i.dispatchEngineSpans(t.spans);}#u(t){switch(t.level){case "debug":case "trace":il(t);break;case "error":case "warn":case "info":{this.#n.emit(t.level,{timestamp:ii(t.timestamp),message:t.attributes.message??"",target:t.target??"RemoteExecutor"});break}case "query":{this.#n.emit("query",{query:t.attributes.query??"",timestamp:ii(t.timestamp),duration:t.attributes.duration_ms??0,params:t.attributes.params??"",target:t.target??"RemoteExecutor"});break}default:throw new Error(`Unexpected log level: ${t.level}`)}}},oi=class{#e;#t;#r;constructor(t){this.#e=t,this.#t=new Map;}async request({method:t,path:r,headers:n,body:i,fetch:o}){let s=new URL(r,this.#e),a=this.#n(s);a&&(n.Cookie=a),this.#r&&(n["Accelerate-Query-Engine-Jwt"]=this.#r);let l=await o(s.href,{method:t,body:i!==void 0?JSON.stringify(i):void 0,headers:n});return il(t,s,l.status,l.statusText),this.#r=l.headers.get("Accelerate-Query-Engine-Jwt")??void 0,this.#i(s,l),l}#n(t){let r=[],n=new Date;for(let[i,o]of this.#t){if(o.expires&&o.expires<n){this.#t.delete(i);continue}let s=o.domain??t.hostname,a=o.path??"/";t.hostname.endsWith(s)&&t.pathname.startsWith(a)&&r.push(Ya(o.name,o.value));}return r.length>0?r.join("; "):void 0}#i(t,r){let n=r.headers.getSetCookie?.()||[];if(n.length===0){let i=r.headers.get("Set-Cookie");i&&n.push(i);}for(let i of n){let o=Xa(i),s=o.domain??t.hostname,a=o.path??"/",l=`${s}:${a}:${o.name}`;this.#t.set(l,{name:o.name,value:o.value,domain:s,path:a,expires:o.expires});}}};var ai=require$$1,si={},ol={async loadQueryCompiler(e){let{clientVersion:t,compilerWasm:r}=e;if(r===void 0)throw new ai.PrismaClientInitializationError("WASM query compiler was unexpectedly `undefined`",t);let n;return e.activeProvider===void 0||si[e.activeProvider]===void 0?(n=(async()=>{let i=await r.getRuntime(),o=await r.getQueryCompilerWasmModule();if(o==null)throw new ai.PrismaClientInitializationError("The loaded wasm module was unexpectedly `undefined` or `null` once loaded",t);let s={[r.importName]:i},a=new WebAssembly.Instance(o,s),l=a.exports.__wbindgen_start;return i.__wbg_set_wasm(a.exports),l(),i.QueryCompiler})(),e.activeProvider!==void 0&&(si[e.activeProvider]=n)):n=si[e.activeProvider],await n}};var fm="P2038",ce=_("prisma:client:clientEngine"),ul=globalThis;ul.PRISMA_WASM_PANIC_REGISTRY={set_message(e){throw new F.PrismaClientRustPanicError(e,Fr)}};var Ut=class{name="ClientEngine";#e;#t={type:"disconnected"};#r;#n;#i;#o;config;datamodel;logEmitter;logQueries;logLevel;tracingHelper;#s;constructor(t,r){if(t.accelerateUrl!==void 0)this.#n={remote:true,accelerateUrl:t.accelerateUrl};else if(t.adapter)this.#n={remote:false,driverAdapterFactory:t.adapter},ce("Using driver adapter: %O",t.adapter);else throw new F.PrismaClientInitializationError("PrismaClient requires a driver adapter to connect to your database, but none was provided. Pass one to the PrismaClient constructor, e.g. `new PrismaClient({ adapter })`. Learn more: https://pris.ly/d/driver-adapters",t.clientVersion,fm);this.#r=r??ol,this.config=t,this.logQueries=t.logQueries??false,this.logLevel=t.logLevel??"error",this.logEmitter=t.logEmitter,this.datamodel=t.inlineSchema,this.tracingHelper=t.tracingHelper,this.#i=t.queryPlanCacheMaxSize===0?void 0:new $r(t.queryPlanCacheMaxSize),this.#o=qt.deserialize(t.parameterizationSchema,n=>{if(!Object.hasOwn(t.runtimeDataModel.enums,n))return;let i={};for(let o of t.runtimeDataModel.enums[n].values)i[o.name]=o.dbName??o.name;return i}),t.enableDebugLogs&&(this.logLevel="debug"),this.logQueries&&(this.#s=n=>{this.logEmitter.emit("query",{...n,params:K(n.params),target:"ClientEngine"});});}async#a(){switch(this.#t.type){case "disconnected":{let t=this.tracingHelper.runInChildSpan("connect",async()=>{let r,n;try{r=await this.#l(),n=await this.#u(r);}catch(o){throw this.#t={type:"disconnected"},n?.free(),await r?.disconnect(),o}let i={executor:r,queryCompiler:n};return this.#t={type:"connected",engine:i},i});return this.#t={type:"connecting",promise:t},await t}case "connecting":return await this.#t.promise;case "connected":return this.#t.engine;case "disconnecting":return await this.#t.promise,await this.#a()}}async#l(){return this.#n.remote?new Ur({clientVersion:this.config.clientVersion,accelerateUrl:this.#n.accelerateUrl,logEmitter:this.logEmitter,logLevel:this.logLevel,logQueries:this.logQueries,tracingHelper:this.tracingHelper,sqlCommenters:this.config.sqlCommenters}):await _r.connect({driverAdapterFactory:this.#n.driverAdapterFactory,tracingHelper:this.tracingHelper,transactionOptions:{...this.config.transactionOptions,isolationLevel:this.#y(this.config.transactionOptions.isolationLevel)},onQuery:this.#s,provider:this.config.activeProvider,sqlCommenters:this.config.sqlCommenters})}async#u(t){let r=this.#e;r===void 0&&(r=await this.#r.loadQueryCompiler(this.config),this.#e=r);let{provider:n,connectionInfo:i}=await t.getConnectionInfo();try{return this.#m(()=>new r({datamodel:this.datamodel,provider:n,connectionInfo:i}),void 0,!1)}catch(o){throw this.#p(o)}}#p(t){if(t instanceof F.PrismaClientRustPanicError)return t;try{let r=JSON.parse(t.message);return new F.PrismaClientInitializationError(r.message,this.config.clientVersion,r.error_code)}catch{return t}}#c(t,r){if(t instanceof F.PrismaClientInitializationError)return t;if(t.code==="GenericFailure"&&t.message?.startsWith("PANIC:"))return new F.PrismaClientRustPanicError(sl(this,t.message,r),this.config.clientVersion);if(t instanceof O)return new F.PrismaClientKnownRequestError(t.message,{code:t.code,meta:t.meta,clientVersion:this.config.clientVersion});try{let n=JSON.parse(t);return new F.PrismaClientUnknownRequestError(`${n.message}
${n.backtrace}`,{clientVersion:this.config.clientVersion})}catch{return t}}#d(t){return t instanceof F.PrismaClientRustPanicError?t:typeof t.message=="string"&&typeof t.code=="string"?new F.PrismaClientKnownRequestError(t.message,{code:t.code,meta:t.meta,clientVersion:this.config.clientVersion}):typeof t.message=="string"?new F.PrismaClientUnknownRequestError(t.message,{clientVersion:this.config.clientVersion}):t}#m(t,r,n=true){let i=ul.PRISMA_WASM_PANIC_REGISTRY.set_message,o;commonjsGlobal.PRISMA_WASM_PANIC_REGISTRY.set_message=s=>{o=s;};try{return t()}finally{if(commonjsGlobal.PRISMA_WASM_PANIC_REGISTRY.set_message=i,o)throw this.#e=void 0,n&&this.stop().catch(s=>ce("failed to disconnect:",s)),new F.PrismaClientRustPanicError(sl(this,o,r),this.config.clientVersion)}}onBeforeExit(){throw new Error('"beforeExit" hook is not applicable to the client engine, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.')}async start(){await this.#a();}async stop(){switch(this.#t.type){case "disconnected":return;case "connecting":return await this.#t.promise,await this.stop();case "connected":{let t=this.#t.engine,r=this.tracingHelper.runInChildSpan("disconnect",async()=>{try{await t.executor.disconnect(),t.queryCompiler.free();}finally{this.#t={type:"disconnected"};}});return this.#t={type:"disconnecting",promise:r},await r}case "disconnecting":return await this.#t.promise}}version(){return "unknown"}async transaction(t,r,n){let i,{executor:o}=await this.#a();try{if(t==="start"){let s=n;i=await o.startTransaction({...s,isolationLevel:this.#y(s.isolationLevel)});}else if(t==="commit"){let s=n;await o.commitTransaction(s);}else if(t==="rollback"){let s=n;await o.rollbackTransaction(s);}else ae(t,"Invalid transaction action.");}catch(s){throw this.#c(s)}return i?{id:i.id,payload:void 0}:void 0}async request(t,{interactiveTransaction:r,customDataProxyFetch:n}){ce("sending request");let{executor:i,queryCompiler:o}=await this.#a().catch(u=>{throw this.#c(u,JSON.stringify(t))}),s,a={},l=t.query;if(al(t))s=ll(t);else {let{parameterizedQuery:u,placeholderValues:c}=ti(t,this.#o),p=JSON.stringify(u);a=c,l=u.query;let d=t.action!=="createMany"&&t.action!=="createManyAndReturn",h=d?this.#i?.getSingle(p):void 0;h?(ce("query plan cache hit"),s=h):(ce("query plan cache miss"),s=this.#f(u,p,o),d&&this.#i?.setSingle(p,s));}try{ce("query plan created",s);let u=await i.execute({plan:s,model:t.modelName,operation:t.action,placeholderValues:a,transaction:r,batchIndex:void 0,customFetch:n?.(globalThis.fetch),queryInfo:{type:"single",modelName:t.modelName,action:t.action,query:l}});return ce("query plan executed"),{data:{[t.action]:u}}}catch(u){throw this.#c(u,JSON.stringify(t))}}async requestBatch(t,{transaction:r,customDataProxyFetch:n}){if(t.length===0)return [];let i=t[0].action,o=t[0].modelName,s=Ha(t,r),a=JSON.stringify(s),{executor:l,queryCompiler:u}=await this.#a().catch(m=>{throw this.#c(m,a)}),c=o===void 0,p,d={},h=t.map(m=>m.query);if(c)p=this.#g(t,a,u);else {let{parameterizedBatch:m,placeholderValues:E}=ri(s,this.#o),k=JSON.stringify(m);d=E,h=m.batch.map(P=>P.query);let w=this.#i?.getBatch(k);if(w)ce("batch query plan cache hit"),p=w;else {ce("batch query plan cache miss");try{p=this.#g(m.batch,k,u),this.#i?.setBatch(k,p);}catch(P){throw this.#d(P)}}}try{let m;switch(r?.kind==="itx"&&(m=r.options),p.type){case "multi":{if(r?.kind!=="itx"){let w=r?.options,P={maxWait:w?.maxWait??this.config.transactionOptions.maxWait,timeout:w?.timeout??this.config.transactionOptions.timeout,isolationLevel:w?.isolationLevel??this.config.transactionOptions.isolationLevel};m=await this.transaction("start",{},P);}let E=[],k=!1;for(let[w,P]of p.plans.entries())try{let b=await l.execute({plan:P,placeholderValues:d,model:t[w].modelName,operation:t[w].action,batchIndex:w,transaction:m,customFetch:n?.(globalThis.fetch),queryInfo:{type:"single",modelName:t[w].modelName,action:t[w].action,query:h[w]}});E.push({data:{[t[w].action]:b}});}catch(b){E.push(b),k=!0;break}return m!==void 0&&r?.kind!=="itx"&&(k?await this.transaction("rollback",{},m):await this.transaction("commit",{},m)),E}case "compacted":{if(!t.every(w=>w.action===i&&w.modelName===o)){let w=t.map(b=>b.action).join(", "),P=t.map(b=>b.modelName).join(", ");throw new Error(`Internal error: All queries in a compacted batch must have the same action and model name, but received actions: [${w}] and model names: [${P}]. This indicates a bug in the client. Please report this issue to the Prisma team with your query details.`)}if(o===void 0)throw new Error("Internal error: A compacted batch cannot contain raw queries. This indicates a bug in the client. Please report this issue to the Prisma team with your query details.");let E=await l.execute({plan:p.plan,placeholderValues:d,model:o,operation:i,batchIndex:void 0,transaction:m,customFetch:n?.(globalThis.fetch),queryInfo:{type:"compacted",action:i,modelName:o,queries:h}});return ps(E,p,d).map(w=>({data:{[i]:w}}))}}}catch(m){throw this.#c(m,a)}}async apiKey(){let{executor:t}=await this.#a();return t.apiKey()}#f(t,r,n){try{return this.#m(()=>this.#h({queries:[t],execute:()=>n.compile(r)}))}catch(i){throw this.#d(i)}}#g(t,r,n){if(t.every(al))return {type:"multi",plans:t.map(i=>ll(i))};try{return this.#m(()=>this.#h({queries:t,execute:()=>n.compileBatch(r)}))}catch(i){throw this.#d(i)}}#y(t){switch(t){case void 0:return;case "ReadUncommitted":return "READ UNCOMMITTED";case "ReadCommitted":return "READ COMMITTED";case "RepeatableRead":return "REPEATABLE READ";case "Serializable":return "SERIALIZABLE";case "Snapshot":return "SNAPSHOT";default:throw new F.PrismaClientKnownRequestError(`Inconsistent column data: Conversion failed: Invalid isolation level \`${t}\``,{code:"P2023",clientVersion:this.config.clientVersion,meta:{providedIsolationLevel:t}})}}#h({queries:t,execute:r}){return this.tracingHelper.runInChildSpan({name:"compile",attributes:{models:t.map(n=>n.modelName).filter(n=>n!==void 0),actions:t.map(n=>n.action)}},r)}};function sl(e,t,r){return Za({binaryTarget:void 0,title:t,version:e.config.clientVersion,engineVersion:"unknown",database:e.config.activeProvider,query:r})}function al(e){return e.action==="queryRaw"||e.action==="executeRaw"}function ll(e){let t=e.query.arguments.query,{args:r,argTypes:n}=Qa(e.query.arguments.parameters);return {type:e.action==="queryRaw"?"query":"execute",args:{type:"rawSql",sql:t,args:r,argTypes:n}}}function cl(e){return new Ut(e)}var pl=e=>({command:e});var bl=require$$1;var dl=e=>e.strings.reduce((t,r,n)=>`${t}@P${n}${r}`);var gl=require$$1;function rt(e){try{return ml(e,"fast")}catch(t){if(!(t instanceof TypeError))throw t;return ml(e,"slow")}}function ml(e,t){return JSON.stringify(e.map(r=>yl(r,t)))}function yl(e,t){if(Array.isArray(e))return e.map(r=>yl(r,t));if(typeof e=="bigint")return {prisma__type:"bigint",prisma__value:e.toString()};if(Me(e)){if(!Fe(e))throw new Error("Invalid value for argument `date`: Provided Date object is invalid.");return {prisma__type:"date",prisma__value:e.toJSON()}}if(gl.Decimal.isDecimal(e))return {prisma__type:"decimal",prisma__value:e.toJSON()};if(Buffer.isBuffer(e))return {prisma__type:"bytes",prisma__value:e.toString("base64")};if(gm(e))return {prisma__type:"bytes",prisma__value:Buffer.from(e).toString("base64")};if(ArrayBuffer.isView(e)){let{buffer:r,byteOffset:n,byteLength:i}=e;return {prisma__type:"bytes",prisma__value:Buffer.from(r,n,i).toString("base64")}}return typeof e=="object"&&t==="slow"?hl(e):e}function gm(e){return e instanceof ArrayBuffer||e instanceof SharedArrayBuffer?true:typeof e=="object"&&e!==null?e[Symbol.toStringTag]==="ArrayBuffer"||e[Symbol.toStringTag]==="SharedArrayBuffer":false}function hl(e){if(typeof e!="object"||e===null)return e;if(typeof e.toJSON=="function")return e.toJSON();if(Array.isArray(e))return e.map(fl);let t={};for(let r of Object.keys(e))t[r]=fl(e[r]);return t}function fl(e){return typeof e=="bigint"?e.toString():hl(e)}var ym=/^(\s*alter\s)/i,wl=_("prisma:client");function li(e,t,r,n){if(!(e!=="postgresql"&&e!=="cockroachdb")&&r.length>0&&ym.exec(t))throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`)}var ui=({clientMethod:e,activeProvider:t})=>r=>{let n="",i;if(mr(r))n=r.sql,i={values:rt(r.values),__prismaRawParameters__:true};else if(Array.isArray(r)){let[o,...s]=r;n=o,i={values:rt(s||[]),__prismaRawParameters__:true};}else switch(t){case "sqlite":case "mysql":{n=r.sql,i={values:rt(r.values),__prismaRawParameters__:true};break}case "cockroachdb":case "postgresql":case "postgres":{n=r.text,i={values:rt(r.values),__prismaRawParameters__:true};break}case "sqlserver":{n=dl(r),i={values:rt(r.values),__prismaRawParameters__:true};break}default:throw new Error(`The ${t} provider does not support ${e}`)}return i?.values?wl(`prisma.${e}(${n}, ${i.values})`):wl(`prisma.${e}(${n})`),{query:n,parameters:i}},xl={requestArgsToMiddlewareArgs(e){return [e.strings,...e.values]},middlewareArgsToRequestArgs(e){let[t,...r]=e;return new bl.Sql(t,r)}},Pl={requestArgsToMiddlewareArgs(e){return [e]},middlewareArgsToRequestArgs(e){return e[0]}};function ci(e){return function(r,n){let i,o=(s=e)=>{try{return s===void 0||s?.kind==="itx"?i??=El(r(s)):El(r(s))}catch(a){return Promise.reject(a)}};return {get spec(){return n},then(s,a){return o().then(s,a)},catch(s){return o().catch(s)},finally(s){return o().finally(s)},requestTransaction(s){let a=o(s);return a.requestTransaction?a.requestTransaction(s):a},[Symbol.toStringTag]:"PrismaPromise"}}}function El(e){return typeof e.then=="function"?e:Promise.resolve(e)}var Tl={version:"7.9.0"};var wm=Tl.version.split(".")[0],bm="PRISMA_INSTRUMENTATION",xm=`V${wm}_PRISMA_INSTRUMENTATION`,Sl=globalThis;function vl(){let e=Sl[xm];return e?.helper?e.helper:Sl[bm]?.helper}var Pm={isEnabled(){return  false},getTraceParent(){return "00-10-10-00"},dispatchEngineSpans(){},getActiveContext(){},runInChildSpan(e,t){return t()}},pi=class{isEnabled(){return this.getTracingHelper().isEnabled()}getTraceParent(t){return this.getTracingHelper().getTraceParent(t)}dispatchEngineSpans(t){return this.getTracingHelper().dispatchEngineSpans(t)}getActiveContext(){return this.getTracingHelper().getActiveContext()}runInChildSpan(t,r){return this.getTracingHelper().runInChildSpan(t,r)}getTracingHelper(){return vl()??Pm}};function Al(){return new pi}function Cl(e,t=()=>{}){let r,n=new Promise(i=>r=i);return {then(i){return --e===0&&r(t()),i?.(n)}}}function Rl(e){return typeof e=="string"?e:e.reduce((t,r)=>{let n=typeof r=="string"?r:r.level;return n==="query"?t:t&&(r==="info"||t==="info")?"info":n},void 0)}var Il=require$$1;function mi(e){if(e.action!=="findUnique"&&e.action!=="findUniqueOrThrow")return;let t=[];return e.modelName&&t.push(e.modelName),e.query.arguments&&t.push(di(e.query.arguments)),t.push(di(e.query.selection)),t.join("")}function di(e){return `(${Object.keys(e).sort().map(r=>{let n=e[r];return typeof n=="object"&&n!==null?`(${r} ${di(n)})`:r}).join(" ")})`}var Em={aggregate:false,aggregateRaw:false,createMany:true,createManyAndReturn:true,createOne:true,deleteMany:true,deleteOne:true,executeRaw:true,findFirst:false,findFirstOrThrow:false,findMany:false,findRaw:false,findUnique:false,findUniqueOrThrow:false,groupBy:false,queryRaw:false,runCommandRaw:true,updateMany:true,updateManyAndReturn:true,updateOne:true,upsertOne:true};function fi(e){return Em[e]}var Br=class{constructor(t){this.options=t;this.batches={};}batches;tickActive=false;request(t){let r=this.options.batchBy(t);return r?(this.batches[r]||(this.batches[r]=[],this.tickActive||(this.tickActive=true,process.nextTick(()=>{this.dispatchBatches(),this.tickActive=false;}))),new Promise((n,i)=>{this.batches[r].push({request:t,resolve:n,reject:i});})):this.options.singleLoader(t)}dispatchBatches(){for(let t in this.batches){let r=this.batches[t];delete this.batches[t],r.length===1?this.options.singleLoader(r[0].request).then(n=>{n instanceof Error?r[0].reject(n):r[0].resolve(n);}).catch(n=>{r[0].reject(n);}):(r.sort((n,i)=>this.options.batchOrder(n.request,i.request)),this.options.batchLoader(r.map(n=>n.request)).then(n=>{if(n instanceof Error)for(let i=0;i<r.length;i++)r[i].reject(n);else for(let i=0;i<r.length;i++){let o=n[i];o instanceof Error?r[i].reject(o):r[i].resolve(o);}}).catch(n=>{for(let i=0;i<r.length;i++)r[i].reject(n);}));}}get[Symbol.toStringTag](){return "DataLoader"}};var kl=require$$1;function Ie(e,t){if(t===null)return t;switch(e){case "bigint":return BigInt(t);case "bytes":{let{buffer:r,byteOffset:n,byteLength:i}=Buffer.from(t,"base64");return new Uint8Array(r,n,i)}case "decimal":return new kl.Decimal(t);case "datetime":case "date":return new Date(t);case "time":return new Date(`1970-01-01T${t}Z`);case "bigint-array":return t.map(r=>Ie("bigint",r));case "bytes-array":return t.map(r=>Ie("bytes",r));case "decimal-array":return t.map(r=>Ie("decimal",r));case "datetime-array":return t.map(r=>Ie("datetime",r));case "date-array":return t.map(r=>Ie("date",r));case "time-array":return t.map(r=>Ie("time",r));default:return t}}function Qr(e){let t=[],r=Tm(e);for(let n=0;n<e.rows.length;n++){let i=e.rows[n],o={...r};for(let s=0;s<i.length;s++)o[e.columns[s]]=Ie(e.types[s],i[s]);t.push(o);}return t}function Tm(e){let t={};for(let r=0;r<e.columns.length;r++)t[e.columns[r]]=null;return t}var Sm=_("prisma:client:request_handler"),Jr=class{client;dataloader;logEmitter;constructor(t,r){this.logEmitter=r,this.client=t,this.dataloader=new Br({batchLoader:Yo(async({requests:n,customDataProxyFetch:i})=>{let{transaction:o,otelParentCtx:s}=n[0],a=n.map(p=>p.protocolQuery),l=this.client._tracingHelper.getTraceParent(s),u=n.some(p=>fi(p.protocolQuery.action));return (await this.client._engine.requestBatch(a,{traceparent:l,transaction:vm(o),containsWrite:u,customDataProxyFetch:i})).map((p,d)=>{if(p instanceof Error)return p;try{return this.mapQueryEngineResult(n[d],p)}catch(h){return h}})}),singleLoader:async n=>{let i=n.transaction?.kind==="itx"?Ol(n.transaction):void 0,o=await this.client._engine.request(n.protocolQuery,{traceparent:this.client._tracingHelper.getTraceParent(),interactiveTransaction:i,isWrite:fi(n.protocolQuery.action),customDataProxyFetch:n.customDataProxyFetch});return this.mapQueryEngineResult(n,o)},batchBy:n=>{if(n.transaction?.kind==="itx"){let i=mi(n.protocolQuery);return `itx-${n.transaction.id}${i?`-${i}`:""}`}return n.transaction?.id?`transaction-${n.transaction.id}`:mi(n.protocolQuery)},batchOrder(n,i){return n.transaction?.kind==="batch"&&i.transaction?.kind==="batch"?n.transaction.index-i.transaction.index:0}});}async request(t){try{return await this.dataloader.request(t)}catch(r){let{clientMethod:n,callsite:i,transaction:o,args:s,modelName:a}=t;this.handleAndLogRequestError({error:r,clientMethod:n,callsite:i,transaction:o,args:s,modelName:a,globalOmit:t.globalOmit});}}mapQueryEngineResult({dataPath:t,unpacker:r},n){let i=n?.data,o=this.unpack(i,t,r);return process.env.PRISMA_CLIENT_GET_TIME?{data:o}:o}handleAndLogRequestError(t){try{this.handleRequestError(t);}catch(r){throw this.logEmitter&&this.logEmitter.emit("error",{message:r.message,target:t.clientMethod,timestamp:new Date}),r}}handleRequestError({error:t,clientMethod:r,callsite:n,transaction:i,args:o,modelName:s,globalOmit:a}){if(Sm(t),Am(t,i))throw t;if(t instanceof x.PrismaClientKnownRequestError&&Cm(t)){let u=Nl(t.meta);ar({args:o,errors:[u],callsite:n,errorFormat:this.client._errorFormat,originalMethod:r,clientVersion:this.client._clientVersion,globalOmit:a});}let l=t.message;if(n&&(l=Xt({callsite:n,originalMethod:r,isPanic:t.isPanic,showColors:this.client._errorFormat==="pretty",message:l})),l=this.sanitizeMessage(l),t.code){let u=s?{modelName:s,...t.meta}:t.meta;throw new x.PrismaClientKnownRequestError(l,{code:t.code,clientVersion:this.client._clientVersion,meta:u,batchRequestIdx:t.batchRequestIdx})}else {if(t.isPanic)throw new x.PrismaClientRustPanicError(l,this.client._clientVersion);if(t instanceof x.PrismaClientUnknownRequestError)throw new x.PrismaClientUnknownRequestError(l,{clientVersion:this.client._clientVersion,batchRequestIdx:t.batchRequestIdx});if(t instanceof x.PrismaClientInitializationError)throw new x.PrismaClientInitializationError(l,this.client._clientVersion);if(t instanceof x.PrismaClientRustPanicError)throw new x.PrismaClientRustPanicError(l,this.client._clientVersion)}throw t.clientVersion=this.client._clientVersion,t}sanitizeMessage(t){return this.client._errorFormat&&this.client._errorFormat!=="pretty"?De(t):t}unpack(t,r,n){if(!t||(t.data&&(t=t.data),!t))return t;let i=Object.keys(t)[0],o=Object.values(t)[0],s=r.filter(u=>u!=="select"&&u!=="include"),a=yn(o,s),l=i==="queryRaw"?Qr(a):Z(a);return n?n(l):l}get[Symbol.toStringTag](){return "RequestHandler"}};function vm(e){if(e){if(e.kind==="batch")return {kind:"batch",options:{isolationLevel:e.isolationLevel,maxWait:e.maxWait,timeout:e.timeout}};if(e.kind==="itx")return {kind:"itx",options:Ol(e)};ae(e,"Unknown transaction kind");}}function Ol(e){return {id:e.id,payload:e.payload}}function Am(e,t){return (0, Il.hasBatchIndex)(e)&&t?.kind==="batch"&&e.batchRequestIdx!==t.index}function Cm(e){return e.code==="P2009"||e.code==="P2012"}function Nl(e){if(e.kind==="Union")return {kind:"Union",errors:e.errors.map(Nl)};if(Array.isArray(e.selectionPath)){let[,...t]=e.selectionPath;return {...e,selectionPath:t}}return e}var gi=Fr;var $l=B(an());var v=class extends Error{constructor(t){super(t+`
Read more at https://pris.ly/d/client-constructor`),this.name="PrismaClientConstructorValidationError";}get[Symbol.toStringTag](){return "PrismaClientConstructorValidationError"}};yt(v,"PrismaClientConstructorValidationError");var Dl=["errorFormat","adapter","accelerateUrl","log","transactionOptions","omit","comments","queryPlanCacheMaxSize","__internal"],Ml=["pretty","colorless","minimal"],Fl=["info","query","warn","error"],Rm={adapter:()=>{},accelerateUrl:e=>{if(e!==void 0){if(typeof e!="string")throw new v(`Invalid value ${JSON.stringify(e)} for "accelerateUrl" provided to PrismaClient constructor.`);if(e.trim().length===0)throw new v('"accelerateUrl" provided to PrismaClient constructor must be a non-empty string.')}},errorFormat:e=>{if(e){if(typeof e!="string")throw new v(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);if(!Ml.includes(e)){let t=Bt(e,Ml);throw new v(`Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`)}}},log:e=>{if(!e)return;if(!Array.isArray(e))throw new v(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);function t(r){if(typeof r=="string"&&!Fl.includes(r)){let n=Bt(r,Fl);throw new v(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`)}}for(let r of e){t(r);let n={level:t,emit:i=>{let o=["stdout","event"];if(!o.includes(i)){let s=Bt(i,o);throw new v(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`)}}};if(r&&typeof r=="object")for(let[i,o]of Object.entries(r))if(n[i])n[i](o);else throw new v(`Invalid property ${i} for "log" provided to PrismaClient constructor`)}},transactionOptions:e=>{if(!e)return;let t=e.maxWait;if(t!=null&&t<=0)throw new v(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);let r=e.timeout;if(r!=null&&r<=0)throw new v(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`)},omit:(e,t)=>{if(typeof e!="object")throw new v('"omit" option is expected to be an object.');if(e===null)throw new v('"omit" option can not be `null`');let r=[];for(let[n,i]of Object.entries(e)){let o=Om(n,t.runtimeDataModel);if(!o){r.push({kind:"UnknownModel",modelKey:n});continue}for(let[s,a]of Object.entries(i)){let l=o.fields.find(u=>u.name===s);if(!l){r.push({kind:"UnknownField",modelKey:n,fieldName:s});continue}if(l.relationName){r.push({kind:"RelationInOmit",modelKey:n,fieldName:s});continue}typeof a!="boolean"&&r.push({kind:"InvalidFieldValue",modelKey:n,fieldName:s});}}if(r.length>0)throw new v(Nm(e,r))},queryPlanCacheMaxSize:e=>{if(e!==void 0){if(typeof e!="number")throw new v(`Invalid value ${JSON.stringify(e)} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Expected a number.`);if(!Number.isInteger(e))throw new v(`Invalid value ${e} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Expected an integer.`);if(e<0)throw new v(`Invalid value ${e} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Cache size needs to be greater or equal to 0.`)}},comments:e=>{if(e!==void 0){if(!Array.isArray(e))throw new v(`Invalid value ${JSON.stringify(e)} for "comments" provided to PrismaClient constructor. Expected an array of SQL commenter plugins.`);for(let t=0;t<e.length;t++)if(typeof e[t]!="function")throw new v(`Invalid value at index ${t} for "comments" provided to PrismaClient constructor. Each plugin must be a function.`)}},__internal:e=>{if(!e)return;let t=["debug","engine","configOverride"];if(typeof e!="object")throw new v(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);for(let[r]of Object.entries(e))if(!t.includes(r)){let n=Bt(r,t);throw new v(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`)}}};function km(e){let t=e.adapter!==void 0,r=e.accelerateUrl!==void 0;if(t&&r)throw new v('The "adapter" and "accelerateUrl" options are mutually exclusive. Please provide only one of them.');if(!t&&!r)throw new v(`PrismaClient requires a driver adapter to connect to your database, but none was provided.

Pass a driver adapter to the PrismaClient constructor, for example:

  import { PrismaPg } from '@prisma/adapter-pg'
  import { PrismaClient } from './generated/prisma/client'

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

Learn more about driver adapters: https://pris.ly/d/driver-adapters

If you use Prisma Accelerate instead of connecting to your database directly, pass \`accelerateUrl\` to the PrismaClient constructor instead of \`adapter\`.`)}function Ll(e,t){for(let[r,n]of Object.entries(e)){if(!Dl.includes(r)){let i=Bt(r,Dl);throw new v(`Unknown property ${r} provided to PrismaClient constructor.${i}`)}Rm[r](n,t);}km(e);}function Bt(e,t){if(t.length===0||typeof e!="string")return "";let r=Im(e,t);return r?` Did you mean "${r}"?`:""}function Im(e,t){if(t.length===0)return null;let r=t.map(i=>({value:i,distance:(0, $l.default)(e,i)}));r.sort((i,o)=>i.distance<o.distance?-1:1);let n=r[0];return n.distance<3?n.value:null}function Om(e,t){return _l(t.models,e)??_l(t.types,e)}function _l(e,t){let r=Object.keys(e).find(n=>de(n)===t);if(r)return e[r]}function Nm(e,t){let r=Qe(e);for(let o of t)switch(o.kind){case "UnknownModel":r.arguments.getField(o.modelKey)?.markAsError(),r.addErrorMessage(()=>`Unknown model name: ${o.modelKey}.`);break;case "UnknownField":r.arguments.getDeepField([o.modelKey,o.fieldName])?.markAsError(),r.addErrorMessage(()=>`Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);break;case "RelationInOmit":r.arguments.getDeepField([o.modelKey,o.fieldName])?.markAsError(),r.addErrorMessage(()=>'Relations are already excluded by default and can not be specified in "omit".');break;case "InvalidFieldValue":r.arguments.getDeepFieldValue([o.modelKey,o.fieldName])?.markAsError(),r.addErrorMessage(()=>"Omit field option value must be a boolean.");break}let{message:n,args:i}=sr(r,"colorless");return `Error validating "omit" option:

${i}

${n}`}var Vl=require$$1;function ql(e){return e.length===0?Promise.resolve([]):new Promise((t,r)=>{let n=new Array(e.length),i=null,o=false,s=0,a=()=>{o||(s++,s===e.length&&(o=true,i?r(i):t(n)));},l=u=>{o||(o=true,r(u));};for(let u=0;u<e.length;u++)e[u].then(c=>{n[u]=c,a();},c=>{if(!(0, Vl.hasBatchIndex)(c)){l(c);return}c.batchRequestIdx===u?l(c):(i||(i=c),a());});})}var nt=_("prisma:client");typeof globalThis=="object"&&(globalThis.NODE_CLIENT=true);var Dm={requestArgsToMiddlewareArgs:e=>e,middlewareArgsToRequestArgs:e=>e},Hl=Symbol.for("prisma.client.transaction.scope_context");function jl(e){let r=e[Hl];if(r===void 0)return {kind:"top-level"};if(Mm(r))return r;throw new Error("Internal error: inconsistent transaction scope context.")}function Mm(e){if(typeof e!="object"||e===null)return  false;let t=e;return t.kind==="nested"&&typeof t.txId=="string"&&typeof t.scopeId=="string"&&Fm(t.scopeState)}function Fm(e){return typeof e!="object"||e===null?false:Array.isArray(e.stack)}function _m(){return typeof globalThis.crypto?.randomUUID=="function"?globalThis.crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`}var $m={id:0,nextId(){return ++this.id}};function Gl(e){class t{_originalClient=this;_runtimeDataModel;_requestHandler;_connectionPromise;_disconnectionPromise;_engineConfig;_accelerateEngineConfig;_clientVersion;_errorFormat;_tracingHelper;_previewFeatures;_activeProvider;_globalOmit;_extensions;_engine;_appliedParent;_createPrismaPromise=ci();constructor(n){if(!n)throw new x.PrismaClientInitializationError(`PrismaClient was instantiated without any options. A driver adapter is required to connect to your database.

Pass a driver adapter to the PrismaClient constructor, for example:

  import { PrismaPg } from '@prisma/adapter-pg'
  import { PrismaClient } from './generated/prisma/client'

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

Learn more about driver adapters: https://pris.ly/d/driver-adapters

If you use Prisma Accelerate instead of connecting to your database directly, pass \`accelerateUrl\` to the PrismaClient constructor instead of \`adapter\`.`,gi);e=n.__internal?.configOverride?.(e)??e,Ll(n,e);let i=new Jl.EventEmitter().on("error",()=>{});this._extensions=Je.empty(),this._previewFeatures=e.previewFeatures,this._clientVersion=e.clientVersion??gi,this._activeProvider=e.activeProvider,this._globalOmit=n?.omit,this._tracingHelper=Al();let o;if(n.adapter){o=n.adapter;let s=e.activeProvider==="postgresql"||e.activeProvider==="cockroachdb"?"postgres":e.activeProvider;if(o.provider!==s)throw new x.PrismaClientInitializationError(`The Driver Adapter \`${o.adapterName}\`, based on \`${o.provider}\`, is not compatible with the provider \`${s}\` specified in the Prisma schema.`,this._clientVersion)}try{let s=n??{},l=(s.__internal??{}).debug===!0;if(l&&_.enable("prisma:client"),s.errorFormat?this._errorFormat=s.errorFormat:"production"==="production"?this._errorFormat="minimal":process.env.NO_COLOR?this._errorFormat="colorless":this._errorFormat="colorless",this._runtimeDataModel=e.runtimeDataModel,this._engineConfig={enableDebugLogs:l,logLevel:s.log&&Rl(s.log),logQueries:s.log&&!!(typeof s.log=="string"?s.log==="query":s.log.find(u=>typeof u=="string"?u==="query":u.level==="query")),compilerWasm:e.compilerWasm,clientVersion:e.clientVersion,previewFeatures:this._previewFeatures,activeProvider:e.activeProvider,inlineSchema:e.inlineSchema,tracingHelper:this._tracingHelper,transactionOptions:{maxWait:s.transactionOptions?.maxWait??2e3,timeout:s.transactionOptions?.timeout??5e3,isolationLevel:s.transactionOptions?.isolationLevel},logEmitter:i,adapter:o,accelerateUrl:s.accelerateUrl,sqlCommenters:s.comments,parameterizationSchema:e.parameterizationSchema,runtimeDataModel:e.runtimeDataModel,queryPlanCacheMaxSize:n.queryPlanCacheMaxSize},this._accelerateEngineConfig=Object.create(this._engineConfig),this._accelerateEngineConfig.accelerateUtils={resolveDatasourceUrl:()=>{if(s.accelerateUrl)return s.accelerateUrl;throw new x.PrismaClientInitializationError(`\`accelerateUrl\` is required when using \`@prisma/extension-accelerate\`:

new PrismaClient({
  accelerateUrl: "prisma://...",
}).$extends(withAccelerate())
`,e.clientVersion)}},nt("clientVersion",e.clientVersion),this._engine=cl(this._engineConfig),this._requestHandler=new Jr(this,i),s.log)for(let u of s.log){let c=typeof u=="string"?u:u.emit==="stdout"?u.level:null;c&&this.$on(c,p=>{ft.log(`${ft.tags[c]??""}`,p.message||p.query);});}}catch(s){throw s.clientVersion=this._clientVersion,s}return this._appliedParent=At(this)}get[Symbol.toStringTag](){return "PrismaClient"}$on(n,i){return n==="beforeExit"?this._engine.onBeforeExit(i):n&&this._engineConfig.logEmitter.on(n,i),this}$connect(){try{return this._engine.start()}catch(n){throw n.clientVersion=this._clientVersion,n}}async $disconnect(){try{await this._engine.stop();}catch(n){throw n.clientVersion=this._clientVersion,n}finally{Oi();}}$executeRawInternal(n,i,o,s){let a=this._activeProvider;return this._request({action:"executeRaw",args:o,transaction:n,clientMethod:i,argsMapper:ui({clientMethod:i,activeProvider:a}),callsite:fe(this._errorFormat),dataPath:[],middlewareArgsMapper:s})}$executeRaw(n,...i){return this._createPrismaPromise(o=>{if(n.raw!==void 0||n.sql!==void 0){let[s,a]=Ul(n,i);return li(this._activeProvider,s.text,s.values,Array.isArray(n)?"prisma.$executeRaw`<SQL>`":"prisma.$executeRaw(sql`<SQL>`)"),this.$executeRawInternal(o,"$executeRaw",s,a)}throw new x.PrismaClientValidationError("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n",{clientVersion:this._clientVersion})})}$executeRawUnsafe(n,...i){return this._createPrismaPromise(o=>(li(this._activeProvider,n,i,"prisma.$executeRawUnsafe(<SQL>, [...values])"),this.$executeRawInternal(o,"$executeRawUnsafe",[n,...i])))}$runCommandRaw(n){if(e.activeProvider!=="mongodb")throw new x.PrismaClientValidationError(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`,{clientVersion:this._clientVersion});return this._createPrismaPromise(i=>this._request({args:n,clientMethod:"$runCommandRaw",dataPath:[],action:"runCommandRaw",argsMapper:pl,callsite:fe(this._errorFormat),transaction:i}))}async $queryRawInternal(n,i,o,s){let a=this._activeProvider;return this._request({action:"queryRaw",args:o,transaction:n,clientMethod:i,argsMapper:ui({clientMethod:i,activeProvider:a}),callsite:fe(this._errorFormat),dataPath:[],middlewareArgsMapper:s})}$queryRaw(n,...i){return this._createPrismaPromise(o=>{if(n.raw!==void 0||n.sql!==void 0)return this.$queryRawInternal(o,"$queryRaw",...Ul(n,i));throw new x.PrismaClientValidationError("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n",{clientVersion:this._clientVersion})})}$queryRawTyped(n){return this._createPrismaPromise(i=>{if(!this._hasPreviewFlag("typedSql"))throw new x.PrismaClientValidationError("`typedSql` preview feature must be enabled in order to access $queryRawTyped API",{clientVersion:this._clientVersion});return this.$queryRawInternal(i,"$queryRawTyped",n)})}$queryRawUnsafe(n,...i){return this._createPrismaPromise(o=>this.$queryRawInternal(o,"$queryRawUnsafe",[n,...i]))}_transactionWithArray({promises:n,options:i}){let o=$m.nextId(),s=Cl(n.length),a=n.map((l,u)=>{if(l?.[Symbol.toStringTag]!=="PrismaPromise")throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");let c=i?.isolationLevel??this._engineConfig.transactionOptions.isolationLevel,p={kind:"batch",id:o,index:u,isolationLevel:c,maxWait:i?.maxWait??this._engineConfig.transactionOptions.maxWait,timeout:i?.timeout??this._engineConfig.transactionOptions.timeout,lock:s};return l.requestTransaction?.(p)??l});return ql(a)}async _transactionWithCallback({callback:n,options:i={}}){let o=jl(this),s=o.kind==="nested",a=s?o.scopeState:{stack:[]},l=a.stack,u=_m();if(s){if(l.at(-1)!==o.scopeId)throw new Error("Concurrent nested transactions are not supported");i.newTxId=o.txId;}l.push(u);let c={traceparent:this._tracingHelper.getTraceParent()},p={maxWait:i?.maxWait??this._engineConfig.transactionOptions.maxWait,timeout:i?.timeout??this._engineConfig.transactionOptions.timeout,isolationLevel:i?.isolationLevel??this._engineConfig.transactionOptions.isolationLevel,newTxId:i.newTxId},d;try{d=await this._engine.transaction("start",c,p);}catch(m){throw l.at(-1)===u&&l.pop(),m}let h;try{let m={kind:"itx",...d};if(h=await n(this._createItxClient(m,u,a)),s){if(l.at(-1)!==u)throw new Error("Nested transactions must be closed in reverse order of creation.")}else if(l.length!==1)throw new Error("Cannot close transaction while a nested transaction is still active.");await this._engine.transaction("commit",c,d);}catch(m){let k=l.at(-1)!==u?Math.max(1,l.length):1;for(let w=0;w<k;w++)await this._engine.transaction("rollback",c,d).catch(P=>{nt("rollback attempt %d/%d failed: %O",w+1,k,P);});throw m}finally{l.at(-1)===u?l.pop():l.length=0;}return h}_createItxClient(n,i,o){let s={kind:"nested",txId:n.id,scopeId:i,scopeState:o};return W(At(W(Uo(this),[$("_appliedParent",()=>this._appliedParent._createItxClient(n,i,o)),$("_createPrismaPromise",()=>ci(n)),$(Hl,()=>s)])),[He(Go)])}$transaction(n,i){let o;typeof n=="function"?this._engineConfig.adapter?.adapterName==="@prisma/adapter-d1"?o=()=>{throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.")}:e.activeProvider==="mongodb"&&jl(this).kind==="nested"?o=()=>{throw new x.PrismaClientValidationError(`The ${e.activeProvider} provider does not support nested transactions`,{clientVersion:this._clientVersion})}:o=()=>this._transactionWithCallback({callback:n,options:i}):o=()=>this._transactionWithArray({promises:n,options:i});let s={name:"transaction",attributes:{method:"$transaction"}};return this._tracingHelper.runInChildSpan(s,o)}_request(n){n.otelParentCtx=this._tracingHelper.getActiveContext();let i=n.middlewareArgsMapper??Dm,o={args:i.requestArgsToMiddlewareArgs(n.args),dataPath:n.dataPath,runInTransaction:!!n.transaction,action:n.action,model:n.model},s={operation:{name:"operation",attributes:{method:o.action,model:o.model,name:o.model?`${o.model}.${o.action}`:o.action}}},a=async l=>{let{runInTransaction:u,args:c,...p}=l,d={...n,...p};c&&(d.args=i.middlewareArgsToRequestArgs(c)),n.transaction!==void 0&&u===false&&delete d.transaction;let h=await Zo(this,d);if(!d.model)return h;let m=rs({dataPath:d.dataPath,modelName:d.model,args:d.args,runtimeDataModel:this._runtimeDataModel});return Ho({result:h,modelName:m.modelName,args:m.args,extensions:this._extensions,runtimeDataModel:this._runtimeDataModel,globalOmit:this._globalOmit})};return this._tracingHelper.runInChildSpan(s.operation,()=>new Ql.AsyncResource("prisma-client-request").runInAsyncScope(()=>a(o)))}async _executeRequest({args:n,clientMethod:i,dataPath:o,callsite:s,action:a,model:l,argsMapper:u,transaction:c,unpacker:p,otelParentCtx:d,customDataProxyFetch:h}){try{n=u?u(n):n;let m={name:"serialize"},E=this._tracingHelper.runInChildSpan(m,()=>pr({modelName:l,runtimeDataModel:this._runtimeDataModel,action:a,args:n,clientMethod:i,callsite:s,extensions:this._extensions,errorFormat:this._errorFormat,clientVersion:this._clientVersion,previewFeatures:this._previewFeatures,globalOmit:this._globalOmit}));return _.enabled("prisma:client")&&(nt("Prisma Client call:"),nt(`prisma.${i}(${Oo(n)})`),nt("Generated request:"),nt(JSON.stringify(E,null,2)+`
`)),c?.kind==="batch"&&await c.lock,this._requestHandler.request({protocolQuery:E,modelName:l,action:a,clientMethod:i,dataPath:o,callsite:s,args:n,extensions:this._extensions,transaction:c,unpacker:p,otelParentCtx:d,otelChildCtx:this._tracingHelper.getActiveContext(),globalOmit:this._globalOmit,customDataProxyFetch:h})}catch(m){throw m.clientVersion=this._clientVersion,m}}_hasPreviewFlag(n){return !!this._engineConfig.previewFeatures?.includes(n)}$extends=Bo}return t}function Ul(e,t){return Lm(e)?[new Bl.Sql(e,t),xl]:[e,Pl]}function Lm(e){return Array.isArray(e)&&Array.isArray(e.raw)}var Vm=new Set(["toJSON","$$typeof","asymmetricMatch",Symbol.iterator,Symbol.toStringTag,Symbol.isConcatSpreadable,Symbol.toPrimitive]);function zl(e){return new Proxy(e,{get(t,r){if(r in t)return t[r];if(!Vm.has(r))throw new TypeError(`Invalid enum value: ${String(r)}`)}})}var qm=()=>globalThis.process?.release?.name==="node",jm=()=>!!globalThis.Bun||!!globalThis.process?.versions?.bun,Um=()=>!!globalThis.Deno,Bm=()=>typeof globalThis.Netlify=="object",Qm=()=>typeof globalThis.EdgeRuntime=="object",Jm=()=>globalThis.navigator?.userAgent==="Cloudflare-Workers";function Hm(){return [[Bm,"netlify"],[Qm,"edge-light"],[Jm,"workerd"],[Um,"deno"],[jm,"bun"],[qm,"node"]].flatMap(r=>r[0]()?[r[1]]:[]).at(0)??""}var Gm={node:"Node.js",workerd:"Cloudflare Workers",deno:"Deno and Deno Deploy",netlify:"Netlify Edge Functions","edge-light":"Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)"};function Wl(){let e=Hm();return {id:e,prettyName:Gm[e]||e,isEdge:["workerd","deno","netlify","edge-light"].includes(e)}}var x=require$$1,oe=require$$1,N=require$$1,Kl=require$$1;

const config = {
  "previewFeatures": [],
  "clientVersion": "7.9.0",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel AdminUser {\n  id           String   @id @default(cuid())\n  username     String   @unique\n  passwordHash String\n  passwordSalt String\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n}\n\n// Registro de toda tentativa de acesso a \xE1rea de mensagens \u2014 autorizada ou n\xE3o.\nmodel DeviceAccessLog {\n  id         String   @id @default(cuid())\n  ip         String\n  userAgent  String\n  username   String?\n  authorized Boolean\n  reason     String\n  createdAt  DateTime @default(now())\n\n  @@index([authorized])\n  @@index([ip])\n  @@index([createdAt])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"AdminUser":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"username","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String"},{"name":"passwordSalt","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"DeviceAccessLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"ip","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"username","kind":"scalar","type":"String"},{"name":"authorized","kind":"scalar","type":"Boolean"},{"name":"reason","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","AdminUser.findUnique","AdminUser.findUniqueOrThrow","orderBy","cursor","AdminUser.findFirst","AdminUser.findFirstOrThrow","AdminUser.findMany","data","AdminUser.createOne","AdminUser.createMany","AdminUser.createManyAndReturn","AdminUser.updateOne","AdminUser.updateMany","AdminUser.updateManyAndReturn","create","update","AdminUser.upsertOne","AdminUser.deleteOne","AdminUser.deleteMany","having","_count","_min","_max","AdminUser.groupBy","AdminUser.aggregate","DeviceAccessLog.findUnique","DeviceAccessLog.findUniqueOrThrow","DeviceAccessLog.findFirst","DeviceAccessLog.findFirstOrThrow","DeviceAccessLog.findMany","DeviceAccessLog.createOne","DeviceAccessLog.createMany","DeviceAccessLog.createManyAndReturn","DeviceAccessLog.updateOne","DeviceAccessLog.updateMany","DeviceAccessLog.updateManyAndReturn","DeviceAccessLog.upsertOne","DeviceAccessLog.deleteOne","DeviceAccessLog.deleteMany","DeviceAccessLog.groupBy","DeviceAccessLog.aggregate","AND","OR","NOT","id","ip","userAgent","username","authorized","reason","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","passwordHash","passwordSalt","updatedAt","set"]'),
  graph: "UxEgCSoAAEgAMCsAAAQAECwAAEgAMC0BAAAAATABAAAAATNAAEYAIT8BAEMAIUABAEMAIUFAAEYAIQEAAAABACABAAAAAQAgCSoAAEgAMCsAAAQAECwAAEgAMC0BAEMAITABAEMAITNAAEYAIT8BAEMAIUABAEMAIUFAAEYAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAGLQEAAAABMAEAAAABM0AAAAABPwEAAAABQAEAAAABQUAAAAABAQgAAAkAIAYtAQAAAAEwAQAAAAEzQAAAAAE_AQAAAAFAAQAAAAFBQAAAAAEBCAAACwAwAQgAAAsAMAYtAQBNACEwAQBNACEzQABQACE_AQBNACFAAQBNACFBQABQACECAAAAAQAgCAAADgAgBi0BAE0AITABAE0AITNAAFAAIT8BAE0AIUABAE0AIUFAAFAAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgAxUAAFEAIBYAAFMAIBcAAFIAIAkqAABHADArAAAXABAsAABHADAtAQA0ACEwAQA0ACEzQAA3ACE_AQA0ACFAAQA0ACFBQAA3ACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAoqAABCADArAAAdABAsAABCADAtAQAAAAEuAQBDACEvAQBDACEwAQBEACExIABFACEyAQBDACEzQABGACEBAAAAGgAgAQAAABoAIAoqAABCADArAAAdABAsAABCADAtAQBDACEuAQBDACEvAQBDACEwAQBEACExIABFACEyAQBDACEzQABGACEBMAAASQAgAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgBy0BAAAAAS4BAAAAAS8BAAAAATABAAAAATEgAAAAATIBAAAAATNAAAAAAQEIAAAiACAHLQEAAAABLgEAAAABLwEAAAABMAEAAAABMSAAAAABMgEAAAABM0AAAAABAQgAACQAMAEIAAAkADAHLQEATQAhLgEATQAhLwEATQAhMAEATgAhMSAATwAhMgEATQAhM0AAUAAhAgAAABoAIAgAACcAIActAQBNACEuAQBNACEvAQBNACEwAQBOACExIABPACEyAQBNACEzQABQACECAAAAHQAgCAAAKQAgAgAAAB0AIAgAACkAIAMAAAAaACAPAAAiACAQAAAnACABAAAAGgAgAQAAAB0AIAQVAABKACAWAABMACAXAABLACAwAABJACAKKgAAMwAwKwAAMAAQLAAAMwAwLQEANAAhLgEANAAhLwEANAAhMAEANQAhMSAANgAhMgEANAAhM0AANwAhAwAAAB0AIAMAAC8AMBQAADAAIAMAAAAdACADAAAeADAEAAAaACAKKgAAMwAwKwAAMAAQLAAAMwAwLQEANAAhLgEANAAhLwEANAAhMAEANQAhMSAANgAhMgEANAAhM0AANwAhDhUAADkAIBYAAEEAIBcAAEEAIDQBAAAAATUBAAAABDYBAAAABDcBAAAAATgBAAAAATkBAAAAAToBAAAAATsBAEAAITwBAAAAAT0BAAAAAT4BAAAAAQ4VAAA-ACAWAAA_ACAXAAA_ACA0AQAAAAE1AQAAAAU2AQAAAAU3AQAAAAE4AQAAAAE5AQAAAAE6AQAAAAE7AQA9ACE8AQAAAAE9AQAAAAE-AQAAAAEFFQAAOQAgFgAAPAAgFwAAPAAgNCAAAAABOyAAOwAhCxUAADkAIBYAADoAIBcAADoAIDRAAAAAATVAAAAABDZAAAAABDdAAAAAAThAAAAAATlAAAAAATpAAAAAATtAADgAIQsVAAA5ACAWAAA6ACAXAAA6ACA0QAAAAAE1QAAAAAQ2QAAAAAQ3QAAAAAE4QAAAAAE5QAAAAAE6QAAAAAE7QAA4ACEINAIAAAABNQIAAAAENgIAAAAENwIAAAABOAIAAAABOQIAAAABOgIAAAABOwIAOQAhCDRAAAAAATVAAAAABDZAAAAABDdAAAAAAThAAAAAATlAAAAAATpAAAAAATtAADoAIQUVAAA5ACAWAAA8ACAXAAA8ACA0IAAAAAE7IAA7ACECNCAAAAABOyAAPAAhDhUAAD4AIBYAAD8AIBcAAD8AIDQBAAAAATUBAAAABTYBAAAABTcBAAAAATgBAAAAATkBAAAAAToBAAAAATsBAD0AITwBAAAAAT0BAAAAAT4BAAAAAQg0AgAAAAE1AgAAAAU2AgAAAAU3AgAAAAE4AgAAAAE5AgAAAAE6AgAAAAE7AgA-ACELNAEAAAABNQEAAAAFNgEAAAAFNwEAAAABOAEAAAABOQEAAAABOgEAAAABOwEAPwAhPAEAAAABPQEAAAABPgEAAAABDhUAADkAIBYAAEEAIBcAAEEAIDQBAAAAATUBAAAABDYBAAAABDcBAAAAATgBAAAAATkBAAAAAToBAAAAATsBAEAAITwBAAAAAT0BAAAAAT4BAAAAAQs0AQAAAAE1AQAAAAQ2AQAAAAQ3AQAAAAE4AQAAAAE5AQAAAAE6AQAAAAE7AQBBACE8AQAAAAE9AQAAAAE-AQAAAAEKKgAAQgAwKwAAHQAQLAAAQgAwLQEAQwAhLgEAQwAhLwEAQwAhMAEARAAhMSAARQAhMgEAQwAhM0AARgAhCzQBAAAAATUBAAAABDYBAAAABDcBAAAAATgBAAAAATkBAAAAAToBAAAAATsBAEEAITwBAAAAAT0BAAAAAT4BAAAAAQs0AQAAAAE1AQAAAAU2AQAAAAU3AQAAAAE4AQAAAAE5AQAAAAE6AQAAAAE7AQA_ACE8AQAAAAE9AQAAAAE-AQAAAAECNCAAAAABOyAAPAAhCDRAAAAAATVAAAAABDZAAAAABDdAAAAAAThAAAAAATlAAAAAATpAAAAAATtAADoAIQkqAABHADArAAAXABAsAABHADAtAQA0ACEwAQA0ACEzQAA3ACE_AQA0ACFAAQA0ACFBQAA3ACEJKgAASAAwKwAABAAQLAAASAAwLQEAQwAhMAEAQwAhM0AARgAhPwEAQwAhQAEAQwAhQUAARgAhAAAAAAFCAQAAAAEBQgEAAAABAUIgAAAAAQFCQAAAAAEAAAAAAAAAAxUABhYABxcACAAAAAMVAAYWAAcXAAgAAAADFQAOFgAPFwAQAAAAAxUADhYADxcAEAECAQIDAQUGAQYHAQcIAQkKAQoMAgsNAwwPAQ0RAg4SBBETARIUARMVAhgYBRkZCRobChscChwfCh0gCh4hCh8jCiAlAiEmCyIoCiMqAiQrDCUsCiYtCicuAigxDSkyEQ"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import('node:buffer');
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import('@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs'),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import('@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs');
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return client.getPrismaClient(config);
}

globalThis["__dirname"] = node_path.dirname(fileURLToPath(globalThis._importMeta_.url));
const PrismaClient = getPrismaClientClass();

var _a;
const globalForPrisma = globalThis;
function createPrismaClient() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}
const prisma = (_a = globalForPrisma.prisma) != null ? _a : createPrismaClient();

const KEY_LENGTH = 64;
function verifyPassword(password, salt, hash) {
  const candidate = scryptSync(password, salt, KEY_LENGTH);
  const stored = Buffer.from(hash, "hex");
  if (candidate.length !== stored.length) return false;
  return timingSafeEqual(candidate, stored);
}

const DUMMY_SALT = "0".repeat(32);
const DUMMY_HASH = "0".repeat(128);
function getClientIp(event) {
  var _a, _b;
  const forwarded = getHeader(event, "x-forwarded-for");
  if (forwarded) return ((_a = forwarded.split(",")[0]) == null ? void 0 : _a.trim()) || "unknown";
  return (_b = event.node.req.socket.remoteAddress) != null ? _b : "unknown";
}
async function logAttempt(params) {
  try {
    await prisma.deviceAccessLog.create({ data: params });
  } catch {
  }
}
function denyAuth(event) {
  setResponseHeader(event, "WWW-Authenticate", 'Basic realm="Mensagens"');
  throw createError$1({ statusCode: 401, statusMessage: "N\xE3o autorizado" });
}
const _ug2CZB = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const url = (_a = event.node.req.url) != null ? _a : "";
  const method = (_b = event.node.req.method) != null ? _b : "GET";
  const isMessagesApi = url.startsWith("/api/messages");
  const isPublicSubmit = isMessagesApi && method === "POST";
  const needsAuth = isMessagesApi && !isPublicSubmit;
  if (!needsAuth) return;
  const ip = getClientIp(event);
  const userAgent = (_c = getHeader(event, "user-agent")) != null ? _c : "unknown";
  const header = getHeader(event, "authorization");
  try {
    if (!(header == null ? void 0 : header.startsWith("Basic "))) {
      await logAttempt({ ip, userAgent, authorized: false, reason: "missing_credentials" });
      return denyAuth(event);
    }
    const decoded = Buffer.from(header.slice(6), "base64").toString();
    const separatorIndex = decoded.indexOf(":");
    const username = separatorIndex === -1 ? "" : decoded.slice(0, separatorIndex);
    const password = separatorIndex === -1 ? "" : decoded.slice(separatorIndex + 1);
    if (!username || !password) {
      await logAttempt({ ip, userAgent, authorized: false, reason: "malformed_credentials" });
      return denyAuth(event);
    }
    const admin = await prisma.adminUser.findUnique({ where: { username } });
    const validPassword = admin ? verifyPassword(password, admin.passwordSalt, admin.passwordHash) : (verifyPassword(password, DUMMY_SALT, DUMMY_HASH), false);
    if (!admin || !validPassword) {
      await logAttempt({ ip, userAgent, username, authorized: false, reason: "invalid_credentials" });
      return denyAuth(event);
    }
    await logAttempt({ ip, userAgent, username, authorized: true, reason: "login_success" });
  } catch (err) {
    if (err && typeof err === "object" && "statusCode" in err) throw err;
    await logAttempt({ ip, userAgent, authorized: false, reason: "auth_error" });
    return denyAuth(event);
  }
});

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

function baseURL() {
	
	return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
	
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const collections = {
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _kdIszj = defineCachedEventHandler(async (event) => {
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName && Object.hasOwn(collections, collectionName) ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = String(parseQuery(parsePath(event.path).search).icons || "").split(",");
  if (!collectionName) return createError$1({ status: 400, message: "No collection specified" });
  if (!icons.length) return createError$1({ status: 400, message: "No icons specified" });
  if (collection) {
    const data = getIcons(
      collection,
      icons
    );
    consola.debug(`[Icon] serving ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
    return data;
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL(`./${collectionName}.json?icons=${icons.join(",")}`, apiEndPoint);
    consola.debug(`[Icon] fetching ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola.error(e);
      if (e.status === 404)
        return createError$1({ status: 404 });
      else
        return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(parseQuery(parsePath(event.path).search).icons || "").split(",");
    return `${collection}_${icons[0]}_${icons.length}_${hash$1(icons.join(","))}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _SxA8c9 = defineEventHandler(() => {});

const _lazy_nok0KR = () => import('../routes/api/messages/_id_.delete.mjs');
const _lazy_WbOMBB = () => import('../routes/api/messages/_id_.patch.mjs');
const _lazy_N7iMFR = () => import('../routes/api/index.get.mjs');
const _lazy_uX_tey = () => import('../routes/api/index.post.mjs');
const _lazy_B2Brfx = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _ug2CZB, lazy: false, middleware: true, method: undefined },
  { route: '/api/messages/:id', handler: _lazy_nok0KR, lazy: true, middleware: false, method: "delete" },
  { route: '/api/messages/:id', handler: _lazy_WbOMBB, lazy: true, middleware: false, method: "patch" },
  { route: '/api/messages', handler: _lazy_N7iMFR, lazy: true, middleware: false, method: "get" },
  { route: '/api/messages', handler: _lazy_uX_tey, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_B2Brfx, lazy: true, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _kdIszj, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_B2Brfx, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C$1(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

export { $fetch$1 as $, joinURL as A, defuFn as B, sanitizeStatusCode as C, getContext as D, baseURL as E, executeAsync as F, defu as G, hash$1 as H, withTrailingSlash as I, withoutTrailingSlash as J, getRouterParam as a, useStorage as b, createError$1 as c, defineEventHandler as d, getQuery as e, getRequestIP as f, getRouteRulesForPath as g, buildAssetsURL as h, publicAssetsURL as i, useRuntimeConfig as j, encodePath as k, defineRenderHandler as l, destr as m, getRouteRules as n, getResponseStatusText as o, parseQuery as p, getResponseStatus as q, readBody as r, parseURL as s, toNodeListener as t, useNitroApp as u, decodePath as v, withQuery as w, klona as x, hasProtocol as y, isScriptProtocol as z };
//# sourceMappingURL=nitro.mjs.map
