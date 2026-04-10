#!/bin/bash
# ベビーカーNavi — GitHub公開セットアップスクリプト
# 実行前に GITHUB_URL を自分のリポジトリURLに変更してください

GITHUB_URL="https://github.com/shiroma-shiro/baby-stroller-nav.git"

echo "🚃 ベビーカーNavi — GitHubセットアップ開始"
echo ""

# .gitが不完全な場合は削除して再作成
rm -rf .git

# git初期化
git init -b main
echo "✅ git初期化完了"

# .gitignore作成
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.DS_Store
EOF

# コミット
git add .
git commit -m "Initial commit: ベビーカーNavi"
echo "✅ コミット完了"

# リモート登録 & push
git remote add origin "$GITHUB_URL"
git push -u origin main
echo ""
echo "🎉 GitHubへのpush完了！"
echo "次はVercel (https://vercel.com) でこのリポジトリを選んでDeployしてください。"
