# Spigot release 1.0.1

## Update

- **File:** `C:\Users\berke\Documents\Codex\2026-10-13\https-builtbybit-com-resources-ultimate-ui\outputs\FrameUI\build\libs\FrameUI-1.0.1.jar`
- **Version:** 1.0.1
- **Update title:** FrameUI - v1.0.1

**Update description:**

```
[size=5][b]What's Changed[/b][/size]
[list]
[*]Added Folia support: loading screens, resource-pack requests and delayed follow-ups now run on the thread that owns each player, so players in different regions no longer block each other.
[*]Added an update check that asks SpigotMC for the latest version on startup and logs the download link, which can be turned off with [icode]check-for-updates: false[/icode] in [icode]config.yml[/icode].
[*][icode]/frameui play[/icode] now starts on the target player's own thread, and reloading closes every active screen on its owner's thread.
[*]Split the plugin startup into smaller steps so startup problems are easier to trace in the log.
[/list]
```
