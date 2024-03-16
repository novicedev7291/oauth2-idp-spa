FROM eclipse-temurin:21.0.2_13-jre-jammy

ARG DEPENDENCY_TARGET=auth-svc/temp/extracted

COPY ${DEPENDENCY_TARGET} /app

ENTRYPOINT ["java", "-cp", "/app/BOOT-INF/classes:/app/BOOT-INF/lib/*", "com.coding.saga.auth.AuthSvcApplication"]
