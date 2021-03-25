FROM node:14.4.0-alpine3.11

#ENV USER="node"
#ENV GROUP="node"
ENV UID="1000"
ENV GID="1000"

#RUN addgroup \
#    --gid "$GID" \
#    "$GROUP"
#
#RUN adduser \
#    --disabled-password \
#    --uid "$UID" \
#    --ingroup "$GROUP" \
#    --gecos "App user" \
#    --shell "/bin/sh" \
#    "$USER"

RUN mkdir -p /opt/sns && \
    chown -R "$UID":"$GID" /opt/sns
RUN mkdir -p /opt/sns/app && \
    mkdir -p /opt/sns/logs && \
    chmod 700 /opt/sns/logs

COPY --chown="$UID":"$GID" controllers /opt/sns/app/controllers
COPY --chown="$UID":"$GID" domain /opt/sns/app/domain
COPY --chown="$UID":"$GID" repositories /opt/sns/app/repositories
COPY --chown="$UID":"$GID" package*.json /opt/sns/app/
COPY --chown="$UID":"$GID" server.js /opt/sns/app/
COPY --chown="$UID":"$GID" docker-entrypoint.sh /opt/sns/app/

WORKDIR /opt/sns/app

RUN chmod 700 docker-entrypoint.sh && \
    dos2unix docker-entrypoint.sh && \
    npm install

# Run as user "$UID":"$GID", to ensure nonroot script run.
USER "$UID":"$GID"

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
