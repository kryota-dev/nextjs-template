# GitHub Actions Variables & Secrets 設定ガイド

このドキュメントでは、プロジェクトのGitHub Actionsワークフローで使用されている環境変数（Variables）とシークレット（Secrets）について説明します。

## 📋 概要

GitHub Actionsでは、機密情報や環境固有の設定を安全に管理するために、以下の2つの仕組みを使用しています：

- **Variables (vars)**: 公開されても問題ない環境固有の設定値
- **Secrets**: 機密情報やAPIキーなどの秘匿すべき値

## 🔧 Variables (vars) 一覧

### 1. `DEPLOY_TYPE`

- **用途**: デプロイ方法の指定
- **設定値**: `ftp`
- **使用ワークフロー**:
  - `delete-ftp-server.yml`
  - `deploy-ftp-server.yml`
- **説明**: デプロイ先の種類を指定。現在はFTPサーバーへのデプロイのみ対応

### 2. `NEXT_PUBLIC_BASE_PATH`

- **用途**: Next.jsアプリケーションのベースパス設定
- **設定値**: プロジェクト固有のベースパス（例: `/subdir`）
- **使用ワークフロー**:
  - `delete-ftp-server.yml`
  - `deploy-ftp-server.yml`
- **説明**: サブディレクトリでホスティングする場合のパス設定。空文字の場合はルートパスでホスティング

### 3. `NEXT_PUBLIC_HOME_URL`

- **用途**: アプリケーションのホームURL
- **設定値**: 本番環境のベースURL（例: `https://example.com`）
- **使用ワークフロー**:
  - `deploy-ftp-server.yml`
- **説明**: デプロイ後のアクセスURLの生成に使用

### 4. `NEXT_PUBLIC_FEATURE_FLAG`

- **用途**: フィーチャーフラグの制御
- **設定値**: `true` または `false` （デフォルトは`false`）
- **使用ワークフロー**:
  - `deploy-ftp-server.yml`
- **説明**: mainブランチでは設定値に依存、その他のブランチでは常に`true`

### 5. `FTP_DRY_RUN`

- **用途**: FTP操作のドライラン実行
- **設定値**: `true` または `false`（デフォルトは `false`）
- **使用ワークフロー**:
  - `delete-ftp-server.yml`
  - `deploy-ftp-server.yml`
- **説明**: `true`に設定すると、実際のファイル転送や削除を行わずにログ出力のみを実行

### 6. `ADD_LABELS_BRANCH`

- **用途**: GitHubラベル自動追加の対象ブランチ
- **設定値**: `develop`（デフォルト）
- **使用ワークフロー**:
  - `add-github-labels.yml`
- **説明**: 指定されたブランチでのみラベルの自動追加処理を実行

## 🔐 Secrets 一覧

### FTPデプロイ関連

#### 1. `FTP_SERVER`

- **用途**: FTPサーバーのホスト名またはIPアドレス
- **使用ワークフロー**:
  - `delete-ftp-server.yml`
  - `deploy-ftp-server.yml`
- **説明**: デプロイ先のFTPサーバー情報

#### 2. `FTP_USERNAME`

- **用途**: FTP接続用のユーザー名
- **使用ワークフロー**:
  - `delete-ftp-server.yml`
  - `deploy-ftp-server.yml`
- **説明**: FTPサーバーへの認証に使用

#### 3. `FTP_PASSWORD`

- **用途**: FTP接続用のパスワード
- **使用ワークフロー**:
  - `delete-ftp-server.yml`
  - `deploy-ftp-server.yml`
- **説明**: FTPサーバーへの認証に使用

#### 4. `FTP_PATH`

- **用途**: FTPサーバー上のベースディレクトリパス
- **使用ワークフロー**:
  - `delete-ftp-server.yml`
  - `deploy-ftp-server.yml`
- **説明**: ファイルをアップロードするサーバー上のディレクトリ（末尾スラッシュ不要）
- **例**: `/var/www/html`

### Google Tag Manager関連

#### 5. `NEXT_PUBLIC_GTM_ID`

- **用途**: Google Tag ManagerのコンテナID
- **使用ワークフロー**:
  - `deploy-ftp-server.yml`
- **説明**: アクセス解析用のGTM設定（例: `GTM-XXXXXXX`）

### MicroCMS関連

#### 6. `NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN`

- **用途**: MicroCMSのサービスドメイン
- **使用ワークフロー**:
  - `deploy-ftp-server.yml`
- **説明**: コンテンツ取得用のMicroCMSエンドポイント

#### 7. `NEXT_PUBLIC_MICROCMS_API_KEY`

- **用途**: MicroCMSのクライアントサイド用APIキー
- **使用ワークフロー**:
  - `deploy-ftp-server.yml`
- **説明**: ブラウザから直接アクセス可能なAPIキー（読み取り専用推奨）

#### 8. `SERVER_ONLY_MICROCMS_API_KEY`

- **用途**: MicroCMSのサーバーサイド専用APIキー
- **使用ワークフロー**:
  - `deploy-ftp-server.yml`
- **説明**: サーバーサイドでのみ使用する高権限APIキー

### 外部サービス連携

#### 9. `CHROMATIC_PROJECT_TOKEN`

- **用途**: Chromaticプロジェクトの認証トークン
- **使用ワークフロー**:
  - `chromatic.yml`
- **説明**: Storybookのビジュアルテスト用サービス連携

## 🛠️ 設定方法

### Variables の設定

1. GitHubリポジトリページで `Settings` → `Secrets and variables` → `Actions` に移動
2. `Variables` タブを選択
3. `New repository variable` をクリック
4. 変数名と値を入力して保存

### Secrets の設定

1. GitHubリポジトリページで `Settings` → `Secrets and variables` → `Actions` に移動
2. `Secrets` タブを選択
3. `New repository secret` をクリック
4. シークレット名と値を入力して保存

## 🚨 セキュリティガイドライン

### Variables使用時の注意点

- ❌ 機密情報は Variables に保存しない
- ✅ 公開されても問題ない設定値のみ使用
- ✅ 環境固有の非機密設定に適用

### Secrets使用時の注意点

- ✅ APIキー、パスワード、トークンなどの機密情報のみ使用
- ✅ 定期的なローテーション（特にAPIキー）
- ✅ 最小権限の原則に従った設定
- ❌ ログに出力される可能性のある箇所での使用は避ける

### MicroCMS APIキーの管理

- `NEXT_PUBLIC_MICROCMS_API_KEY`: 読み取り専用権限のみ付与
- `SERVER_ONLY_MICROCMS_API_KEY`: 必要最小限の権限のみ付与
- 定期的なキーのローテーションを実施

### FTP認証情報の管理

- 専用のFTPユーザーを作成し、必要最小限のディレクトリアクセス権限のみ付与
- パスワードは強力で一意なものを使用
- 定期的なパスワード変更を実施

## 📊 ワークフロー別使用状況

### `delete-ftp-server.yml`

- **Variables**: `DEPLOY_TYPE`, `NEXT_PUBLIC_BASE_PATH`, `FTP_DRY_RUN`
- **Secrets**: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PATH`

### `deploy-ftp-server.yml`

- **Variables**: `DEPLOY_TYPE`, `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_HOME_URL`, `NEXT_PUBLIC_FEATURE_FLAG`, `FTP_DRY_RUN`
- **Secrets**: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PATH`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN`, `NEXT_PUBLIC_MICROCMS_API_KEY`, `SERVER_ONLY_MICROCMS_API_KEY`

### `chromatic.yml`

- **Secrets**: `CHROMATIC_PROJECT_TOKEN`

### `add-github-labels.yml`

- **Variables**: `ADD_LABELS_BRANCH`

### `automated-release.yml`

- **使用なし**: このワークフローはVariablesやSecretsを使用しません

### `check-quality.yml`

- **使用なし**: このワークフローはVariablesやSecretsを使用しません

## 🔄 メンテナンス

### 定期確認項目

1. **月次確認**
   - 未使用のSecretsの整理
   - APIキーの有効期限確認
   - アクセス権限の見直し

2. **四半期確認**
   - MicroCMS APIキーのローテーション
   - FTPパスワードの変更検討
   - Chromatic トークンの確認

3. **年次確認**
   - 全Secretsの棚卸し
   - セキュリティポリシーの見直し
   - アクセス権限の全体的な監査

## ❓ トラブルシューティング

### よくある問題

1. **ワークフローがスキップされる**
   - `DEPLOY_TYPE` が `ftp` に設定されているか確認
   - 対象ブランチでの実行かどうか確認

2. **FTPデプロイが失敗する**
   - FTP認証情報の確認
   - `FTP_PATH` の末尾スラッシュ確認
   - サーバーの接続制限確認
     - **特に海外IPからの接続を制限している場合は、サーバーの設定を確認**

3. **MicroCMSからデータが取得できない**
   - APIキーの有効性確認
   - サービスドメインの正確性確認
   - API制限の確認

4. **Chromaticのテストが実行されない**
   - `CHROMATIC_PROJECT_TOKEN` の有効性確認
   - プロジェクト設定の確認

---

## 📚 関連ドキュメント

- [GitHub Actions Documentation](https://docs.github.com/ja/actions)
- [MicroCMS API Documentation](https://document.microcms.io/)
- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
