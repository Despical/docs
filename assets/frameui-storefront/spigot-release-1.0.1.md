# Spigot release 1.0.1

## Update

- **File:** `C:\Users\berke\Documents\Codex\2026-10-13\https-builtbybit-com-resources-ultimate-ui\outputs\FrameUI\build\libs\FrameUI-1.0.1.jar`
- **Version:** 1.0.1
- **Update title:** 1.0.1: Folia support and an update check

**Update description:**

```
[size=5][b]FrameUI 1.0.1[/b][/size]

FrameUI now runs on Folia and can tell you when a newer version is available.

[b]Highlights[/b]
[list]
[*][b]Folia support:[/b] loading screens, resource-pack requests and delayed follow-ups run on the thread that owns each player, so players in different regions never block each other.
[*][b]Update check:[/b] on startup FrameUI asks SpigotMC for the latest version and logs the download link if yours is older. Set check-for-updates to false in config.yml to turn it off.
[*][b]Safer commands:[/b] /frameui play now starts on the target player's own thread, and reloading closes every active screen where it belongs.
[*][b]Cleaner startup:[/b] the plugin's startup is split into small steps, which makes startup problems easier to trace in the log.
[/list]

[b]Updating:[/b] replace the jar and restart. Existing configuration is kept; add check-for-updates: true to config.yml if you want to control the new option.

[b]Requirements:[/b] Paper, Folia or a Paper fork, 1.21.11 through 26.3, Java 25.

[url=https://docs.despical.dev/frameui/][b]Documentation[/b][/url]
```
