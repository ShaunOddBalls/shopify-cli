      (function (a, b, c, d, e, f, g) {
        e['ire_o'] = c;
        e[c] =
          e[c] ||
          function () {
            (e[c].a = e[c].a || []).push(arguments);
          };
        f = d.createElement(b);
        g = d.getElementsByTagName(b)[0];
        f.async = 1;
        f.src = a;
        g.parentNode.insertBefore(f, g);
      })('https://utt.impactcdn.com/A5336542-fbf1-4d8a-baa6-f314a65c936c1.js', 'script', 'ire', document, window);
      ire('identify', {
        customerid: '{{ customer_id }}' /*INSERT CUSTOMER ID*/,
        customeremail: '{{ sha_customer_email }}' /*INSERT SHA1 HASHED CUSTOMER EMAIL*/,
