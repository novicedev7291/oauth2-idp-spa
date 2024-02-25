FROM nginx

ARG BUILD user-admin-ui

COPY ${BUILD}/dist /app
COPY ${BUILD}/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80