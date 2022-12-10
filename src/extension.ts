import * as vscode from "vscode";

const decorationType = vscode.window.createTextEditorDecorationType({
  textDecoration: "line-through;",
  color: "red;",
});

// デコレーション用
function decorate(editor: vscode.TextEditor) {
  let sourceCode = editor.document.getText();
  let regex = /(any)/;

  let decorationsArray: vscode.DecorationOptions[] = [];

  const sourceCodeArr = sourceCode.split("\n");

  for (let line = 0; line < sourceCodeArr.length; line++) {
    let match = sourceCodeArr[line].match(regex);

    if (match !== null && match.index !== undefined) {
      let range = new vscode.Range(
        new vscode.Position(line, match.index),
        new vscode.Position(line, match.index + match[1].length)
      );

      let decoration = { range };

      decorationsArray.push(decoration);
    }
  }
  editor.setDecorations(decorationType, decorationsArray);
}

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
  if (editor && key === "vscode-context.any-check") {
    const document = editor.document;
    const selection = editor.selection;
    let text = document.getText(selection);

    const message = vscode.window.showInformationMessage(`いい加減にしなさい`, {
      modal: true,
    });

    const panel = vscode.window.createWebviewPanel(
      "omikuji",
      `t`,
      vscode.ViewColumn.Beside,
      {}
    );

    panel.webview.html = getWebviewContent();

    // 色つける
    vscode.workspace.onWillSaveTextDocument((event) => {
      const openEditor = vscode.window.visibleTextEditors.filter(
        (editor) => editor.document.uri === event.document.uri
      )[0];
      decorate(openEditor);
    });
  }
};

export function deactivate() {}
