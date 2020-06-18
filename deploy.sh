npm run build
cd dist
git init
git add -A
git commit -m 'Demo build'
git remote add origin https://github.com/richardwestenra/webpack-web-worker-test.git
git push origin master:gh-pages --force
cd ../