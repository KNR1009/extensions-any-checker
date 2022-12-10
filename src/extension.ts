import * as vscode from "vscode";

/* anyの上に付与するデコレーション(赤色打ち消し線) */
const decorationType = vscode.window.createTextEditorDecorationType({
  textDecoration: "line-through;",
  color: "red;",
});

/* anyがエディター内にあった場合に赤線を引く */
const decorate = (editor: vscode.TextEditor) => {
  const sourceCode = editor.document.getText();
  /* 適応したい任意の文字を入れる */
  const regex = /(any)/;

  const decorationsArray: vscode.DecorationOptions[] = [];
  /* 1行ごとにソースコードを取得する */
  const sourceCodeArr = sourceCode.split("\n");
  let anyCount = 0;

  for (let line = 0; line < sourceCodeArr.length; line++) {
    const match = sourceCodeArr[line].match(regex);

    if (match !== null && match.index !== undefined) {
      let range = new vscode.Range(
        new vscode.Position(line, match.index),
        new vscode.Position(line, match.index + match[1].length)
      );
      anyCount += 1;
      decorationsArray.push({ range });
    }
  }
  const textLabel = anyCount > 1 ? "いい加減にしなさい" : "あっぱれ";
  vscode.window.showInformationMessage(`${textLabel}`, {
    modal: true,
  });
  editor.setDecorations(decorationType, decorationsArray);
};

export const activate = (context: vscode.ExtensionContext) => {
  let cmd = vscode.commands.registerCommand("vscode-context.any-check", () => {
    customContext("vscode-context.any-check");
  });

  context.subscriptions.push(cmd);
};

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
    const panel = vscode.window.createWebviewPanel(
      "t",
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
