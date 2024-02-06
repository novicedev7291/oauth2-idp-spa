FROM eclipse-temurin:21.0.2_13-jre-jammy

ARG DEPENDENCY_TARGET auth-svc/target/temp

COPY ${DEPENDENCY_TARGET}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY_TARGET}/META-INF /app/META-INF
COPY ${DEPENDENCY_TARGET}/classes /app

ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.coding.sage.auth.AuthSvcApplication"]