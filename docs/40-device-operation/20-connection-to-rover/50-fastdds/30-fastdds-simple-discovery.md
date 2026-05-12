---
id: 30-fastdds-simple-discovery
slug: fastdds-simple-discovery
title: "Подключение через Simple Discovery"
sidebar_label: "Simple Discovery"
sidebar_position: 3
description: "Работа с ROS 2 сетью BRover-E5 в режиме Simple Discovery"
---

# Подключение через Simple Discovery

Режим **Simple Discovery** — это стандартный способ обнаружения узлов в ROS 2.

В этом режиме устройства автоматически находят друг друга по сети при совпадении значения `ROS_DOMAIN_ID`.

---

## Принцип работы

* все узлы рассылают multicast-запросы
* устройства автоматически обнаруживают друг друга
* соединение устанавливается без дополнительной настройки

Ключевым параметром является:

```bash
ROS_DOMAIN_ID
```

Если значение совпадает на роботе и компьютере — они работают в одной ROS-сети.

---

## Настройка робота

1. Подключитесь к роверу по SSH

2. Откройте файл настроек:

```bash
cd ~
sudo nano .ros_params
```

3. Найдите строку:

```bash
export FASTRTPS_DEFAULT_PROFILES_FILE=/home/pi/.ros/fastdds_superclient.xml
```

4. Закомментируйте её:

```bash
# export FASTRTPS_DEFAULT_PROFILES_FILE=/home/pi/.ros/fastdds_superclient.xml
```

5. Найдите параметр:

```bash
export ROS_DOMAIN_ID=10
```

Запомните его значение (по умолчанию — `10`).

6. Сохраните файл и перезагрузите ровер:

```bash
sudo reboot
```

---

## Настройка компьютера

1. Откройте терминал

2. Установите такое же значение `ROS_DOMAIN_ID`, как на ровере:

```bash
export ROS_DOMAIN_ID=10
```

3. Если ранее использовался Discovery Server — очистите переменные:

```bash
unset ROS_DISCOVERY_SERVER
unset ROS_SUPER_CLIENT
unset FASTRTPS_DEFAULT_PROFILES_FILE
```

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

---

:::warning[Важные особенности]

* все устройства с одинаковым `ROS_DOMAIN_ID` видят друг друга
* при работе нескольких роверов возможны конфликты
* multicast-трафик может работать нестабильно в Wi-Fi сетях
:::

---

## Когда использовать

Simple Discovery подходит, если:

* в сети используется **один ровер**
* подключён **один компьютер**
* сеть не перегружена

---

:::note[Рекомендации]

* используйте уникальный `ROS_DOMAIN_ID` для каждого ровера
* рекомендуемый диапазон значений: от `1` до `101`
* значение `0` лучше не использовать (используется по умолчанию в ROS 2)
:::
---

