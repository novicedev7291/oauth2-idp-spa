FROM eclipse-temurin:21.0.2_13-jre-jammy

ARG DEPENDENCY_TARGET=user-resource-svc/temp/extracted

COPY ${DEPENDENCY_TARGET} /app

ENTRYPOINT ["java", "-cp", "/app/BOOT-INF/classes:/app/BOOT-INF/lib/*", "com.coding.saga.resource.user.UserResourceSvcApplication"]
