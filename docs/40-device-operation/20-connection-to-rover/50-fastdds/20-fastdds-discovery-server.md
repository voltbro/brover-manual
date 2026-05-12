---
id: 20-fastdds-discovery-server
slug: fastdds-discovery-server
title: "Подключение к ROS 2 через Discovery Server"
sidebar_label: "Discovery Server"
sidebar_position: 2
description: "Подключение компьютера к ROS 2 сети BRover-E5 через Fast DDS Discovery Server"
---

# Подключение через Discovery Server

В **BRover-E5** по умолчанию используется режим **Fast DDS Discovery Server**.

В этом режиме ровер выступает в роли сервера обнаружения, а внешний компьютер подключается к нему как клиент.

Это позволяет:

* видеть все топики и сервисы ровера
* запускать собственные ROS-ноды на компьютере
* управлять устройством удалённо

---

## Настройка робота для работы с Discovery Server

Основные настройки находятся в файле `/home/pi/.ros_params`. К настройке работы по сети относятся несколько переменных окружения:

```bash
# Установка ROS_DOMAIN_ID для режима Simple Discovery
export ROS_DOMAIN_ID=10 

# Подключение файла конфигурации для режима Discovery Server
export FASTRTPS_DEFAULT_PROFILES_FILE=/home/pi/.ros/fastdds_superclient.xml

# Определение типа DDS
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
```

Если установлено значение `FASTRTPS_DEFAULT_PROFILES_FILE`, то робот работает в режиме `Discovery Server`. Если эту строчку закомментировать, робот будет работать в режиме `Simple Discovery`.


## Настройка подключения (быстрый способ)

1. Определите IP-адрес ровера (см. раздел [SSH-подключения](../20-ssh-connection.md))

2. Откройте терминал на компьютере

3. Выполните команды:

```bash
export ROS_DISCOVERY_SERVER="<IP-адрес ровера>:11811"
export ROS_SUPER_CLIENT=TRUE
```

где:

* `<IP-адрес ровера>` — адрес вашего устройства
* `11811` — стандартный порт Discovery Server

---

## Проверка подключения

Выполните команду:

```bash
ros2 topic list
```

Если всё настроено правильно, вы увидите список топиков ровера.

Если список пуст или не обновляется:

```bash
ros2 daemon stop
ros2 daemon start
```

:::tip
По умолчанию переменные окружения действуют только в текущем терминале.

Чтобы применять их автоматически, добавьте в файл `~/.bashrc`:

```bash
echo 'export ROS_DISCOVERY_SERVER="<IP-адрес ровера>:11811"' >> ~/.bashrc
echo 'export ROS_SUPER_CLIENT=TRUE' >> ~/.bashrc
```

Затем выполните:

```bash
source ~/.bashrc
```

:::


## Альтернативный способ: через XML-конфигурацию

Этот способ подходит для более гибкой настройки Fast DDS.

1. Скачайте конфигурационный файл:

```bash
cd ~
wget https://raw.githubusercontent.com/voltbro/turtlebro2/refs/heads/jazzy/extra/fastdds_superclient.xml

```

2. Откройте файл в любом текстовом редакторе:

```bash
nano fastdds_superclient.xml
```

Ключевые параметры, которые нужно понимать:

* Тег `<discovery_protocol>SUPER_CLIENT</discovery_protocol>` — определяет роль вашего компьютера в сети. Значение SUPER_CLIENT означает, что ваш компьютер будет подключаться к Discovery Server как привилегированный клиент, который видит все топики и сервисы. Обычный CLIENT видит только те узлы, с которыми он обменивается данными напрямую.
* Тег `<leaseDuration>` — задаёт время аренды (в секундах и наносекундах), в течение которого сервер считает клиента активным. По умолчанию установлено 60 секунд. Если клиент не отправляет сигналы в течение этого времени, сервер считает его отключённым.
* Блок `<RemoteServer>` — содержит адрес и порт Discovery Server, к которому нужно подключиться.

3. Замените адрес сервера:

```xml
<address>127.0.0.1</address>
```

на IP-адрес ровера:

```xml
<address>192.168.1.41</address>
```

4. Примените конфигурацию:

```bash
export FASTRTPS_DEFAULT_PROFILES_FILE=$(pwd)/fastdds_superclient.xml
```

5. Проверьте подключение:

```bash
ros2 topic list
```

---

## Когда использовать этот режим

Discovery Server рекомендуется использовать:

* при работе по Wi-Fi
* при наличии нескольких роверов
* для стабильной работы ROS-сети
