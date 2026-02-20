# Mini Kintai（勤怠管理アプリ）

シンプルな勤務時間管理アプリです。
ユーザー認証、出勤・退勤記録、勤務時間の集計・編集機能を持ちます。

## セットアップ

### 1. npm install

```bash
# バックエンド
npm install

# フロントエンド
cd FE && npm install
```

### 2. database migration

```bash
# 環境変数の設定
cp .env.example .env

# マイグレーション実行
npm run db:migrate

# シードデータ投入
npm run db:seed
```

### 3. 開発環境の起動(FE/BE)

```bash
# ターミナル1：FE（localhost:3000）
npm run dev

# ターミナル2：BE（localhost:5173）
cd FE && npm run dev
```

## アプリの詳細

### 機能

- ユーザー認証：ログイン・ログアウト
- 出勤・退勤：打刻記録
- 勤務時間管理：日次の勤務時間表示
- 勤務時間編集：記録の修正が可能

### 技術スタック

- バックエンド：Node.js, Express
- フロントエンド：React 19, Vite, React Router v7
- データベース：PostgreSQL, Knex.js
- 認証：セッションベース認証

### ディレクトリ構成(主要ファイル)

```
mini_kintai/
├── src/                          # BEコード全般
│   ├── user/                      # ユーザー管理
│   ├── attendance/                # 勤務時間管理
│   ├── middleware/                # 認証ミドルウェア
│   └── sanitizer.js
├── db/                            # データベース
│   ├── knexfile.js
│   ├── knex.js
│   └── data/
│       ├── migrations/
│       └── seeds/                 # テスト用シードデータ
├── FE/                            # FEコード全般
│   └── src/
│       ├── components/            # React コンポーネント
│       ├── pages/                 # ページコンポーネント
│       └── contexts/              # Context（認証の管理）
├── app.js
├── server.js
├── package.json
└── openapi.yaml
```

## リソース

- [Express.js](https://expressjs.com/)
- [React Router](https://reactrouter.com/)
- [Knex.js](https://knexjs.org/)
- [Axios](https://axios-http.com/)

## API ドキュメント

**Swagger UI：**

BEサーバー起動後、以下からAPI詳細を確認できます：

```
http://localhost:3000/api-docs
```

**エンドポイント：**

- `POST /api/login` - ログイン
- `POST /api/logout` - ログアウト
- `GET /api/me` - 認証状態確認
- `POST /api/attendances/clock-in` - 出勤記録
- `POST /api/attendances/clock-out` - 退勤記録
- `GET /api/attendances` - 勤務記録一覧
- `PATCH /api/attendances/:id` - 勤務記録編集

## 将来の計画

- [ ] エラーハンドリングの強化
- [ ] 入力値バリデーションの改善
- [ ] API テストの追加
- [ ] UI/UX の改善
- [ ] ユーザー管理画面の追加
