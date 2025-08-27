// @ts-nocheck
import * as vscode from 'vscode';
import { exec } from 'child_process';

// Activate is run when VS Code loads the extension for a Tagspeak file.
export function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel('Tagspeak');

  // Register a command to run the current Tagspeak file through the CLI interpreter.
  const runCmd = vscode.commands.registerCommand('tagspeak.runFile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor');
      return;
    }

    const doc = editor.document;
    if (doc.languageId !== 'tagspeak') {
      vscode.window.showErrorMessage('Current file is not Tagspeak');
      return;
    }

    await doc.save();
    const cmd = `tagspeak ${doc.fileName}`;
    output.appendLine(`$ ${cmd}`);

    exec(cmd, { cwd: vscode.workspace.rootPath }, (err, stdout, stderr) => {
      if (err) {
        output.appendLine(stderr);
        vscode.window.showErrorMessage('Tagspeak execution failed');
        return;
      }
      output.append(stdout);
      if (stderr) {
        output.append(stderr);
      }
      output.show(true);
    });
  });

  context.subscriptions.push(runCmd, output);
}

// Called when extension is deactivated. Currently no cleanup needed.
export function deactivate() {}
