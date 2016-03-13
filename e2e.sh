PORT=8082

./node_modules/.bin/webpack-dev-server \
  --quiet --hot --history-api-fallback\
  --config demo/webpack.config.js \
  --content-base demo \
  --host 0.0.0.0 \
  --port $PORT &

PORT=$PORT ./node_modules/.bin/nightwatch \
  -c nightwatch.json \
  -e chrome,firefox \
  && kill $! || (kill $! && exit 1)
