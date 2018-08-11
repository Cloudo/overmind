/* eslint-disable */
/* PrismJS 1.15.0
https://prismjs.com/download.html#themes=prism&languages=markup+clike+javascript+jsx+typescript+tsx&plugins=line-highlight */
var _self =
  typeof window !== 'undefined'
    ? window
    : typeof WorkerGlobalScope !== 'undefined' &&
      self instanceof WorkerGlobalScope
      ? self
      : {}

var Prism = (function() {
  var e = /\blang(?:uage)?-([\w-]+)\b/i

  var t = 0

  var n = (_self.Prism = {
    manual: _self.Prism && _self.Prism.manual,
    disableWorkerMessageHandler:
      _self.Prism && _self.Prism.disableWorkerMessageHandler,
    util: {
      encode: function(e) {
        return e instanceof r
          ? new r(e.type, n.util.encode(e.content), e.alias)
          : n.util.type(e) === 'Array'
            ? e.map(n.util.encode)
            : e
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00a0/g, ' ')
      },
      type: function(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
      },
      objId: function(e) {
        return (
          e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id
        )
      },
      clone: function(e, t) {
        var r = n.util.type(e)
        switch (((t = t || {}), r)) {
          case 'Object':
            if (t[n.util.objId(e)]) return t[n.util.objId(e)]
            var a = {}
            t[n.util.objId(e)] = a
            for (var l in e)
              e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t))
            return a
          case 'Array':
            if (t[n.util.objId(e)]) return t[n.util.objId(e)]
            var a = []
            return (
              (t[n.util.objId(e)] = a),
              e.forEach(function(e, r) {
                a[r] = n.util.clone(e, t)
              }),
              a
            )
        }
        return e
      },
    },
    languages: {
      extend: function(e, t) {
        var r = n.util.clone(n.languages[e])
        for (var a in t) r[a] = t[a]
        return r
      },
      insertBefore: function(e, t, r, a) {
        a = a || n.languages
        var l = a[e]
        if (arguments.length == 2) {
          r = arguments[1]
          for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i])
          return l
        }
        var o = {}
        for (var s in l)
          if (l.hasOwnProperty(s)) {
            if (s == t) for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i])
            o[s] = l[s]
          }
        return (
          n.languages.DFS(n.languages, function(t, n) {
            n === a[e] && t != e && (this[t] = o)
          }),
          (a[e] = o)
        )
      },
      DFS: function(e, t, r, a) {
        a = a || {}
        for (var l in e)
          e.hasOwnProperty(l) &&
            (t.call(e, l, e[l], r || l),
            n.util.type(e[l]) !== 'Object' || a[n.util.objId(e[l])]
              ? n.util.type(e[l]) !== 'Array' ||
                a[n.util.objId(e[l])] ||
                ((a[n.util.objId(e[l])] = !0), n.languages.DFS(e[l], t, l, a))
              : ((a[n.util.objId(e[l])] = !0),
                n.languages.DFS(e[l], t, null, a)))
      },
    },
    plugins: {},
    highlightAll: function(e, t) {
      n.highlightAllUnder(document, e, t)
    },
    highlightAllUnder: function(e, t, r) {
      var a = {
        callback: r,
        selector:
          'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
      }
      n.hooks.run('before-highlightall', a)
      for (
        var l, i = a.elements || e.querySelectorAll(a.selector), o = 0;
        (l = i[o++]);

      )
        n.highlightElement(l, t === !0, a.callback)
    },
    highlightElement: function(t, r, a) {
      for (var l, i, o = t; o && !e.test(o.className); ) o = o.parentNode
      o &&
        ((l = (o.className.match(e) || [, ''])[1].toLowerCase()),
        (i = n.languages[l])),
        (t.className =
          t.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + l),
        t.parentNode &&
          ((o = t.parentNode),
          /pre/i.test(o.nodeName) &&
            (o.className =
              o.className.replace(e, '').replace(/\s+/g, ' ') +
              ' language-' +
              l))
      var s = t.textContent

      var u = { element: t, language: l, grammar: i, code: s }
      if ((n.hooks.run('before-sanity-check', u), !u.code || !u.grammar))
        return (
          u.code &&
            (n.hooks.run('before-highlight', u),
            (u.element.textContent = u.code),
            n.hooks.run('after-highlight', u)),
          n.hooks.run('complete', u),
          void 0
        )
      if ((n.hooks.run('before-highlight', u), r && _self.Worker)) {
        var g = new Worker(n.filename)
        ;(g.onmessage = function(e) {
          ;(u.highlightedCode = e.data),
            n.hooks.run('before-insert', u),
            (u.element.innerHTML = u.highlightedCode),
            a && a.call(u.element),
            n.hooks.run('after-highlight', u),
            n.hooks.run('complete', u)
        }),
          g.postMessage(
            JSON.stringify({
              language: u.language,
              code: u.code,
              immediateClose: !0,
            })
          )
      } else
        (u.highlightedCode = n.highlight(u.code, u.grammar, u.language)),
          n.hooks.run('before-insert', u),
          (u.element.innerHTML = u.highlightedCode),
          a && a.call(t),
          n.hooks.run('after-highlight', u),
          n.hooks.run('complete', u)
    },
    highlight: function(e, t, a) {
      var l = { code: e, grammar: t, language: a }
      return (
        n.hooks.run('before-tokenize', l),
        (l.tokens = n.tokenize(l.code, l.grammar)),
        n.hooks.run('after-tokenize', l),
        r.stringify(n.util.encode(l.tokens), l.language)
      )
    },
    matchGrammar: function(e, t, r, a, l, i, o) {
      var s = n.Token
      for (var u in r)
        if (r.hasOwnProperty(u) && r[u]) {
          if (u == o) return
          var g = r[u]
          g = n.util.type(g) === 'Array' ? g : [g]
          for (var c = 0; c < g.length; ++c) {
            var h = g[c]

            var f = h.inside

            var d = !!h.lookbehind

            var m = !!h.greedy

            var p = 0

            var y = h.alias
            if (m && !h.pattern.global) {
              var v = h.pattern.toString().match(/[imuy]*$/)[0]
              h.pattern = RegExp(h.pattern.source, v + 'g')
            }
            h = h.pattern || h
            for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
              var w = t[b]
              if (t.length > e.length) return
              if (!(w instanceof s)) {
                if (m && b != t.length - 1) {
                  h.lastIndex = k
                  var _ = h.exec(e)
                  if (!_) break
                  for (
                    var j = _.index + (d ? _[1].length : 0),
                      P = _.index + _[0].length,
                      A = b,
                      x = k,
                      O = t.length;
                    O > A && (P > x || (!t[A].type && !t[A - 1].greedy));
                    ++A
                  )
                    (x += t[A].length), j >= x && (++b, (k = x))
                  if (t[b] instanceof s) continue
                  ;(I = A - b), (w = e.slice(k, x)), (_.index -= k)
                } else {
                  h.lastIndex = 0
                  var _ = h.exec(w)

                  var I = 1
                }
                if (_) {
                  d && (p = _[1] ? _[1].length : 0)
                  var j = _.index + p

                  var _ = _[0].slice(p)

                  var P = j + _.length

                  var N = w.slice(0, j)

                  var S = w.slice(P)

                  var C = [b, I]
                  N && (++b, (k += N.length), C.push(N))
                  var E = new s(u, f ? n.tokenize(_, f) : _, y, _, m)
                  if (
                    (C.push(E),
                    S && C.push(S),
                    Array.prototype.splice.apply(t, C),
                    I != 1 && n.matchGrammar(e, t, r, b, k, !0, u),
                    i)
                  )
                    break
                } else if (i) break
              }
            }
          }
        }
    },
    tokenize: function(e, t) {
      var r = [e]

      var a = t.rest
      if (a) {
        for (var l in a) t[l] = a[l]
        delete t.rest
      }
      return n.matchGrammar(e, r, t, 0, 0, !1), r
    },
    hooks: {
      all: {},
      add: function(e, t) {
        var r = n.hooks.all
        ;(r[e] = r[e] || []), r[e].push(t)
      },
      run: function(e, t) {
        var r = n.hooks.all[e]
        if (r && r.length) for (var a, l = 0; (a = r[l++]); ) a(t)
      },
    },
  })

  var r = (n.Token = function(e, t, n, r, a) {
    ;(this.type = e),
      (this.content = t),
      (this.alias = n),
      (this.length = 0 | (r || '').length),
      (this.greedy = !!a)
  })
  if (
    ((r.stringify = function(e, t, a) {
      if (typeof e === 'string') return e
      if (n.util.type(e) === 'Array')
        return e
          .map(function(n) {
            return r.stringify(n, t, e)
          })
          .join('')
      var l = {
        type: e.type,
        content: r.stringify(e.content, t, a),
        tag: 'span',
        classes: ['token', e.type],
        attributes: {},
        language: t,
        parent: a,
      }
      if (e.alias) {
        var i = n.util.type(e.alias) === 'Array' ? e.alias : [e.alias]
        Array.prototype.push.apply(l.classes, i)
      }
      n.hooks.run('wrap', l)
      var o = Object.keys(l.attributes)
        .map(function(e) {
          return (
            e + '="' + (l.attributes[e] || '').replace(/"/g, '&quot;') + '"'
          )
        })
        .join(' ')
      return (
        '<' +
        l.tag +
        ' class="' +
        l.classes.join(' ') +
        '"' +
        (o ? ' ' + o : '') +
        '>' +
        l.content +
        '</' +
        l.tag +
        '>'
      )
    }),
    !_self.document)
  )
    return _self.addEventListener
      ? (n.disableWorkerMessageHandler ||
          _self.addEventListener(
            'message',
            function(e) {
              var t = JSON.parse(e.data)

              var r = t.language

              var a = t.code

              var l = t.immediateClose
              _self.postMessage(n.highlight(a, n.languages[r], r)),
                l && _self.close()
            },
            !1
          ),
        _self.Prism)
      : _self.Prism
  var a =
    document.currentScript ||
    [].slice.call(document.getElementsByTagName('script')).pop()
  return (
    a &&
      ((n.filename = a.src),
      n.manual ||
        a.hasAttribute('data-manual') ||
        (document.readyState !== 'loading'
          ? window.requestAnimationFrame
            ? window.requestAnimationFrame(n.highlightAll)
            : window.setTimeout(n.highlightAll, 16)
          : document.addEventListener('DOMContentLoaded', n.highlightAll))),
    _self.Prism
  )
})()
typeof module !== 'undefined' && module.exports && (module.exports = Prism),
  typeof global !== 'undefined' && (global.Prism = Prism)
;(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      'attr-value': {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: {
          punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }],
        },
      },
      punctuation: /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add('wrap', function(a) {
    a.type === 'entity' &&
      (a.attributes.title = a.content.replace(/&amp;/, '&'))
  }),
  (Prism.languages.xml = Prism.languages.markup),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup)
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  'class-name': {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /[a-z0-9_]+(?=\()/i,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
  keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
  operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
      lookbehind: !0,
      greedy: !0,
    },
    'function-variable': {
      pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: 'function',
    },
    constant: /\b[A-Z][A-Z\d_]*\b/,
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\${[^}]+}/,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\${|}$/,
              alias: 'punctuation',
            },
            rest: null,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  (Prism.languages.javascript[
    'template-string'
  ].inside.interpolation.inside.rest =
    Prism.languages.javascript),
  Prism.languages.markup &&
    Prism.languages.insertBefore('markup', 'tag', {
      script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: 'language-javascript',
        greedy: !0,
      },
    }),
  (Prism.languages.js = Prism.languages.javascript)
!(function(t) {
  var n = t.util.clone(t.languages.javascript)
  ;(t.languages.jsx = t.languages.extend('markup', n)),
    (t.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i),
    (t.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
    (t.languages.jsx.tag.inside[
      'attr-value'
    ].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
    t.languages.insertBefore(
      'inside',
      'attr-name',
      {
        spread: {
          pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
          inside: { punctuation: /\.{3}|[{}.]/, 'attr-value': /\w+/ },
        },
      },
      t.languages.jsx.tag
    ),
    t.languages.insertBefore(
      'inside',
      'attr-value',
      {
        script: {
          pattern: /=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
          inside: {
            'script-punctuation': { pattern: /^=(?={)/, alias: 'punctuation' },
            rest: t.languages.jsx,
          },
          alias: 'language-javascript',
        },
      },
      t.languages.jsx.tag
    )
  var e = function(t) {
    return t
      ? typeof t === 'string'
        ? t
        : typeof t.content === 'string'
          ? t.content
          : t.content.map(e).join('')
      : ''
  }

  var a = function(n) {
    for (var s = [], g = 0; g < n.length; g++) {
      var o = n[g]

      var i = !1
      if (
        (typeof o !== 'string' &&
          (o.type === 'tag' && o.content[0] && o.content[0].type === 'tag'
            ? o.content[0].content[0].content === '</'
              ? s.length > 0 &&
                s[s.length - 1].tagName === e(o.content[0].content[1]) &&
                s.pop()
              : o.content[o.content.length - 1].content === '/>' ||
                s.push({
                  tagName: e(o.content[0].content[1]),
                  openedBraces: 0,
                })
            : s.length > 0 && o.type === 'punctuation' && o.content === '{'
              ? s[s.length - 1].openedBraces++
              : s.length > 0 &&
                s[s.length - 1].openedBraces > 0 &&
                o.type === 'punctuation' &&
                o.content === '}'
                ? s[s.length - 1].openedBraces--
                : (i = !0)),
        (i || typeof o === 'string') &&
          s.length > 0 &&
          s[s.length - 1].openedBraces === 0)
      ) {
        var p = e(o)
        g < n.length - 1 &&
          (typeof n[g + 1] === 'string' || n[g + 1].type === 'plain-text') &&
          ((p += e(n[g + 1])), n.splice(g + 1, 1)),
          g > 0 &&
            (typeof n[g - 1] === 'string' || n[g - 1].type === 'plain-text') &&
            ((p = e(n[g - 1]) + p), n.splice(g - 1, 1), g--),
          (n[g] = new t.Token('plain-text', p, null, p))
      }
      o.content && typeof o.content !== 'string' && a(o.content)
    }
  }
  t.hooks.add('after-tokenize', function(t) {
    ;(t.language === 'jsx' || t.language === 'tsx') && a(t.tokens)
  })
})(Prism)
;(Prism.languages.typescript = Prism.languages.extend('javascript', {
  keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|module|declare|constructor|namespace|abstract|require|type)\b/,
  builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console)\b/,
})),
  (Prism.languages.ts = Prism.languages.typescript)
var typescript = Prism.util.clone(Prism.languages.typescript)
Prism.languages.tsx = Prism.languages.extend('jsx', typescript)
!(function() {
  function e(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e))
  }
  function t(e, t) {
    return (
      (t = ' ' + t + ' '),
      (' ' + e.className + ' ').replace(/[\n\t]/g, ' ').indexOf(t) > -1
    )
  }
  function n(e, n, i) {
    n = typeof n === 'string' ? n : e.getAttribute('data-line')
    for (
      var o,
        l = n.replace(/\s+/g, '').split(','),
        a = +e.getAttribute('data-line-offset') || 0,
        s = r() ? parseInt : parseFloat,
        d = s(getComputedStyle(e).lineHeight),
        u = t(e, 'line-numbers'),
        c = 0;
      (o = l[c++]);

    ) {
      var p = o.split('-')

      var m = +p[0]

      var f = +p[1] || m

      var h =
        e.querySelector('.line-highlight[data-range="' + o + '"]') ||
        document.createElement('div')
      if (
        (h.setAttribute('aria-hidden', 'true'),
        h.setAttribute('data-range', o),
        (h.className = (i || '') + ' line-highlight'),
        u && Prism.plugins.lineNumbers)
      ) {
        var g = Prism.plugins.lineNumbers.getLine(e, m)

        var y = Prism.plugins.lineNumbers.getLine(e, f)
        g && (h.style.top = g.offsetTop + 'px'),
          y &&
            (h.style.height = y.offsetTop - g.offsetTop + y.offsetHeight + 'px')
      } else
        h.setAttribute('data-start', m),
          f > m && h.setAttribute('data-end', f),
          (h.style.top = (m - a - 1) * d + 'px'),
          (h.textContent = new Array(f - m + 2).join(' \n'))
      u ? e.appendChild(h) : (e.querySelector('code') || e).appendChild(h)
    }
  }
  function i() {
    var t = location.hash.slice(1)
    e('.temporary.line-highlight').forEach(function(e) {
      e.parentNode.removeChild(e)
    })
    var i = (t.match(/\.([\d,-]+)$/) || [, ''])[1]
    if (i && !document.getElementById(t)) {
      var r = t.slice(0, t.lastIndexOf('.'))

      var o = document.getElementById(r)
      o &&
        (o.hasAttribute('data-line') || o.setAttribute('data-line', ''),
        n(o, i, 'temporary '),
        document.querySelector('.temporary.line-highlight').scrollIntoView())
    }
  }
  if (
    typeof self !== 'undefined' &&
    self.Prism &&
    self.document &&
    document.querySelector
  ) {
    var r = (function() {
      var e
      return function() {
        if (typeof e === 'undefined') {
          var t = document.createElement('div')
          ;(t.style.fontSize = '13px'),
            (t.style.lineHeight = '1.5'),
            (t.style.padding = 0),
            (t.style.border = 0),
            (t.innerHTML = '&nbsp;<br />&nbsp;'),
            document.body.appendChild(t),
            (e = t.offsetHeight === 38),
            document.body.removeChild(t)
        }
        return e
      }
    })()

    var o = 0
    Prism.hooks.add('before-sanity-check', function(t) {
      var n = t.element.parentNode

      var i = n && n.getAttribute('data-line')
      if (n && i && /pre/i.test(n.nodeName)) {
        var r = 0
        e('.line-highlight', n).forEach(function(e) {
          ;(r += e.textContent.length), e.parentNode.removeChild(e)
        }),
          r &&
            /^( \n)+$/.test(t.code.slice(-r)) &&
            (t.code = t.code.slice(0, -r))
      }
    }),
      Prism.hooks.add('complete', function l(e) {
        var r = e.element.parentNode

        var a = r && r.getAttribute('data-line')
        if (r && a && /pre/i.test(r.nodeName)) {
          clearTimeout(o)
          var s = Prism.plugins.lineNumbers

          var d = e.plugins && e.plugins.lineNumbers
          t(r, 'line-numbers') && s && !d
            ? Prism.hooks.add('line-numbers', l)
            : (n(r, a), (o = setTimeout(i, 1)))
        }
      }),
      window.addEventListener('hashchange', i),
      window.addEventListener('resize', function() {
        var e = document.querySelectorAll('pre[data-line]')
        Array.prototype.forEach.call(e, function(e) {
          n(e)
        })
      })
  }
})()