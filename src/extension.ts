// @ts-nocheck
import * as vscode from 'vscode';
import { exec } from 'child_process';

// Activate is run when VS Code loads the extension for a Tagspeak file.
export function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel('Tagspeak');
  const diagnostics = vscode.languages.createDiagnosticCollection('tagspeak');
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
    const terminal = vscode.window.createTerminal({
      name: 'Tagspeak',
      cwd: vscode.workspace.rootPath,
    });
    terminal.sendText(`tagspeak ${doc.fileName}`);
    terminal.show();
  });
  // Create a root sentinel file `red.tgsk` at a chosen folder (Explorer right-click) or workspace root.
  const createRedCmd = vscode.commands.registerCommand('tagspeak.createRed', async (resource?: vscode.Uri) => {
    // If invoked from Explorer on a folder, VS Code passes that folder URI as `resource`.
    let targetFolderUri: vscode.Uri | undefined = resource;
    if (!targetFolderUri) {
      const editor = vscode.window.activeTextEditor;
      const workspaceFolder = editor
        ? vscode.workspace.getWorkspaceFolder(editor.document.uri)
        : vscode.workspace.workspaceFolders?.[0];
      targetFolderUri = workspaceFolder?.uri;
    }

    if (!targetFolderUri) {
      vscode.window.showErrorMessage(
        'No target folder found. Right-click a folder in Explorer or open a workspace.'
      );
      return;
    }

    const redUri = vscode.Uri.joinPath(targetFolderUri, 'red.tgsk');

    try {
      await vscode.workspace.fs.stat(redUri);
      vscode.window.showInformationMessage(`red.tgsk already exists at ${redUri.fsPath}`);
      return;
    } catch {
      // File does not exist; continue to create.
    }

    const content = Buffer.from(
      ['// red.tgsk — Tagspeak root sentinel',
       '// This marks the filesystem boundary for resolving file paths.',
       ''].join('\n'),
      'utf8'
    );

    try {
      await vscode.workspace.fs.writeFile(redUri, content);
      vscode.window.showInformationMessage(`Created red.tgsk at ${redUri.fsPath}`);
      const doc = await vscode.workspace.openTextDocument(redUri);
      await vscode.window.showTextDocument(doc, { preview: false });
    } catch (err: any) {
      vscode.window.showErrorMessage(`Failed to create red.tgsk: ${err?.message ?? String(err)}`);
    }
  });
  const saveSub = vscode.workspace.onDidSaveTextDocument((doc) => {
    if (doc.languageId !== 'tagspeak') {
      return;
    }

    const cmd = `tagspeak --check ${doc.fileName}`;
    exec(cmd, { cwd: vscode.workspace.rootPath }, (_err, stdout, stderr) => {
      const diag: vscode.Diagnostic[] = [];
      const lines = `${stdout}\n${stderr}`.split(/\r?\n/);
      for (const line of lines) {
        const match = line.match(/:(\d+):(\d+):\s*(.*)/);
        if (match) {
          const lineNum = Number(match[1]) - 1;
          const colNum = Number(match[2]) - 1;
          const message = match[3];
          const range = new vscode.Range(lineNum, colNum, lineNum, colNum + 1);
          diag.push(new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Error));
        }
      }
      diagnostics.set(doc.uri, diag);
    });
  });

  context.subscriptions.push(runCmd, createRedCmd, saveSub, output, diagnostics);
}

// Called when extension is deactivated. Currently no cleanup needed.
export function deactivate() {}
