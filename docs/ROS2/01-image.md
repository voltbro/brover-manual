---
id: image
title: Образ Raspberry Pi 5
sidebar_label: Образ Raspberry Pi 5
sidebar_position: 1
description: Образ Raspberry Pi 5
---

Компьютеры Raspberry Pi, поставляемые в составе роботов **Brover E5**, идут с предустановленным образом операционной системы на базе **Ubuntu Server 24.04.3 LTS**.

В состав образа уже входят:

* ROS 2 Jazzy;
* все необходимые системные библиотеки и утилиты для работы робота.

Актуальную версию образа можно скачать по ссылке: https://disk.yandex.ru/d/XdNcAYlAGHu0yg

---

### Версия образа

Версия установленного образа указывается в файле:

```bash
/etc/os-release
```

Пример строки с версией образа:

```
IMAGE_VERSION="broverOS_v2.x.x"
```

---

### Установленное программное обеспечение

#### Системные пакеты

  -   -- libhidapi-de
  -   -- libboost-all-dev

#### ROS-пакеты (ROS 2 Jazzy)

  -   -- ros-jazzy-tf-transformations
  -   -- ros-jazzy-usb-cam
  -   -- ros-jazzy-rosbridge-server
  -   -- ros-jazzy-joy

Домен окружения ROS по умолчанию:

```
ROS_DOMAIN_ID=10
```

---

### CAN и Cyphal

Для работы с шиной [CAN](https://docs.vbcores.ru/docs/SoftwareSetup/rpi-setting) и протоколом [Cyphal](https://docs.vbcores.ru/docs/Cyphal/cyphal-can) в образе установлены следующие утилиты:

-   -- can-utils
  -   [-- yakut](https://docs.vbcores.ru/docs/Cyphal/yakut)

Драйверы моторов обмениваются данными с Raspberry Pi по протоколу **Cyphal поверх CAN FD**.

Параметры CAN-шины хранятся в файле:

```bash
/opt/voltbro/config.ini
```

Параметры Cyphal — в файле:

```bash
~/.yakut_params
```

:::note
 для стабильной работы робота **Brover E5 настоятельно не рекомендуется изменять эти параметры**.
:::
Конфигурация по умолчанию:

```
Type = fd
Bitrate = 1000000
Dbitrate = 8000000
UAVCAN__CAN__IFACE=socketcan:can0
UAVCAN__NODE__ID=101
UAVCAN__CAN__MTU=64
```

---

### Сервис автозапуска ROS

В системе настроен сервис автозагрузки:

* `ros_nodes.service` — запускает все необходимые ROS-ноды и ROS-сервисы робота.

Управление сервисом:

**Остановить сервис:**

```bash
sudo systemctl stop ros_nodes.service
```

**Запустить сервис:**

```bash
sudo systemctl start ros_nodes.service
```

Данный сервис запускает скрипт:

```bash
/usr/local/bin/start_ros_nodes.sh
```

который инициализирует все ROS-программы и сервисы робота.

---

### Запись образа ОС на SD-карту

Для записи образа операционной системы на SD-карту рекомендуется использовать:

* [**balenaEtcher**](https://www.balena.io/etcher/)
* [**Raspberry Pi Imager**](https://www.raspberrypi.com/software/)

Образ записывается **без предварительных пользовательских настроек**.

---

### Имя робота (hostname)

По умолчанию имя робота установлено как:

```
brover01
```

Рекомендуется сразу изменить его в соответствии с номером, указанным на SD-карте робота, в формате:

```
broverNN
```

Для этого необходимо отредактировать файлы:

```bash
/etc/hostname
/etc/hosts
```

и заменить имя `brover01` на `broverNN`.