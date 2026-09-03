FROM debian:bookworm-slim AS capture-builder
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libx11-dev \
    libxdamage-dev \
    libxext-dev \
    libxfixes-dev \
    libxtst-dev \
    libpng-dev \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /build
COPY xcapture.c .
RUN cc -O3 -fPIC -shared -Wall -Wextra -Werror -o libfurlpay-bot-xcapture.so xcapture.c \
    -lX11 -lXext -lXdamage -lXfixes -lXtst -lpng

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    xvfb \
    x11vnc \
    fluxbox \
    xterm \
    xdotool \
    x11-utils \
    x11-xserver-utils \
    imagemagick \
    novnc \
    websockify \
    python3 \
    ca-certificates \
    procps \
    bash \
    chromium \
    fonts-liberation \
    fonts-dejavu-core \
    dbus-x11 \
    xdg-utils \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --gid 1000 furlpay-bot \
  && useradd --uid 1000 --gid furlpay-bot --create-home --shell /bin/bash furlpay-bot \
  && mkdir -p /etc/furlpay-bot/fluxbox \
  && printf '%s\n' '#!/bin/sh' 'exec xsetroot -solid "#111113" "$@"' > /usr/bin/fbsetbg \
  && chmod +x /usr/bin/fbsetbg \
  && ln -sfn /bin/true /usr/bin/xmessage
ENV DISPLAY=:1
ENV HOME=/home/furlpay-bot
WORKDIR /home/furlpay-bot
# --chmod normalizes modes: a restrictive host umask (e.g. 077 on hardened hosts) would
# otherwise leave these files unreadable to USER 1000 at runtime.
COPY --chmod=755 start.sh /usr/local/bin/furlpay-bot-computer
COPY --chmod=755 control.py /usr/local/bin/furlpay-bot-computer-control
COPY --from=capture-builder /build/libfurlpay-bot-xcapture.so /usr/local/lib/libfurlpay-bot-xcapture.so
COPY --chmod=755 furlpay-bot-browser /usr/local/bin/furlpay-bot-browser
COPY --chmod=644 furlpay-bot-browser.desktop /usr/share/applications/furlpay-bot-browser.desktop
COPY --chmod=644 fluxbox.init /etc/furlpay-bot/fluxbox/init
COPY --chmod=644 fluxbox.apps /etc/furlpay-bot/fluxbox/apps
COPY --chmod=644 fluxbox.menu /etc/furlpay-bot/fluxbox/menu
COPY --chmod=644 embed.html /usr/share/novnc/embed.html
COPY --chmod=644 clipboard-bridge.js /usr/share/novnc/clipboard-bridge.js
# Strip CR so shebangs work even if the build context came from a CRLF checkout.
RUN ldconfig \
  && sed -i 's/\r$//' /usr/local/bin/furlpay-bot-computer /usr/local/bin/furlpay-bot-computer-control /usr/local/bin/furlpay-bot-browser \
    /etc/furlpay-bot/fluxbox/init /etc/furlpay-bot/fluxbox/apps /etc/furlpay-bot/fluxbox/menu
EXPOSE 7070 6080 6081 6082 6083 6084 6085 6086 6087 6088 6089 6090 6091 6092 6093 6094 6095
USER 1000:1000
CMD ["/usr/local/bin/furlpay-bot-computer"]
