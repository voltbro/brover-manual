import React from 'react';
// Импортируем стандартные компоненты MDX
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default {
  // Копируем стандартные компоненты
  ...MDXComponents,
  // Добавляем свои
  Tabs,
  TabItem,
};