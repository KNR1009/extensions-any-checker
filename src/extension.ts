import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let cmd = vscode.commands.registerCommand("vscode-context.any-check", () => {
    customContext("vscode-context.any-check");
  });
  context.subscriptions.push(cmd);
}

// 画像呼び出し
function getWebviewContent() {
  return `<!DOCTYPE html>
   <html lang="ja">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
   <body>
       <img src="https://www.mbs.jp/mbs-column/p-battle/thumb/20190924175210-dfacb10b6a288de4a8506b3c24a433dd3684b841.jpg" />
   </body>
   </html>`;
}

const customContext = (key: string) => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const selection = editor.selection;
    let text = document.getText(selection);
    if (text) {
      switch (key) {
        case "vscode-context.any-check":
          let cur_selection = editor.selection; // 選択範囲取得
          let doc = editor.document; // ドキュメント取得
          let t = doc.getText(cur_selection); //取得されたテキスト

          const message = vscode.window.showInformationMessage(`${t}`, {
            modal: true,
          });

          const panel = vscode.window.createWebviewPanel(
            "omikuji",
            `t`,
            vscode.ViewColumn.Beside,
            {}
          );

          panel.webview.html = getWebviewContent();
      }
    }
  }
};

export function deactivate() {}
