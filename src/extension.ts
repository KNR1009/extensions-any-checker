import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  /* commands */
  let cmd = vscode.commands.registerCommand("vscode-context.capitalize", () => {
    customContext("vscode-context.capitalize");
  });
  let cmd2 = vscode.commands.registerCommand("vscode-context.upText", () => {
    customContext("vscode-context.upText");
  });
  let cmd3 = vscode.commands.registerCommand("vscode-context.lowerCase", () => {
    customContext("vscode-context.lowerCase");
  });
  let cmd4 = vscode.commands.registerCommand("vscode-context.lowerText", () => {
    customContext("vscode-context.lowerText");
  });
  let cmd5 = vscode.commands.registerCommand("vscode-context.any-check", () => {
    customContext("vscode-context.any-check");
  });

  context.subscriptions.push(cmd);
  context.subscriptions.push(cmd2);
  context.subscriptions.push(cmd3);
  context.subscriptions.push(cmd4);
  context.subscriptions.push(cmd5);
}
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
          break;
        case "vscode-context.capitalize":
          const upText = text.charAt(0).toUpperCase() + text.slice(1);
          editor.edit((edit) => {
            edit.replace(selection, upText);
          });
          break;
        /* anyチェックロジック用 */
        case "vscode-context.upText":
          let cur_selection = editor.selection; // 選択範囲取得
          let doc = editor.document; // ドキュメント取得
          let t = doc.getText(cur_selection); //取得されたテキスト

          const message = vscode.window.showInformationMessage(`${t}`, {
            modal: true,
          });
          const panel = vscode.window.createWebviewPanel(
            "omikuji",
            `t`,
            vscode.ViewColumn.One,
            {}
          );

          panel.webview.html = getWebviewContent();
        // const upText2 = text.toUpperCase();
        // editor.edit((edit) => {
        //   edit.replace(selection, upText2);
        // });
        // break;

        case "vscode-context.lowerCase":
          let lowerCase = text.toLowerCase();
          lowerCase = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
          editor.edit((edit) => {
            edit.replace(selection, lowerCase);
          });
          break;

        case "vscode-context.lowerText":
          let lowerText = text.toLowerCase();
          editor.edit((edit) => {
            edit.replace(selection, lowerText);
          });
          break;
      }
    }
  }
};

export function deactivate() {}
// 先頭意外を小文字
// 小文字に
