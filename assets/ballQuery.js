
/**
 * $ob — OddBalls micro jQuery-like helper
 *
 * ---------------- Available Methods ----------------
 *
 * DOM Manipulation:
 *   html(content)      — Set innerHTML
 *   text(content)      — Set textContent
 *   val(value)         — Get/set input value
 *   append(content)    — Insert HTML at the end
 *   prepend(content)   — Insert HTML at the start
 *   before(content)    — Insert HTML before element
 *   after(content)     — Insert HTML after element
 *   remove()           — Remove element(s)
 *
 * Attributes & Properties:
 *   attr(name, value)  — Get/set attribute
 *   removeAttr(name)   — Remove attribute
 *   prop(name, value)  — Get/set property
 *
 * CSS & Classes:
 *   css(prop, val)     — Get/set style or object of styles
 *   addClass(className)
 *   removeClass(className)
 *   toggleClass(className)
 *   hasClass(className)
 *
 * Events:
 *   on(event, handler)               — Add normal event
 *   on(event, selector, handler)     — Add delegated event
 *   off(event, handler/selector)     — Remove event
 *   one(event, handler)              — Fire once
 *
 * Traversal:
 *   find(selector)
 *   children(selector)
 *   parent()
 *   closest(selector)
 *   siblings()
 *   next()
 *   prev()
 *   filter(fn)
 *   first()
 *   last()
 *
 * Effects:
 *   show()
 *   hide()
 *   fadeIn(duration)
 *   fadeOut(duration)
 *   slideUp(duration)
 *   slideDown(duration)
 *
 * Data:
 *   data(key, value)
 *   removeData(key)
 *
 * Iteration:
 *   each(fn)
 *
 * AJAX:
 *   ajax({ url, method, data, headers })
 *   get(url)
 *   post(url, data)
 *
 * ---------------- Usage Examples ----------------
 *
 * $ob('#my-button').on('click', () => console.log('Clicked!'));
 *
 * // Delegated click for dynamic buttons
 * $ob(document).on('click', '.dynamic-btn', function() {
 *   console.log('Clicked dynamic button:', this.textContent);
 * });
 *
 * $ob('#container').append('<button class="dynamic-btn">Click me</button>');
 *
 * // Chaining example
 * $ob('#container')
 *   .children('.dynamic-btn')
 *   .fadeIn(300)
 *   .addClass('highlight');
 *
 * // Working with data
 * $ob('#my-input').data('key', 'value');
 * console.log($ob('#my-input').data('key'));
 *
 * // AJAX
 * $ob().get('/api/data').then(console.log);
 */

// ===== OddBalls micro jQuery-like helper (scoped, jQuery-style, with document ready) =====
// ===== OddBalls micro jQuery-like helper (scoped, jQuery-style, with robust effects + document ready) =====
(function (global) {
  const __obDataStore = new WeakMap();

  // ----- helpers (scoped) -----
  function _normalize(sel) {
    if (typeof sel === "string") return [...document.querySelectorAll(sel)];
    if (sel instanceof Node || sel === window || sel instanceof Document) return [sel];
    if (sel instanceof NodeList || Array.isArray(sel)) return [...sel];
    if (sel && sel.length && sel[0] instanceof Node) return [...sel];
    return [];
  }
  function _each(ctx, fn) { for (let i = 0; i < ctx.length; i++) fn.call(ctx[i], ctx[i], i); return ctx; }
  function _first(ctx) { return ctx.length ? ctx[0] : undefined; }
  function _mapToArray(ctx, mapper) {
    const out = [];
    for (let i = 0; i < ctx.length; i++) {
      const v = mapper(ctx[i], i);
      if (v != null) out.push(v);
    }
    return out;
  }
  const _unique = arr => [...new Set(arr)];

  // display helpers: remember previous display to avoid forcing "block" on inline elements
  function _storePrevDisplay(el) {
    const cs = getComputedStyle(el);
    if (!el.dataset._obPrevDisplay && cs.display !== "none") {
      el.dataset._obPrevDisplay = cs.display;
    }
  }
  function _show(el) {
    el.classList.remove("hidden");
    const prev = el.dataset._obPrevDisplay || "";
    el.style.display = prev || ""; // fall back to ''
    if (getComputedStyle(el).display === "none") {
      // still none? pick a sensible default
      el.style.display = prev && prev !== "none" ? prev : "block";
    }
  }
  function _hide(el) {
    _storePrevDisplay(el);
    el.style.display = "none";
    el.classList.add("hidden");
  }

  // ----- constructor and factory -----
  function Ob(elems) {
    const len = elems.length;
    for (let i = 0; i < len; i++) this[i] = elems[i];
    this.length = len;
  }

  function $ob(selector) {
    // Document ready: $ob(fn)
    if (typeof selector === "function") {
      if (document.readyState !== "loading") {
        selector();
      } else {
        document.addEventListener("DOMContentLoaded", selector, { once: true });
      }
      return;
    }
    return new Ob(_normalize(selector));
  }

  $ob.fn = Ob.prototype;

  // ----- core conveniences -----
  $ob.fn.get = function (i = 0) { return this[i]; };
  $ob.fn.toArray = function () { return Array.from({ length: this.length }, (_, i) => this[i]); };
  $ob.fn[Symbol.iterator] = function* () { for (let i = 0; i < this.length; i++) yield this[i]; };
  $ob.fn.each = function (fn) { return _each(this, (el, i) => fn.call(el, i, el)); };

  // ----- DOM Manipulation -----
  $ob.fn.html = function (content) {
    if (content === undefined) return _first(this)?.innerHTML ?? "";
    return _each(this, el => {
      if (content && content instanceof Ob) { el.innerHTML = ""; for (const node of content) el.appendChild(node); }
      else if (content instanceof Node) { el.innerHTML = content.outerHTML; }
      else { el.innerHTML = content; }
    });
  };
  $ob.fn.text = function (content) {
    if (content === undefined) return _first(this)?.textContent ?? "";
    return _each(this, el => { el.textContent = content; });
  };
  $ob.fn.val = function (value) {
    if (value === undefined) { const el = _first(this); return el && "value" in el ? el.value : undefined; }
    return _each(this, el => { if ("value" in el) el.value = value; });
  };

  function _adjacent(ctx, content, where) {
    return _each(ctx, el => {
      if (content && content instanceof Ob) {
        for (const node of content) {
          if (where === "append") el.append(node);
          else if (where === "prepend") el.prepend(node);
          else if (where === "before") el.parentNode.insertBefore(node, el);
          else if (where === "after") el.parentNode.insertBefore(node, el.nextSibling);
        }
      } else if (content instanceof Node) {
        if (where === "append") el.append(content);
        else if (where === "prepend") el.prepend(content);
        else if (where === "before") el.parentNode.insertBefore(content, el);
        else if (where === "after") el.parentNode.insertBefore(content, el.nextSibling);
      } else {
        const pos = where === "append" ? "beforeend"
                : where === "prepend" ? "afterbegin"
                : where === "before" ? "beforebegin" : "afterend";
        el.insertAdjacentHTML(pos, content);
      }
    });
  }
  $ob.fn.append  = function (c) { return _adjacent(this, c, "append");  };
  $ob.fn.prepend = function (c) { return _adjacent(this, c, "prepend"); };
  $ob.fn.before  = function (c) { return _adjacent(this, c, "before");  };
  $ob.fn.after   = function (c) { return _adjacent(this, c, "after");   };
  $ob.fn.remove  = function () { return _each(this, el => el.remove()); };

  // ----- Attributes & Properties -----
  $ob.fn.attr = function (name, value) {
    if (value === undefined) return _first(this)?.getAttribute(name);
    return _each(this, el => el.setAttribute(name, value));
  };
  $ob.fn.removeAttr = function (name) { return _each(this, el => el.removeAttribute(name)); };
  $ob.fn.prop = function (name, value) {
    if (value === undefined) return _first(this)?.[name];
    return _each(this, el => { el[name] = value; });
  };

  // ----- CSS & Classes -----
  $ob.fn.css = function (prop, val) {
    if (typeof prop === "string" && val === undefined) return _first(this)?.style[prop];
    if (typeof prop === "object") return _each(this, el => Object.assign(el.style, prop));
    return _each(this, el => { el.style[prop] = val; });
  };
  $ob.fn.addClass = function (cls) { const p = cls.split(/\s+/).filter(Boolean); return _each(this, el => el.classList.add(...p)); };
  $ob.fn.removeClass = function (cls) { const p = cls.split(/\s+/).filter(Boolean); return _each(this, el => el.classList.remove(...p)); };
  $ob.fn.toggleClass = function (cls) { return _each(this, el => el.classList.toggle(cls)); };
  $ob.fn.hasClass = function (cls) { return Array.prototype.some.call(this, el => el.classList.contains(cls)); };

  // ----- Events (normal + delegation, with reliable off) -----
  function _evtStore(el) { if (!el.__obEvents) el.__obEvents = {}; return el.__obEvents; }
  $ob.fn.on = function (event, selectorOrHandler, maybeHandler) {
    const delegated = typeof selectorOrHandler === "string" && typeof maybeHandler === "function";
    const handler = delegated ? maybeHandler : selectorOrHandler;
    return _each(this, parent => {
      const store = _evtStore(parent);
      if (!store[event]) store[event] = [];
      const wrapped = delegated
        ? function (e) { const match = e.target.closest(selectorOrHandler); if (match && parent.contains(match)) handler.call(match, e); }
        : handler;
      store[event].push({ original: handler, selector: delegated ? selectorOrHandler : null, wrapped });
      parent.addEventListener(event, wrapped);
    });
  };
  $ob.fn.off = function (event, selectorOrHandler, maybeHandler) {
    const delegated = typeof selectorOrHandler === "string" && typeof maybeHandler === "function";
    const targetOriginal = delegated ? maybeHandler : selectorOrHandler;
    return _each(this, parent => {
      const store = parent.__obEvents && parent.__obEvents[event];
      if (!store) return;
      parent.__obEvents[event] = store.filter(rec => {
        const sameHandler = !targetOriginal || rec.original === targetOriginal;
        const sameSelector = !delegated || rec.selector === selectorOrHandler;
        if (sameHandler && sameSelector) { parent.removeEventListener(event, rec.wrapped); return false; }
        return true;
      });
    });
  };
  $ob.fn.one = function (event, fn) {
    return _each(this, el => {
      const once = function (...args) { fn.apply(el, args); el.removeEventListener(event, once); };
      el.addEventListener(event, once);
    });
  };

  // ----- Traversal -----
  $ob.fn.find = function (sel) { return $ob(_mapToArray(this, el => [...el.querySelectorAll(sel)]).flat()); };
  $ob.fn.children = function (sel) {
    return $ob(_mapToArray(this, el => sel ? [...el.querySelectorAll(`:scope > ${sel}`)] : [...el.children]).flat());
  };
  $ob.fn.parent = function () { return $ob(_unique(_mapToArray(this, el => el.parentElement).filter(Boolean))); };
  $ob.fn.closest = function (sel) { return $ob(_unique(_mapToArray(this, el => el.closest(sel)).filter(Boolean))); };
  $ob.fn.siblings = function () {
    return $ob(_unique(_mapToArray(this, el => [...el.parentNode.children].filter(sib => sib !== el)).flat()));
  };
  $ob.fn.next = function () { return $ob(_unique(_mapToArray(this, el => el.nextElementSibling).filter(Boolean))); };
  $ob.fn.prev = function () { return $ob(_unique(_mapToArray(this, el => el.previousElementSibling).filter(Boolean))); };
  $ob.fn.filter = function (fn) {
    const keep = [];
    for (let i = 0; i < this.length; i++) if (fn.call(this[i], i, this[i])) keep.push(this[i]);
    return $ob(keep);
  };
  $ob.fn.first = function () { return $ob(this.length ? [this[0]] : []); };
  $ob.fn.last  = function () { return $ob(this.length ? [this[this.length - 1]] : []); };

  // ----- Effects (robust) -----
  $ob.fn.show = function () { return _each(this, el => { _show(el); }); };
  $ob.fn.hide = function () { return _each(this, el => { _hide(el); }); };

  $ob.fn.fadeIn = function (duration = 400) {
    return _each(this, el => {
      _show(el);
      el.style.opacity = 0;
      let last = performance.now();
      (function tick(now) {
        const dt = now - last; last = now;
        const next = Math.min(parseFloat(el.style.opacity || 0) + dt / duration, 1);
        el.style.opacity = String(next);
        if (next < 1) requestAnimationFrame(tick);
      })(last);
    });
  };
  $ob.fn.fadeOut = function (duration = 400) {
    return _each(this, el => {
      el.style.opacity = el.style.opacity || 1;
      let last = performance.now();
      (function tick(now) {
        const dt = now - last; last = now;
        const next = Math.max(parseFloat(el.style.opacity || 1) - dt / duration, 0);
        el.style.opacity = String(next);
        if (next > 0) requestAnimationFrame(tick);
        else { _hide(el); el.style.opacity = ""; }
      })(last);
    });
  };

  $ob.fn.slideDown = function (duration = 400) {
    return _each(this, el => {
      _show(el);
      // measure target height
      el.style.height = "auto";
      const targetH = el.scrollHeight;
      el.style.height = "0px";
      el.style.overflow = "hidden";
      let start;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        el.style.height = (targetH * p) + "px";
        if (p < 1) requestAnimationFrame(step);
        else { el.style.height = ""; el.style.overflow = ""; }
      }
      requestAnimationFrame(step);
    });
  };

  $ob.fn.slideUp = function (duration = 400) {
    return _each(this, el => {
      _storePrevDisplay(el);
      const startH = el.offsetHeight;
      el.style.overflow = "hidden";
      let start;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        el.style.height = (startH * (1 - p)) + "px";
        if (p < 1) requestAnimationFrame(step);
        else { el.style.height = ""; el.style.overflow = ""; _hide(el); }
      }
      requestAnimationFrame(step);
    });
  };

  $ob.fn.slideToggle = function (duration = 400) {
    return _each(this, el => {
      const hidden = getComputedStyle(el).display === "none";
      hidden ? $ob(el).slideDown(duration) : $ob(el).slideUp(duration);
    });
  };

  // ----- Data -----
  $ob.fn.data = function (key, value) {
    if (value === undefined) return __obDataStore.get(_first(this))?.[key];
    return _each(this, el => {
      if (!__obDataStore.has(el)) __obDataStore.set(el, {});
      __obDataStore.get(el)[key] = value;
    });
  };
  $ob.fn.removeData = function (key) {
    return _each(this, el => { if (__obDataStore.has(el)) delete __obDataStore.get(el)[key]; });
  };

  // ----- Extras -----
  $ob.fn.eq = function (n) {
    const idx = n < 0 ? this.length + n : n;
    return (idx >= 0 && idx < this.length) ? $ob([this[idx]]) : $ob([]);
  };
  $ob.fn.index = function (target) {
    const el = this[0];
    if (!el) return -1;
    if (target === undefined) {
      const siblings = el.parentNode ? [...el.parentNode.children] : [];
      return siblings.indexOf(el);
    }
    if (typeof target === "string") {
      const set = [...document.querySelectorAll(target)];
      return set.indexOf(el);
    }
    if (target instanceof Node) return this.toArray().indexOf(target);
    if (target instanceof Ob) return target.toArray().indexOf(el);
    return -1;
  };

  // ----- AJAX (static) -----
  $ob.ajax = function ({ url, method = "GET", data, headers = {} }) {
    return fetch(url, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: method.toUpperCase() === "GET" ? null : JSON.stringify(data)
    }).then(res => res.json());
  };
  $ob.get = function (url) { return fetch(url).then(res => res.json()); };
  $ob.post = function (url, data) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json());
  };

  // expose only $ob
  global.$ob = $ob;
})(window);

