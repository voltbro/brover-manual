---
id: services
title: ROS сервисы
sidebar_label: ROS сервисы
sidebar_position: 4
description: ROS сервисы
---

На ровере реализованы пользовательские ROS-сервисы, предназначенные для вспомогательных функций, таких как **управление индикацией и сброс одометрии**.

Доступные сервисы
```
/hmi/led      тип запроса cyphal_ros2_bridge/srv/CallHMILed
/odom/reset   тип запроса std_srvs/srv/Empty
```
Общий формат вызова сервиса
```
ros2 service call <имя_сервиса> <тип_запроса> <сообщение_запроса>
```
---

**`/hmi/led` — управление подсветкой кнопок**

Сервис предназначен для управления цветом:
- пользовательской кнопки;
- кнопки включения питания.

Пример вызова
```
ros2 service call /hmi/led cyphal_ros2_bridge/srv/CallHMILed "{'led': {'r':0, 'g':255, 'b':0, 'interface':1}}"
```
Сообщение запроса передаётся в формате JSON и содержит:
- значения цвета в формате RGB (r, g, b) в диапазоне от 0 до 255;
- поле `interface`, определяющее, к какой кнопке применяется цвет.

Значения поля interface:
- 1 — пользовательская кнопка
- 0 — кнопка питания

---

**`/odom/reset` — сброс одометрии**

Сервис предназначен для сброса одометрии робота.
Тип сообщения — `std_srvs/srv/Empty`, поэтому передача дополнительных данных не требуется.

Пример вызова
```
ros2 service call /odom/reset std_srvs/srv/Empty
```
:::info
Для получения подробной информации о сервисе используйте утилиту ROS 2:
```
ros2 service info <имя_сервиса>
```
Например:
```
ros2 service info /odom/reset
```
:::
<!-- Пользовательские сервисы на ровере, которыми пользователи  могут пользоваться:
```
/hmi/led тип запроса-сообщения cyphal_ros2_bridge/srv/CallHMILed 
/odom/reset тип запроса-сообщения std_srvs/srv/Empty
```
 Структура вызова сервиса:
```
ros2 service call <название сервиса> <тип сообщения> <сообщение>
```

Сервис `/hmi/led` Управление цветом пользовательской кнопки и кнопки включения. Пример вызова:
```
ros2 service call /hmi/led cyphal_ros2_bridge/srv/CallHMILed "{'led': {'r':0, 'g':255, 'b':0, 'interface':1}}"
```
Здесь само сообщение имеет формат json, сначала задается цвет, используя rgb значения от 0 до 255, потом задается к какой кнопке применить заданный цвет:

'interface':1 - пользовательская кнопка
'interface':0 - кнопка питания

Сервис `/odom/reset` - сброс одометрии робота, тут не нужно передавать никаких сообщений так как тип сообщения пустой, поэтому пример вызова следующий:
```
ros2 service call /odom/reset std_srvs/srv/Empty
``` 
:::info
Чтобы получить более подробную информацию о сервисе используйте утилиту `ros2 service info <название сервиса>`, например:
```
ros2 service info /odom/reset
```
::: -->

Полный список сервисов запущенных на ровере:
```
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
/usb_cam/describe_parameters
/usb_cam/get_parameter_types
/usb_cam/get_parameters
/usb_cam/get_type_description
/usb_cam/list_parameters
/usb_cam/set_camera_info
/usb_cam/set_parameters
/usb_cam/set_parameters_atomically
/web_video_server/describe_parameters
/web_video_server/get_parameter_types
/web_video_server/get_parameters
/web_video_server/get_type_description
/web_video_server/list_parameters
/web_video_server/set_parameters
/web_video_server/set_parameters_atomically
```