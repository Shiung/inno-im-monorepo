##### library
主要 Library，裡面包含所有提供給 `universe-portal-wap` 使用的 im 元件。

```bash
|-- env_scripts # 部署/語系 shell 腳本
|-- src
| |-- api/ # 共用的 fetch api wrapper function
| |-- assets/ # 需要打包的靜態資源
| |-- components/ # 共用元件
| |-- containers/ # 業務相關共用元件
| |-- pages/ # 廣場頁面
| |-- platform/ # 供平台引入的元件、狀態管理
| |-- routes/ # 廣場路由
| |-- stores/ # 狀態管理
| |-- utils/ # 業務相關共用函式
| |-- app.css # tailwind preset
| |-- app.d.ts # 自定義 ts 宣告
| |-- App.svelte # 廣場入口組件
| |-- common.css # global 樣式
| |-- commonInit.ts # 初始化引入元件時執行的 init functions
| |-- constant.ts # 共用常數
| |-- main.ts # 專案入口
| |-- types.ts # 共用型別宣告
| |-- vite-env.d.ts # client 相關型別宣告

```
