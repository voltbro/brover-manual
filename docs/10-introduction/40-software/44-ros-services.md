---
id: 44-ros-services
slug: ros-services
title: "ROS 2 сервисы"
sidebar_label: "ROS 2 сервисы"
sidebar_position: 4
description: "Описание используемых на ровере ROS 2 сервисов"
---

# ROS-сервисы

Помимо топиков, в системе **BRover-E5** используются ROS-сервисы. В отличие от топиков, сервисы применяются для выполнения разовых действий по запросу — например, изменения состояния системы или выполнения служебных операций.

Актуальный список доступных сервисов можно получить командой:

```bash
ros2 service list
```

В системе присутствует большое количество стандартных сервисов ROS (например, работа с параметрами нод), а также пользовательские сервисы, реализующие прикладную функциональность ровера.

## Пользовательские сервисы

На ровере реализованы два основных пользовательских сервиса:

```bash
/hmi/led
/odom/reset
```

### Общий формат вызова

Вызов любого ROS-сервиса выполняется командой:

```bash
ros2 service call <имя_сервиса> <тип_сервиса> <сообщение>
```

## Управление индикацией

Сервис `/hmi/led` используется для управления подсветкой кнопок на роботе.

Он позволяет изменять цвет:

* пользовательской кнопки
* кнопки питания

Тип сервиса:

```bash
cyphal_ros2_bridge/srv/CallHMILed
```

Пример вызова:

```bash
ros2 service call /hmi/led cyphal_ros2_bridge/srv/CallHMILed "{'led': {'r':0, 'g':255, 'b':0, 'interface':1}}"
```

В запросе задаются:

* значения цвета в формате RGB (r, g, b) в диапазоне от 0 до 255
* поле `interface`, определяющее, к какой кнопке применяется команда

Значения поля `interface`:

* `1` — пользовательская кнопка
* `0` — кнопка питания

Таким образом можно программно управлять визуальной индикацией состояния системы.

## Сброс одометрии

Сервис `/odom/reset` используется для сброса текущих координат ровера.

Тип сервиса:

```bash
std_srvs/srv/Empty
```

Так как сервис не требует входных данных, вызов выполняется без передачи сообщения:

```bash
ros2 service call /odom/reset std_srvs/srv/Empty
```

После вызова сервиса положение ровера (одометрия) обнуляется.

## Служебные сервисы ROS

Помимо пользовательских сервисов, каждая нода предоставляет стандартный набор сервисов для работы с параметрами:

* получение параметров (`get_parameters`)
* установка параметров (`set_parameters`)
* список параметров (`list_parameters`)
* описание параметров (`describe_parameters`)

Эти сервисы используются для настройки и отладки системы.

## Получение информации о сервисах

Для получения подробной информации о конкретном сервисе используйте команду:

```bash
ros2 service info <имя_сервиса>
```

Например:

```bash
ros2 service info /odom/reset
```

Это позволяет узнать тип сервиса, а также какие ноды являются его сервером и клиентами.

## Полный список сервисов

Ниже приведён полный список сервисов, доступных в базовой конфигурации:

```bash
/camera1/describe_parameters
/camera1/get_parameter_types
/camera1/get_parameters
/camera1/get_type_description
/camera1/list_parameters
/camera1/set_camera_info
/camera1/set_parameters
/camera1/set_parameters_atomically
/control_move/describe_parameters
/control_move/get_parameter_types
/control_move/get_parameters
/control_move/get_type_description
/control_move/list_parameters
/control_move/set_parameters
/control_move/set_parameters_atomically
/cyphal_bridge/describe_parameters
/cyphal_bridge/get_parameter_types
/cyphal_bridge/get_parameters
/cyphal_bridge/get_type_description
/cyphal_bridge/list_parameters
/cyphal_bridge/set_parameters
/cyphal_bridge/set_parameters_atomically
/hmi/led
/imu/describe_parameters
/imu/get_parameter_types
/imu/get_parameters
/imu/get_type_description
/imu/list_parameters
/imu/set_parameters
/imu/set_parameters_atomically
/joy/describe_parameters
/joy/get_parameter_types
/joy/get_parameters
/joy/get_type_description
/joy/list_parameters
/joy/set_parameters
/joy/set_parameters_atomically
/odom/describe_parameters
/odom/get_parameter_types
/odom/get_parameters
/odom/get_type_description
/odom/list_parameters
/odom/reset
/odom/set_parameters
/odom/set_parameters_atomically
/radiolink_control/describe_parameters
/radiolink_control/get_parameter_types
/radiolink_control/get_parameters
/radiolink_control/get_type_description
/radiolink_control/list_parameters
/radiolink_control/set_parameters
/radiolink_control/set_parameters_atomically
/rosbridge_server/describe_parameters
/rosbridge_server/get_parameter_types
/rosbridge_server/get_parameters
/rosbridge_server/get_type_description
/rosbridge_server/list_parameters
/rosbridge_server/set_parameters
/rosbridge_server/set_parameters_atomically
/set_capture
/web_video_server/describe_parameters
/web_video_server/get_parameter_types
/web_video_server/get_parameters
/web_video_server/get_type_description
/web_video_server/list_parameters
/web_video_server/set_parameters
/web_video_server/set_parameters_atomically
```
