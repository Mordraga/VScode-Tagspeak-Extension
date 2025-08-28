import * as vscode from 'vscode';

// Words that should appear as suggestions in Tagspeak files.
const tokens: readonly string[] = ['print', 'store'];

// Provider that offers Tagspeak keywords as completion items.
export const completionProvider: vscode.CompletionItemProvider = {
  provideCompletionItems() {
    return tokens.map((token) =>
      new vscode.CompletionItem(token, vscode.CompletionItemKind.Keyword)
    );
  },
};
