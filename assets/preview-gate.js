/* レビュー用簡易ゲート — 本番公開時は全HTMLからscriptタグとnoindexを削除すること */
(function () {
  var KEY = 'bc_preview_auth';
  var PASS = 'bc-preview0621';

  if (sessionStorage.getItem(KEY) === '1') return;

  var overlay = document.createElement('div');
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:99999',
    'background:#fff', 'display:flex', 'align-items:center', 'justify-content:center'
  ].join(';');

  overlay.innerHTML = [
    '<div style="text-align:center;font-family:-apple-system,sans-serif;padding:2rem">',
    '<p style="font-size:14px;color:#555;margin-bottom:1.25rem">このページはレビュー用の限定公開です</p>',
    '<input id="bc-pw" type="password" placeholder="パスワードを入力"',
    ' style="width:220px;padding:10px 14px;border:1px solid #ccc;border-radius:8px;font-size:15px;outline:none">',
    '<br><button id="bc-btn"',
    ' style="margin-top:12px;padding:10px 28px;background:#2C7A4B;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer">',
    '確認</button>',
    '<p id="bc-err" style="color:#c0392b;font-size:13px;margin-top:10px;min-height:18px"></p>',
    '</div>'
  ].join('');

  document.body.insertBefore(overlay, document.body.firstChild);

  function check() {
    if (document.getElementById('bc-pw').value === PASS) {
      sessionStorage.setItem(KEY, '1');
      document.body.removeChild(overlay);
    } else {
      document.getElementById('bc-err').textContent = 'パスワードが違います';
      document.getElementById('bc-pw').value = '';
      document.getElementById('bc-pw').focus();
    }
  }

  document.getElementById('bc-btn').addEventListener('click', check);
  document.getElementById('bc-pw').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') check();
  });
})();
