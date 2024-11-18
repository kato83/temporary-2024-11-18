# ブラウザ上で完結するTODOアプリケーションを作ろう！

## 実装方法

```shell
$ npm install
$ npm run dev
# 表示されるコンソール上のURLよりブラウザ上でプレビューすることができます
```


```html
      <div class="todo-card">
        <input type="checkbox" />
        <span class="todo-text" data-id="96004b06-12c8-46fc-9ba5-3b4feee2cff8" contenteditable="true">未完了のTODO 01</span>
        <button class="delete-btn">削除</button>
      </div>
      <div class="todo-card todo-completed">
        <input type="checkbox" checked>
        <span class="todo-text" data-id="6f989167-4adf-4476-b4fc-95b0714c03c7" contenteditable="true">完了のTODO 04</span>
        <button class="delete-btn">削除</button>
      </div>
```