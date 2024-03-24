FROM nginx

ARG BUILD=user-admin-ui/temp

COPY ${BUILD} /app
COPY ${BUILD}/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]