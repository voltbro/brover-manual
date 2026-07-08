---
id: 40-network-fallback
slug: network-fallback
title: "Сетевой fallback"
sidebar_label: "Сетевой fallback"
sidebar_position: 4
description: "Ethernet и Wi-Fi fallback на BRover-E5"
---

# Сетевой fallback

На BRover-E5 есть два fallback-механизма для восстановления доступа к роверу, если обычное сетевое подключение недоступно:

* Wi-Fi fallback-точка доступа через `wifi-ap-fallback.service`;
* Ethernet fallback через `network-fallback.service`.

Оба механизма запускаются через `systemd` и работают автоматически.

## Wi-Fi fallback

### Описание

Если при включении ровер в течение 60 секунд не может подключиться к Wi-Fi-сети, он автоматически переключается в режим точки доступа.

Это может произойти, если рядом нет доступной Wi-Fi-сети или ровер ещё не настроен для подключения к вашей сети.

Параметры fallback-точки доступа:

* SSID: имя хоста ровера, например `brover01`;
* пароль: `turtlew001`;
* IP-адрес ровера: `192.168.50.1`;
* веб-интерфейс: `http://192.168.50.1:8080`.

После этого можно подключиться к Wi-Fi-сети ровера по SSH или управлять им через веб-интерфейс.

### Принцип работы

Сервис `wifi-ap-fallback.service` запускает скрипт `/usr/local/bin/wifi-ap-fallback.sh`.

Этот скрипт следит за сетевым интерфейсом `wlan0` и ждёт подключения к Wi-Fi-сетям, указанным в файле `/etc/netplan/20-network-wifi.yaml`. Если спустя 60 секунд подключения нет, скрипт переводит ровер в режим fallback-точки доступа.

В этом режиме скрипт:

* назначает интерфейсу `wlan0` адрес `192.168.50.1/24`;
* подготавливает runtime-конфигурацию `hostapd` в `/run/hostapd-wifi-fallback.conf`;
* запускает `hostapd-wifi-fallback.service`;
* запускает DHCP-сервер `dnsmasq-wifi-fallback.service`;
* перезапускает зависимые сервисы `fastdds.service`, `ros_nodes.service` и `camera.service`.

Если ровер уже перешёл в режим Wi-Fi fallback, автоматического переключения обратно в режим клиента при появлении известной Wi-Fi-сети не происходит. Чтобы ровер снова попытался подключиться к известной Wi-Fi-сети, перезагрузите устройство.

## Ethernet fallback

### Описание

Если в аудитории нестабильное Wi-Fi-подключение, можно подключить Ethernet-кабель напрямую к Raspberry Pi ровера и к компьютеру.

В этом режиме ровер становится доступен по адресу:

```bash
192.168.123.1
```

Этот способ удобно использовать, когда нужно надёжное SSH-подключение к роверу или стабильный доступ к его сервисам без Wi-Fi.

### Принцип работы

Сервис `network-fallback.service` запускает скрипт `/usr/local/bin/network-fallback.sh`.

Этот скрипт следит за сетевым интерфейсом `eth0`. Когда Ethernet-кабель подключён, скрипт ждёт получения DHCP-адреса от внешней сети. Если DHCP-адрес не получен, скрипт включает Ethernet fallback.

В этом режиме скрипт:

* назначает интерфейсу `eth0` адрес `192.168.123.1/24`;
* запускает DHCP-сервер `dnsmasq-fallback.service`;
* перезапускает зависимые сервисы, в том числе `fastdds.service`.

Если DHCP-адрес появляется позже или кабель отключают, fallback-режим выключается.

## Проверка состояния

Проверить состояние Ethernet fallback:

```bash
systemctl status network-fallback.service --no-pager
systemctl status dnsmasq-fallback.service --no-pager
```

В обычном режиме для `network-fallback.service` ожидается состояние `Active: active (running)`. Сервис `dnsmasq-fallback.service` может быть `inactive (dead)`, если Ethernet fallback сейчас не используется.

Проверить состояние Wi-Fi fallback:

```bash
systemctl status wifi-ap-fallback.service --no-pager
systemctl status hostapd-wifi-fallback.service --no-pager
systemctl status dnsmasq-wifi-fallback.service --no-pager
```

В обычном режиме для `wifi-ap-fallback.service` ожидается состояние `Active: active (running)`. Сервисы `hostapd-wifi-fallback.service` и `dnsmasq-wifi-fallback.service` могут быть `inactive (dead)`, если ровер подключён к обычной Wi-Fi-сети и не работает как fallback-точка доступа.

Проверить адреса сетевых интерфейсов:

```bash
ip -br addr
```

Если включён Wi-Fi fallback, у интерфейса `wlan0` должен быть адрес `192.168.50.1/24`. Если включён Ethernet fallback, у интерфейса `eth0` должен быть адрес `192.168.123.1/24`.

Посмотреть журнал fallback-сервисов:

```bash
journalctl -u network-fallback.service --no-pager
journalctl -u wifi-ap-fallback.service --no-pager
journalctl -u hostapd-wifi-fallback.service --no-pager
```

В журнале `network-fallback.service` можно увидеть сообщения о подключении Ethernet-кабеля, ожидании DHCP и включении Ethernet fallback. В журнале `wifi-ap-fallback.service` можно увидеть сообщения о запуске Wi-Fi fallback monitor и переходе в режим точки доступа.

:::warning[Осторожно]

Не останавливайте и не перезапускайте сетевые fallback-сервисы во время работы с ровером без необходимости. Изменение состояния `network-fallback.service`, `wifi-ap-fallback.service`, `hostapd-wifi-fallback.service` или `dnsmasq-*` может временно разорвать соединение с устройством.

:::
