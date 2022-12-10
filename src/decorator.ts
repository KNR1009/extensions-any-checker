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

    // ここでDecorationsを実行します
  }

  private setDecorators(): void {
    // ここでスタイルの設定をおこないます
  }
}
