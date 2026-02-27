---
id: fastdds
title: Удаленное подключение к ROS
sidebar_label: Удаленное подключение к ROS
sidebar_position: 5
description: Удаленное подключение к ROS
---

Архитектура ROS позволяет подключать множество сетевых устройств в одну ROS сеть. В этом режиме любое устройство имеет доступ к данным других устройств. Например, вы можете настроить настольный компьютер и робот в одну сеть и работать с ними удаленно.

## FastDDS
Робот настроен для работы c `FastDDS` в режиме [Discovery-Server](https://docs.ros.org/en/jazzy/Tutorials/Advanced/Discovery-Server/Discovery-Server.html).

В режиме `Discovery-Server` меньше проблем с работой по WiFi и в условиях учебного класса, где работает несколько роботов.

Настройки FastDDS находятся в файле `/home/pi/.ros/fastdds_supeclient.xml`

Аналогично вы можете настроить удаленное подключение с любого компьютера сети.

Скачайте файл с настройками:
```
wget https://raw.githubusercontent.com/voltbro/turtlebro2/master/extra/fastdds_supeclient.xml
```

Измените адрес Discovery сервера (укажите адрес робота) в файле:
```
<address>127.0.0.1</address>
```
Примените настройки в окружении пользователя:
```
export FASTRTPS_DEFAULT_PROFILES_FILE=./fastdds_supeclient.xml
```
Выполните тестовую команду:
```
ros2 topic list
```
Если вы не получили списка топиков, возможно, сервер закешировал данные. Попробуйте перезапустить сервер кеширования:
```
ros2 daemon stop
```
## Работа без Discovery-Server

Вы можете вернуться к работе в режиме **Simple Discovery**.

Для этого уберите строчку из файла `.ros_params`
```
export FASTRTPS_DEFAULT_PROFILES_FILE=./fastdds_supeclient.xml
```

:::info
В режиме Simple Discovery учитывается значение переменной окружения ROS_DOMAIN_ID. По умолчанию для Raspberry Pi установлено значение 10
:::