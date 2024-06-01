#!/bin/bash
DOCKER_DIR="docker"

USER_RESOURCE_APP="user-resource-svc"
AUTH_APP="auth-svc"
USER_ADMIN_APP="user-admin-ui"

TEMP_DIR="temp"
AUTH_TEMP_DIR="$DOCKER_DIR/$AUTH_APP/$TEMP_DIR"
USER_RESOURCE_TEMP_DIR="$DOCKER_DIR/$USER_RESOURCE_APP/$TEMP_DIR"
USER_ADMIN_TEMP_DIR="$DOCKER_DIR/$USER_ADMIN_APP/$TEMP_DIR"

function build {
    if [[ $2 == "clean" ]]; then
        echo "maven clean installation..."
        mvn clean install
    else
        mvn install
    fi

    cd user-admin-ui
    npm install
    npm run build

    cd ..

    echo "creating temp directories to copy build artifacts..."
    mkdir -p $AUTH_TEMP_DIR $USER_RESOURCE_TEMP_DIR $USER_ADMIN_TEMP_DIR

    echo "copy build artifacts into temp dir..."
    cp "$AUTH_APP/target/auth-svc-0.0.1-SNAPSHOT.jar" "$AUTH_TEMP_DIR/"
    cp "$USER_RESOURCE_APP/target/user-resource-svc-0.0.1-SNAPSHOT.jar" "$USER_RESOURCE_TEMP_DIR/"
    cp -rf "$USER_ADMIN_APP/dist" "$USER_ADMIN_APP/nginx.conf" "$USER_ADMIN_TEMP_DIR/"

    mkdir -p "$AUTH_TEMP_DIR/extracted" "$USER_RESOURCE_TEMP_DIR/extracted"
    (cd "$AUTH_TEMP_DIR/extracted" && exec jar -xf ../*.jar)
    (cd "$USER_RESOURCE_TEMP_DIR/extracted" && exec jar -xf ../*.jar)
}

function show_logs {
    (cd docker && exec docker compose logs)
}

function docker_build {
    cd docker
    #TOCHECK: it seems to update any dependencies as well?
    if [[ "$3" == "plainlogs" ]]; then
        docker compose build --progress=plain $2
    else
        docker compose build $2
    fi
    cd ..
}

function run {
    cd docker
    docker compose up -d
    cd ..
}

function cleanup {
    echo "cleaning up temp directories..."
    rm -rf $AUTH_TEMP_DIR $USER_RESOURCE_TEMP_DIR $USER_ADMIN_TEMP_DIR
}

function docker_down {
    (cd docker && exec docker compose down)
}

if [[ "$1" == "clean" ]]; then
    cleanup
fi

if [[ "$1" == "build" ]]; then
    build
fi

if [[ "$1" == "run" ]]; then
    run
fi

if [[ "$1" == "rebuild-image" ]]; then
    if [[ -z "$2" ]]; then
        echo "provide service name to rebuilt..."
        exit 1
    fi
    docker_build
fi

if [[ "$1" == "down" ]]; then
    docker_down
fi

if [[ "$1" == "logs" ]]; then
    show_logs
fi
