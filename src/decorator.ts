import * as vscode from "vscode";

export default class Decolator {
  private activeEditor = vscode.window.activeTextEditor;
  private timeout: NodeJS.Timer | undefined = undefined;
  private decorationTypes: vscode.TextEditorDecorationType[] = [];

  constructor() {
    this.setDecorators();

    if (this.activeEditor) {
      this.triggerUpdateDecorations();
    }
  }

  public changeActiveTextEditor(editor: vscode.TextEditor | undefined): void {
    this.activeEditor = editor;
    if (editor) {
      this.triggerUpdateDecorations();
    }
  }

  public changeTextDocument(event: vscode.TextDocumentChangeEvent): void {
    if (this.activeEditor && event.document === this.activeEditor.document) {
      this.triggerUpdateDecorations();
    }
  }

  private triggerUpdateDecorations(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    this.timeout = setTimeout(() => {
      this.updateDecorations();
    }, 500);
  }

  private updateDecorations(): void {
    if (!this.activeEditor) {
      return;
    }
    const regEx = /\d+/g;
    const text = this.activeEditor.document.getText();
    const smallNumbers: vscode.DecorationOptions[] = [];
    const largeNumbers: vscode.DecorationOptions[] = [];
    let match;
    while ((match = regEx.exec(text))) {
      const startPos = this.activeEditor.document.positionAt(match.index);
      const endPos = this.activeEditor.document.positionAt(
        match.index + match[0].length
      );
      const decoration = {
        range: new vscode.Range(startPos, endPos),
        hoverMessage: "Number **" + match[0] + "**",
      };
      if (match[0].length < 3) {
        smallNumbers.push(decoration);
      } else {
        largeNumbers.push(decoration);
      }
    }

    this.activeEditor.setDecorations(this.decorationTypes[0], smallNumbers);
    this.activeEditor.setDecorations(this.decorationTypes[1], largeNumbers);

    // ここでDecorationsを実行します
  }

  private setDecorators(): void {
    let smallNumberDecorationType =
      vscode.window.createTextEditorDecorationType({
        borderWidth: "1px",
        borderStyle: "solid",
        overviewRulerColor: "blue",
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        light: {
          // this color will be used in light color themes
          borderColor: "darkblue",
        },
        dark: {
          // this color will be used in dark color themes
          borderColor: "lightblue",
        },
      });
    this.decorationTypes.push(smallNumberDecorationType);

    let largeNumberDecorationType =
      vscode.window.createTextEditorDecorationType({
        cursor: "crosshair",
        // use a themable color. See package.json for the declaration and default values.
        backgroundColor: { id: "myextension.largeNumberBackground" },
      });
    this.decorationTypes.push(largeNumberDecorationType);
  }
}
