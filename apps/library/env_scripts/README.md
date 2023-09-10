### Release Flow Chart

現在沒有透過 gitlab CI/CD 去做上版控制，是透過執行專案底下的

`apps/library/env_scripts/releaseLibrary.mjs` 腳本做上版動作。

```bash
cd apps/library

pnpm run release
```

可能失敗原因：

1. type check failed
2. 版號與遠端 im-library repo 一致。

之後可能會調整成走 gitlab CI/CD，能更嚴格的做版控與上版管理。

<div align='center'>

![release flow](./images/release%20flow.drawio.png)

</div>