### apps

主要產品資料夾，所有業務邏輯與代碼都會在這個專案下
在專案根目錄下運行指令，會透過 turbo 併發執行底下三個子模組的 `dev` 指令

```bash
# im-monorepo/
pnpm dev

# same as
# im-monorepo/apps/library pnpm dev
# im-monorepo/apps/mockServer pnpm dev
# im-monorepo/apps/uikit pnpm dev
``` 

#### sub folder
1. [library](./library/README.md)
2. [mockServer](./mockServer/README.md)
3. [uikit](./uikit/README.md)