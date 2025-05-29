#!/bin/bash

# 現在のブランチ名を取得
current_branch=$(git branch --show-current)

# developブランチが存在することを確認
if ! git rev-parse --verify develop >/dev/null 2>&1; then
  echo "Error: developブランチが存在しません"
  exit 1
fi

# developブランチの最新を取得
git fetch origin develop

# 差分の抽出
echo "=== developブランチと${current_branch}ブランチの差分 ==="
echo "変更されたファイル一覧:"
git diff --name-status develop...$current_branch | cat

echo -e "\n詳細な差分:"
git diff develop...$current_branch | cat

# フロントエンド関連ファイルの差分のみを抽出
echo -e "\n=== フロントエンド関連ファイルの差分 ==="
git diff develop...$current_branch -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.css' '*.scss' '*.html' | cat
