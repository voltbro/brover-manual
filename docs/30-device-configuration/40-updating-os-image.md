---
id: 40-updating-os-image
slug: updating-os-image
title: "Обновление образа ОС"
sidebar_label: "Обновление образа ОС"
sidebar_position: 4
description: "Перепрошивка microSD-карты и установка нового образа системы на BRover-E5"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Обновление образа ОС

Запись нового образа позволяет обновить программное обеспечение ровера или восстановить исходное состояние системы.

:::info[Когда необходимо обновлять образ]

Обновление образа рекомендуется, если:

* система не загружается или работает нестабильно;
* повреждены системные файлы;
* требуется обновление ROS 2 или системного окружения;
* необходимо вернуть устройство к исходному состоянию;
* возникают ошибки, которые не устраняются настройкой.

:::

:::warning[Данные на карте будут удалены]

Запись образа полностью удалит все данные с выбранной microSD-карты. Убедитесь, что выбрана именно карта ровера, а важные данные с неё больше не нужны.

:::

## 1. Скачайте образ

Скачайте последнюю версию образа для **BRover-E5** на свой компьютер:

[Скачать образ broverOS](https://disk.360.yandex.ru/d/XdNcAYlAGHu0yg)

## 2. Подготовьте microSD

1. Выключите ровер и дождитесь завершения работы системы.
2. Извлеките microSD-карту.
3. Подключите карту к компьютеру через кардридер и убедитесь, что она определяется системой.

## 3. Запишите образ

Для записи можно использовать одну из двух программ:

* **Raspberry Pi Imager** — официальный инструмент Raspberry Pi для выбора устройства и записи образа ОС на microSD-карту.
* **balenaEtcher** — универсальная программа для записи образов на карты памяти и USB-накопители с проверкой результата.

Выберите программу, чтобы открыть соответствующую инструкцию:

<Tabs>
<TabItem value="imager" label="Raspberry Pi Imager" default>

1. Установите [Raspberry Pi Imager](https://www.raspberrypi.com/software/) и запустите программу.
2. Выберите устройство **Raspberry Pi 5**.

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-1.png").default} alt="Выбор Raspberry Pi 5 в Raspberry Pi Imager" width="750" /></figure>

3. В списке операционных систем выберите **Использовать настраиваемый образ**.

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-2.png").default} alt="Выбор пользовательского образа в Raspberry Pi Imager" width="750" /></figure>

4. Укажите скачанный образ.

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-3.png").default} alt="Выбор файла образа в Raspberry Pi Imager" width="750" /></figure>

5. Выберите microSD-карту ровера.

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-4.png").default} alt="Выбор microSD-карты в Raspberry Pi Imager" width="750" /></figure>

:::warning[Не применяйте дополнительные настройки]

Готовый образ `broverOS` содержит необходимые настройки. Не применяйте дополнительные настройки Raspberry Pi Imager: имя устройства, пользователя, пароль, Wi-Fi и SSH.

:::

6. Нажмите **Запись**.

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-5.png").default} alt="Запуск записи в Raspberry Pi Imager" width="750" /></figure>

7. Подтвердите удаление данных на выбранной карте.

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-6.png").default} alt="Подтверждение очистки microSD-карты" width="750" /></figure>

8. Дождитесь завершения записи и проверки.

</TabItem>
<TabItem value="etcher" label="balenaEtcher">

1. Установите [balenaEtcher](https://github.com/balena-io/etcher/releases) и запустите программу.
2. Нажмите **Flash from file** и выберите скачанный образ.

<figure style={{textAlign: 'center'}}><img src={require("./img/balena-1.png").default} alt="Главное окно balenaEtcher" width="750" /></figure>
<figure style={{textAlign: 'center'}}><img src={require("./img/balena-2.png").default} alt="Выбор образа в balenaEtcher" width="750" /></figure>

3. Нажмите **Select target** и выберите microSD-карту ровера.

<figure style={{textAlign: 'center'}}><img src={require("./img/balena-3.png").default} alt="Выбор носителя в balenaEtcher" width="750" /></figure>
<figure style={{textAlign: 'center'}}><img src={require("./img/balena-4.png").default} alt="Список доступных носителей в balenaEtcher" width="750" /></figure>

4. Нажмите **Flash**.

<figure style={{textAlign: 'center'}}><img src={require("./img/balena-5.png").default} alt="Запуск записи в balenaEtcher" width="750" /></figure>

5. Дождитесь завершения записи и проверки.

</TabItem>
</Tabs>

:::warning[Предложение отформатировать карту]

Если Windows предлагает отформатировать разделы microSD-карты, закройте эти окна без форматирования.

:::

## 4. Запустите ровер

1. Безопасно извлеките microSD-карту из компьютера и вставьте её в ровер.
2. Включите ровер и дождитесь загрузки.
3. Подключитесь к устройству по инструкции [Первое подключение](../20-getting-started/30-first-connection.md).
