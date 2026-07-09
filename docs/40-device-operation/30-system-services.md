---
id: 30-system-services
slug: system-services
title: "Системные сервисы"
sidebar_label: "Системные сервисы"
sidebar_position: 3
description: "Systemd-сервисы BRover-E5"
---

# Системные сервисы

После включения ровера основные программные компоненты запускаются автоматически через `systemd`.

## Основные сервисы

| Сервис | Назначение |
| ------ | ---------- |
| `ros_nodes.service` | запуск основных ROS 2-нод ровера |
| `camera.service` | запуск USB-камеры через пакет `usb_cam` |
| `fastdds.service` | запуск Fast DDS Discovery Server |
| `canhat.service` | настройка CAN-интерфейсов `can0` и `can1` |
| `code-server@pi.service` | запуск VS Code Web для пользователя `pi` |
| `network-fallback.service` | мониторинг Ethernet-подключения и fallback-сети |
| `wifi-ap-fallback.service` | мониторинг Wi-Fi и запуск fallback-точки доступа |
| `hostapd-wifi-fallback.service` | запуск Wi-Fi точки доступа в fallback-режиме |
| `dnsmasq-fallback.service` | DHCP-сервер для Ethernet fallback |
| `dnsmasq-wifi-fallback.service` | DHCP-сервер для Wi-Fi fallback |

## Проверка состояния сервисов

Посмотреть состояние сервиса можно командой:

```bash
systemctl status <имя_сервиса> --no-pager
```

Например:

```bash
systemctl status ros_nodes.service --no-pager
systemctl status camera.service --no-pager
systemctl status fastdds.service --no-pager
systemctl status canhat.service --no-pager
```

Посмотреть список проблемных сервисов:

```bash
systemctl --failed
```

Ожидаемое состояние зависит от типа сервиса:

* постоянно работающие сервисы, например `ros_nodes.service`, `camera.service` и `fastdds.service`, обычно должны быть в состоянии `active (running)`;
* разовые сервисы настройки, например `canhat.service`, после успешного выполнения могут быть в состоянии `active (exited)`.

## Основные ROS-ноды

Сервис `ros_nodes.service` запускает скрипт:

```bash
/usr/local/bin/start_ros_nodes.sh
```

Этот скрипт поднимает основные ROS-компоненты ровера:

* `brover_control`;
* `brover_web`;
* `cyphal_ros2_bridge`;
* управление движением;
* IMU;
* одометрию;
* мониторинг батареи;
* радиоуправление;
* web bridge и видеосервер.

При запуске сервис также выполняет начальные действия: сбрасывает одометрию, устанавливает индикацию кнопок и подаёт звуковой сигнал.

## Камера

Сервис `camera.service` запускает скрипт:

```bash
/usr/local/bin/start_camera.sh
```

Скрипт ищет USB-камеры через `/dev/v4l/by-id` и `/dev/v4l/by-path`, формирует параметры для `usb_cam` и запускает ноду `/camera1`.

Если камера не найдена или временно недоступна, сервис перезапускается автоматически.

## Fast DDS

Сервис `fastdds.service` запускает Fast DDS Discovery Server на ровере. Он используется для обнаружения ROS 2-нод в сети.

В штатном состоянии сервис должен быть `active (running)`. В выводе `systemctl status fastdds.service --no-pager` обычно виден процесс `fast-discovery-server` и порт `11811`.

Если внешний компьютер не видит ROS 2-топики ровера, проверьте:

```bash
systemctl status fastdds.service --no-pager
```

Подробнее о подключении к ROS 2-сети см. раздел [Fast DDS](./20-connection-to-rover/50-fastdds/10-fastdds.md).

## CAN Hat

Сервис `canhat.service` настраивает CAN-интерфейсы ровера:

* `can0` — системная CAN-шина ровера;
* `can1` — пользовательская CAN-шина.

Это разовый сервис настройки. После успешного запуска он может находиться в состоянии `active (exited)`, и это нормально.

Проверить состояние CAN-настройки:

```bash
systemctl status canhat.service --no-pager
ip -details link show can0
ip -details link show can1
```

В журнале успешного запуска обычно видно, что сервис выполнил настройку `can0` и `can1` с параметрами CAN FD.

Для пользовательских задач используйте `can1`. Интерфейс `can0` используется системными компонентами ровера.

Подробнее см. раздел [Работа с CAN на роботе](./50-can-communication-on-robot.md).

## Code-server

Сервис `code-server@pi.service` запускает VS Code Web для пользователя `pi`.

## Сетевой fallback

Сервисы `network-fallback.service` и `wifi-ap-fallback.service` следят за доступностью сети и могут включать fallback-режимы для прямого подключения к роверу.

Подробнее см. раздел [Сетевой fallback](./40-network-fallback.md).

## Просмотр логов

Для сервисов ROS и камеры используются отдельные лог-файлы:

```bash
/var/log/ros_nodes.log
/var/log/ros_nodes.err
/var/log/camera.log
/var/log/camera.err
```

Также можно смотреть журнал `systemd`:

```bash
journalctl -u ros_nodes.service --no-pager
journalctl -u camera.service --no-pager
journalctl -u fastdds.service --no-pager
journalctl -u canhat.service --no-pager
journalctl -u network-fallback.service --no-pager
journalctl -u wifi-ap-fallback.service --no-pager
```

:::warning[Осторожно]

Не останавливайте и не перезапускайте сервисы ровера без необходимости. Остановка `ros_nodes.service` или `camera.service` может прервать управление, видеопоток или работу пользовательских ROS-программ.

:::
