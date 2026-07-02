export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.slice(1);
    let target = '';
    if (path.startsWith('https://') || path.startsWith('http://')) {
      target = path;
    } else {
      target = 'https://github.com/' + path;
    }
    if (!path) target = 'https://github.com';
    const resp = await fetch(target, {
      method: request.method,
      headers: {
        'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0',
        'Accept': request.headers.get('Accept') || '*/*',
        'Accept-Language': request.headers.get('Accept-Language') || 'zh-CN,zh;q=0.9,en;q=0.8',
      },
      redirect: 'manual',
    });
    if (resp.status === 301 || resp.status === 302 || resp.status === 307 || resp.status === 308) {
      const loc = resp.headers.get('Location');
      if (loc) {
        return Response.redirect(url.origin + '/' + loc, resp.status);
      }
    }
    const ct = resp.headers.get('Content-Type') || '';
    if (ct.includes('text/html')) {
      let text = await resp.text();
      const origin = url.origin;
      text = text.replace(/https?:\/\/github\.com\//g, origin + '/https://github.com/');
      text = text.replace(/https?:\/\/raw\.githubusercontent\.com\//g, origin + '/https://raw.githubusercontent.com/');
      return new Response(text, {
        status: resp.status,
        headers: {
          'Content-Type': ct,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
    const h = new Headers(resp.headers);
    h.set('Access-Control-Allow-Origin', '*');
    return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers: h });
  },
};
