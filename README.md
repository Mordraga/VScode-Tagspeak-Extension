# Tagspeak VS Code Extension

This extension adds basic quality-of-life features for working with [`Tagspeak`](./Tagspeak_101.md) `.tgsk` scripts:

- Syntax highlighting via a TextMate grammar
- Snippets for common packets (`print`, `store`, `math`, `loop`)
- Command **Tagspeak: Run File** to execute the current `.tgsk` file using the `tagspeak` CLI

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
