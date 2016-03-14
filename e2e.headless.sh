/usr/bin/Xvfb :99 -ac -screen 0 1280x1024x8 &
export DISPLAY=:99

PORT=8082

./node_modules/.bin/webpack-dev-server \
  --quiet --hot --history-api-fallback\
  --config demo/webpack.config.js \
  --content-base demo \
  --host 0.0.0.0 \
  --port $PORT &

PORT=$PORT ./node_modules/.bin/nightwatch \
  -c nightwatch.json \
  -e firefox \
  && kill $! || (kill $! && exit 1)

pkill Xvfb