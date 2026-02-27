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

Актуальную версию образа можно скачать по ссылке: *(здесь будет ссылка)*.

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



<!-- Компьютеры Raspberry, идущие в комплекте с роботами, поставляются с предустановленными ОС Ubuntu Server 24.04.3 LTS, ROS Jazzy и всеми необходимыми системными пакетами. Последнюю версию образа вы можете скачать по ссылке *здесь будет ссылка*.

В файле `/etс/os-realease` указана версия образа: `IMAGE_VERSION="broverOS_v2.x.x"` 

На образе установлены:
- Системные пакеты:
  -   -- libhidapi-de
  -   -- libboost-all-dev
- ROS пакеты:
  -   -- ros-jazzy-tf-transformations
  -   -- ros-jazzy-usb-cam
  -   -- ros-jazzy-rosbridge-server
  -   -- ros-jazzy-joy
  Домен окружения ROS: ROS_DOMAIN_ID = 10.
- Утилиты для работы с протоколом [CAN](https://docs.vbcores.ru/docs/SoftwareSetup/rpi-setting), [Cyphal](https://docs.vbcores.ru/docs/Cyphal/cyphal-can):
  -   -- can-utils
  -   [-- yakut](https://docs.vbcores.ru/docs/Cyphal/yakut)

Драйверы моторов обмениваются данными с Raspberry PI по **cyphal can**. Параметры, указанные для шины CAN, записаны в файл `/opt/voltbro/config.ini`, параметры, необходимые для работы с cyphal `~/.yakut_params`. Настоятельно рекомендуем для стабильной работы Brover E5 их не менять. По умолчанию стоят следующие конфигурации:
- Type = fd
- Bitrate = 1000000
- Dbitrate = 8000000
- UAVCAN__CAN__IFACE=socketcan:can0
- UAVCAN__NODE__ID=101
- UAVCAN__CAN__MTU=64

#### Сервис в автозагрузке
- **ros_nodes.service** - запускает все ros программы и ros сервисы

•	Остановить работу сервиса:
```
sudo systemctl stop ros_nodes.service
```
•	Запустить сервис обратно: 
```
sudo systemctl start ros_nodes.service
```
•	Данный сервис запускает скрипт `/usr/local/bin/start_ros_nodes.sh.`, который стартует все ros программы и ros сервисы 

## Загрузка образа ОС на SD-карту без настроек

Проще всего загрузить образ на SD карту с помощью программы [balenaEtcher](https://www.balena.io/etcher/) или [Raspberry Pi Imager ](https://www.raspberrypi.com/software/) 

По умолчанию, имя робота установлено brover01.

Рекомендуется сразу изменить его на имя согласно номеру на sd-карте робота broverNN. Для этого необходимо отредактировать файлы /etc/hosts и /etc/hostname, расположенные на роботе, и переименовать brover01->broverNN. -->