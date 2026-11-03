---
id: 80-diagnostics-and-common-issues
slug: diagnostics-and-common-issues
title: "Диагностика и типовые проблемы"
sidebar_label: "Диагностика"
sidebar_position: 8
description: "Диагностика BRover-E5 и решение типовых проблем"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Диагностика и типовые проблемы

Эта страница помогает быстро проверить состояние **BRover-E5** и разобраться с типовыми ситуациями: ровер не находится в сети, не открывается веб-интерфейс, нет видеопотока, не видны ROS 2-топики или не работает управление.

:::warning[Осторожно]

Перезапуск сервисов может временно прервать управление ровером, видеопоток, SSH-сессию или подключение к веб-интерфейсу. Если ровер может начать движение, сначала установите его в безопасное положение.

:::

## Быстрый выбор проблемы

| Ситуация | С чего начать |
| -------- | ------------- |
| Кнопка питания мигает красным | [Кнопка питания мигает красным](#кнопка-питания-мигает-красным) |
| Ровер включён, но не находится в сети | [Ровер не находится в сети](#ровер-не-находится-в-сети) |
| Не получается подключиться по SSH | [Не удаётся подключиться по SSH](#не-удаётся-подключиться-по-ssh) |
| Не открывается веб-интерфейс | [Не открывается веб-интерфейс](#не-открывается-веб-интерфейс) |
| Веб-интерфейс открыт, но ROS недоступен | [Веб-интерфейс открыт, но ROS недоступен](#веб-интерфейс-открыт-но-ros-недоступен) |
| Нет изображения с камеры | [Нет изображения с камеры](#нет-изображения-с-камеры) |
| Не открывается code-server | [Не открывается code-server](#не-открывается-code-server) |
| Компьютер не видит ROS 2-топики | [Компьютер не видит ROS 2-топики ровера](#компьютер-не-видит-ros-2-топики-ровера) |
| Не работает управление | [Ровер не реагирует на пульт](#ровер-не-реагирует-на-пульт) или [команды из веб-интерфейса](#ровер-не-реагирует-на-команды-из-веб-интерфейса) |
| Есть проблемы с CAN или fallback-сетями | [Проблемы с CAN](#проблемы-с-can) или [Проблемы с fallback-сетями](#проблемы-с-fallback-сетями) |

## Быстрая проверка состояния

Если доступ по SSH уже есть, начните с общей проверки:

```bash
systemctl --failed
```

В исправном состоянии список failed-сервисов должен быть пустым.

Проверьте ключевые сервисы:

```bash
systemctl status ros_nodes.service --no-pager
systemctl status camera.service --no-pager
systemctl status fastdds.service --no-pager
systemctl status code-server@pi.service --no-pager
```

Проверьте сетевые адреса:

```bash
ip -br addr
```

Проверьте открытые порты:

```bash
ss -tuln
```

Обычно на ровере должны быть доступны:

| Порт | Назначение |
| ---- | ---------- |
| `22/tcp` | SSH |
| `8080/tcp` | веб-интерфейс |
| `8090/tcp` | code-server |
| `9090/tcp` | rosbridge |
| `9999/tcp` | web_video_server |
| `11811/udp` | Fast DDS Discovery Server |

## Проверка версии образа ОС

Проверьте версию установленного образа:

```bash
grep '^IMAGE_VERSION=' /etc/os-release
```

Ожидаемый формат:

```bash
IMAGE_VERSION="broverOS_vX.Y"
```

Если строка `IMAGE_VERSION` не найдена, посмотрите полный файл:

```bash
cat /etc/os-release
```

Рекомендуется использовать самую свежую версию образа `broverOS`. Инструкция по перепрошивке microSD-карты приведена в разделе [Обновление образа ОС](../30-device-configuration/40-updating-os-image.md).

## Кнопка питания мигает красным

1. Остановите движение ровера.
2. Проверьте напряжение аккумулятора в веб-интерфейсе.
3. При напряжении 13,8 В или ниже выключите ровер и зарядите аккумулятор.

## Ровер не находится в сети

Проверьте, в каком сетевом сценарии должен быть доступен ровер.

<Tabs groupId="network-diagnostics">
<TabItem value="wifi" label="Обычный Wi-Fi" default>

По умолчанию ровер пытается подключиться к одной из сетей:

```bash
SSID: TurtleBro / TurtleBro5G
Password: turtlew001
```

Проверьте:

* ровер включён и завершил загрузку;
* компьютер подключён к той же Wi-Fi-сети;
* в интерфейсе роутера видно устройство `broverXX`;
* имя `broverXX.local` соответствует номеру ровера.

</TabItem>
<TabItem value="wifi-fallback" label="Wi-Fi fallback">

Если ровер не смог подключиться к известной Wi-Fi-сети, он может создать собственную точку доступа.

Параметры:

```bash
SSID: имя хоста ровера, например brover01
Password: turtlew001
IP-адрес ровера: 192.168.50.1
```

После подключения к этой сети проверьте:

```bash
ssh pi@192.168.50.1
```

</TabItem>
<TabItem value="ethernet-fallback" label="Ethernet fallback">

Если Wi-Fi нестабилен, подключите Ethernet-кабель напрямую к Raspberry Pi ровера и к компьютеру.

В этом режиме ровер доступен по адресу:

```bash
192.168.123.1
```

Проверьте подключение:

```bash
ssh pi@192.168.123.1
```

</TabItem>
</Tabs>

Подробнее см. раздел [Сетевой fallback](40-network-fallback.md).

## Не удаётся подключиться по SSH

Проверьте подключение по имени хоста:

```bash
ssh pi@broverXX.local
```

Если имя хоста не работает, используйте IP-адрес:

```bash
ssh pi@<IP-адрес ровера>
```

Для fallback-сетей используйте:

```bash
ssh pi@192.168.50.1
ssh pi@192.168.123.1
```

Проверьте:

* компьютер имеет сетевой доступ к роверу;
* ровер включён и завершил загрузку;
* IP-адрес или hostname указаны правильно;
* используется пользователь `pi`;
* если настроены SSH-ключи, выбран правильный ключ.

Подробнее см. разделы [SSH-подключение](20-connection-to-rover/20-ssh-connection.md) и [SSH-ключи](../30-device-configuration/20-ssh-key-setup.md).

## Не открывается веб-интерфейс

<details>
<summary>Показать диагностику веб-интерфейса</summary>

Проверьте адрес:

```bash
http://broverXX.local:8080
```

или:

```bash
http://<IP-адрес ровера>:8080
```

Если SSH-доступ есть, проверьте локально на ровере:

```bash
curl -I http://127.0.0.1:8080
```

Ожидаемый результат — HTTP-ответ от веб-сервера, например `200 OK`.

Проверьте сервисы:

```bash
systemctl status ros_nodes.service --no-pager
ss -tuln | grep ':8080'
```

Мягкое восстановление:

```bash
sudo systemctl restart ros_nodes.service
```

Подробнее см. раздел [Веб-интерфейс](20-connection-to-rover/30-web-interface.md).

</details>

## Веб-интерфейс открыт, но ROS недоступен

<details>
<summary>Показать диагностику rosbridge и ROS-сервисов</summary>

Если страница открывается, но веб-интерфейс сообщает, что ROS недоступен, проверьте `rosbridge_server`.

```bash
ros2 node list
```

В списке должна быть нода:

```bash
/rosbridge_server
```

Проверьте порт rosbridge:

```bash
ss -tuln | grep ':9090'
```

Проверьте сервис и логи:

```bash
systemctl status ros_nodes.service --no-pager
journalctl -u ros_nodes.service --no-pager
tail -n 80 /var/log/ros_nodes.log
tail -n 80 /var/log/ros_nodes.err
```

Мягкое восстановление:

```bash
sudo systemctl restart ros_nodes.service
```

</details>

## Нет изображения с камеры

<details>
<summary>Показать диагностику камеры и видеопотока</summary>

Видеопоток в веб-интерфейсе формируется из ROS-топиков камеры. За камеру отвечает `camera.service`, а за HTTP-поток — `/web_video_server`.

Проверьте сервис камеры:

```bash
systemctl status camera.service --no-pager
```

Проверьте, видит ли система USB-камеру:

```bash
lsusb
ls -l /dev/v4l/by-id
ls -l /dev/v4l/by-path
```

Проверьте ROS-топик камеры:

```bash
ros2 topic list | grep camera
ros2 topic info /camera1/image_raw
```

Проверьте web_video_server:

```bash
curl -I http://127.0.0.1:9999
ss -tuln | grep ':9999'
```

Проверьте логи камеры:

```bash
tail -n 80 /var/log/camera.log
tail -n 80 /var/log/camera.err
journalctl -u camera.service --no-pager
```

Мягкое восстановление:

```bash
sudo systemctl restart camera.service
```

Если камера не определяется в `lsusb` или отсутствует в `/dev/v4l/by-id`, проверьте подключение камеры к Raspberry Pi и перезагрузите ровер.

</details>

## Не открывается code-server

<details>
<summary>Показать диагностику code-server</summary>

Проверьте адрес:

```bash
http://broverXX.local:8090
```

или:

```bash
http://<IP-адрес ровера>:8090
```

Если SSH-доступ есть, проверьте сервис:

```bash
systemctl status code-server@pi.service --no-pager
ss -tuln | grep ':8090'
curl -I http://127.0.0.1:8090
```

Для `curl` нормальным ответом может быть перенаправление на страницу входа, например `302 Found`.

Мягкое восстановление:

```bash
sudo systemctl restart code-server@pi.service
```

Подробнее см. раздел [VS Code / code-server](20-connection-to-rover/40-vscode-code-server-connection.md).

</details>

## Компьютер не видит ROS 2-топики ровера

<details>
<summary>Показать диагностику Fast DDS Discovery Server</summary>

На ровере по умолчанию используется Fast DDS Discovery Server.

Проверьте сервис на ровере:

```bash
systemctl status fastdds.service --no-pager
ss -tuln | grep ':11811'
```

Сервис должен быть `active (running)`, а порт `11811/udp` должен быть доступен.

На компьютере проверьте переменные окружения:

```bash
echo $ROS_DISCOVERY_SERVER
echo $ROS_SUPER_CLIENT
```

Для подключения через Discovery Server обычно используются:

```bash
export ROS_DISCOVERY_SERVER="<IP-адрес ровера>:11811"
export ROS_SUPER_CLIENT=TRUE
```

Если `ros2 topic list` пустой или не обновляется, перезапустите ROS daemon на компьютере:

```bash
ros2 daemon stop
ros2 daemon start
```

Подробнее см. раздел [Подключение к ROS 2 через Discovery Server](20-connection-to-rover/50-fastdds/20-fastdds-discovery-server.md).

</details>

## Ровер не реагирует на пульт

<details>
<summary>Показать диагностику управления с пульта</summary>

Проверьте органы управления:

* `CH5` должен быть в нижнем положении;
* для первого теста `CH7` лучше установить в нижнее положение;
* стики должны менять значения в ROS-топике `/joy`.

Проверьте ROS-ноды:

```bash
ros2 node list
```

В списке должны быть:

```bash
/joy
/radiolink_control
/control_move
```

Проверьте топики:

```bash
ros2 topic info /joy
ros2 topic echo /joy
ros2 topic info /cmd_vel
```

Если `/joy` не меняется при движении стиков, проверьте подключение приёмника или USB-адаптера пульта.

Подробнее см. раздел [Управление с джойстика](70-joystick-control.md).

</details>

## Ровер не реагирует на команды из веб-интерфейса

<details>
<summary>Показать диагностику управления из веб-интерфейса</summary>

Управление из веб-интерфейса проходит через цепочку:

```text
web UI -> rosbridge_server -> /cmd_vel -> /control_move
```

Проверьте:

```bash
ros2 node list
ros2 topic info /cmd_vel
ss -tuln | grep ':9090'
```

В списке нод должны быть:

```bash
/rosbridge_server
/control_move
```

Топик `/cmd_vel` должен иметь подписчика `/control_move`.

:::note

Переключатель `CH5` относится к управлению с пульта и не влияет на управление из веб-интерфейса.

:::

Если команды движения не выполняются, также проверьте:

* ровер не находится в аварийной остановке;
* питание исполнительной части подключено;
* колёса не заблокированы механически.

</details>

## Проблемы с CAN

<details>
<summary>Показать диагностику CAN</summary>

Для пользовательских задач используйте `can1`. Интерфейс `can0` используется системными компонентами ровера.

Проверьте пользовательский CAN-интерфейс:

```bash
ip -details link show can1
```

Ожидаемые параметры:

* CAN FD включён;
* `bitrate 1000000`;
* `dbitrate 8000000`;
* интерфейс находится в состоянии `UP`.

Прослушивание пользовательской шины:

```bash
candump can1
```

:::warning[Осторожно]

Не используйте `can0` для пользовательских тестов без необходимости. Ошибка в системной CAN-шине может нарушить работу низкоуровневой электроники ровера.

:::

Подробнее см. раздел [Работа с CAN на роботе](50-can-communication-on-robot.md).

</details>

## Проблемы с fallback-сетями

<details>
<summary>Показать диагностику fallback-сетей</summary>

Проверьте сетевые fallback-сервисы:

```bash
systemctl status network-fallback.service --no-pager
systemctl status wifi-ap-fallback.service --no-pager
systemctl status hostapd-wifi-fallback.service --no-pager
systemctl status dnsmasq-fallback.service --no-pager
systemctl status dnsmasq-wifi-fallback.service --no-pager
```

Проверьте адреса интерфейсов:

```bash
ip -br addr
```

Ожидаемые адреса:

| Режим | Интерфейс | IP-адрес |
| ----- | --------- | -------- |
| Wi-Fi fallback | `wlan0` | `192.168.50.1/24` |
| Ethernet fallback | `eth0` | `192.168.123.1/24` |

:::note

Если ровер уже перешёл в режим Wi-Fi fallback, автоматического переключения обратно в режим клиента при появлении известной Wi-Fi-сети не происходит. Чтобы ровер снова попытался подключиться к известной Wi-Fi-сети, перезагрузите устройство.

:::

Подробнее см. раздел [Сетевой fallback](40-network-fallback.md).

</details>

## Когда перепрошивать образ

<details>
<summary>Показать признаки, при которых стоит перепрошить образ</summary>

Перепрошивка microSD-карты полностью заменяет систему на ровере. Используйте этот вариант после базовой диагностики, если:

* система не загружается;
* повреждены системные файлы;
* устройство работает нестабильно после изменения настроек;
* требуется перейти на свежую версию `broverOS`;
* проблему не удаётся устранить настройкой сети, сервисов или ROS-окружения.

Перед перепрошивкой ещё раз проверьте версию текущего образа:

```bash
grep '^IMAGE_VERSION=' /etc/os-release
```

Инструкция приведена в разделе [Обновление образа ОС](../30-device-configuration/40-updating-os-image.md).

</details>
