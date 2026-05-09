---
id: 40-updating-os-image
slug: updating-os-image
title: "Обновление образа ОС"
sidebar_label: "Обновление образа ОС"
sidebar_position: 4
description: "Перепрошивка microSD-карты и установка нового образа системы на BRover-E5"
---

# Обновление образа ОС

Обновление образа операционной системы — это процесс полной перезаписи microSD-карты новым образом.

:::warning[Внимание]
Запись образа полностью удалит все данные с выбранной microSD-карты. Перед началом убедитесь, что выбрана именно карта ровера, а важные данные с неё больше не нужны.
:::

---

## Когда необходимо обновлять образ

Рекомендуется перепрошивать microSD-карту в следующих случаях:

* система не загружается или работает нестабильно
* повреждены системные файлы
* требуется обновление ROS 2 или системного окружения
* необходимо вернуть устройство к «чистому» состоянию
* возникают ошибки, которые не устраняются через настройку

---

## Где скачать образ

Актуальные образы системы для **BRover-E5** доступны по ссылке:

[https://disk.360.yandex.ru/d/XdNcAYlAGHu0yg](https://disk.360.yandex.ru/d/XdNcAYlAGHu0yg)

Скачайте последнюю версию образа на свой компьютер.

---

## Подготовка microSD-карты

1. Извлеките microSD-карту из ровера
2. Подключите её к компьютеру через кардридер
3. Убедитесь, что карта определяется системой

---

## Запись образа через Raspberry Pi Imager

**Raspberry Pi Imager** — официальный инструмент для работы с Raspberry Pi.

### Порядок действий

1. Скачайте и установите [`Raspberry Pi Imager`](https://www.raspberrypi.com/software/)
2. Запустите программу
3. Выберите устройство - **Raspberry Pi 5**

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-1.png").default} alt="qj" width="500" /></figure>

4. Пролистните вниз и выберите пункт **Использовать настраиваемый образ**

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-2.png").default} alt="qj" width="500" /></figure>

5. Укажите скачанный образ

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-3.png").default} alt="qj" width="500" /></figure>

6. Выберите подключенную microSD-карту

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-4.png").default} alt="qj" width="500" /></figure>

7. Нажмите **Запись**

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-5.png").default} alt="qj" width="500" /></figure>

8. Согласитесь с полной очисткой содержимого на microSD-карте

<figure style={{textAlign: 'center'}}><img src={require("./img/rpimager-6.png").default} alt="qj" width="500" /></figure>

Во время записи операционная система может показывать всплывающие окна с предложением отформатировать разделы. Закройте эти окна без форматирования, дождитесь завершения записи и извлеките карту.

---

## Запись образа через balenaEtcher

**balenaEtcher** — простой и универсальный инструмент для записи образов.

### Порядок действий

1. Скачайте и установите [`balenaEtcher`](https://github.com/balena-io/etcher/releases)
2. Запустите программу
3. Нажмите **Flash from file** и выберите скачанный образ

<figure style={{textAlign: 'center'}}><img src={require("./img/balena-1.png").default} alt="qj" width="500" /></figure>
<figure style={{textAlign: 'center'}}><img src={require("./img/balena-2.png").default} alt="qj" width="500" /></figure>

4. Нажмите **Select target** и выберите microSD-карту

<figure style={{textAlign: 'center'}}><img src={require("./img/balena-3.png").default} alt="qj" width="500" /></figure>
<figure style={{textAlign: 'center'}}><img src={require("./img/balena-4.png").default} alt="qj" width="500" /></figure>

5. Нажмите **Flash**

<figure style={{textAlign: 'center'}}><img src={require("./img/balena-5.png").default} alt="qj" width="500" /></figure>

После завершения дождитесь окончания проверки записи и извлеките карту.

---

## Завершение

1. Вставьте microSD-карту обратно в ровер
2. Включите устройство
3. Дождитесь полной загрузки системы

После загрузки ровер будет работать с новым образом системы.

---
