# Tagspeak VS Code Extension

This extension adds basic quality-of-life features for working with [`Tagspeak`](./Tagspeak_101.md) `.tgsk` scripts:

- Syntax highlighting via a TextMate grammar
- Snippets for common packets (`print`, `store`, `math`, `loop`)
- Command **Tagspeak: Run File** to execute the current `.tgsk` file using the `tagspeak` CLI

## Running Files

- Use the Command Palette: run `Tagspeak: Run File` while a `.tgsk` editor is active.
- Configure how it runs:
  - `tagspeak.runMode`: `terminal` (Integrated Terminal) or `output` (Output panel). Default: `terminal`.
  - `tagspeak.path.runtime`: Path to the `tagspeak` CLI (absolute path or just `tagspeak` if it’s on your PATH).
  - On save, the extension runs `tagspeak --check <file>` to surface diagnostics.

## Project Root (red.tgsk)

- Command **Tagspeak: Create red.tgsk at Root** creates a `red.tgsk` sentinel at your workspace root.
- `red.tgsk` marks the filesystem boundary for TagSpeak file access. The runtime walks upward from the entry script to find this file; paths are resolved relative to it and cannot escape the boundary.

### Explorer Context Menu
- Right-click any folder in the Explorer and choose **Tagspeak: Create red.tgsk at Root** to place the sentinel directly in that folder.
- The same command remains available via the Command Palette; when run there, it targets the current (or first) workspace folder.

## Development

```bash
npm install
npm run compile
```

Open this folder in VS Code and press `F5` to launch a new Extension Development Host.

## Testing

This project currently has no automated tests. `npm test` is a placeholder script that prints a message.
