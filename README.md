# Tagspeak VS Code Extension

This extension adds basic quality-of-life features for working with [`Tagspeak`](./Tagspeak_101.md) `.tgsk` scripts:

- Syntax highlighting via a TextMate grammar
- Snippets for common packets (`print`, `store`, `math`, `loop`)
- Command **Tagspeak: Run File** to execute the current `.tgsk` file using the `tagspeak` CLI

## Development

```bash
npm install
npm run compile
```

Open this folder in VS Code and press `F5` to launch a new Extension Development Host.

## Testing

This project currently has no automated tests. `npm test` is a placeholder script that prints a message.
