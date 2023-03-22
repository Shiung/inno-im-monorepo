pnpm build
cd package
git init && git add -A && git commit -m "Initial commit"

git remote add origin git@gitlab.innotech.me:frontend/im-library.git
git push -f --set-upstream origin master
