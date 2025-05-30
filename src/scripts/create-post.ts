import { promises as fs } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createPost = async () => {
  const slug = process.argv[2];
  if (!slug) {
    console.error('記事のslugを入力してください。');
    process.exit(1);
  }

  const now = new Date();
  const year = String(now.getFullYear());
  const yearSort = String(now.getFullYear()).slice(2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const date = now.toISOString().split('T')[0];
  const dateStr = `${yearSort}${month}${day}`;

  const dirPath = path.join(__dirname, `../content/articles/${year}`);
  const filePath = path.join(dirPath, `${dateStr}_${slug}.mdx`);

  const template = `---
title:
slug: ${slug}
pubDate: '${date}'
image: ../../../assets/images/first-post.jpg
ogp: 'images/ogp/first-post.jpg'
category:
tags:
  -
description:
relatedPosts:
  - recommended-book-for-frontend-devs
---
import PostAdUnit from '../../../components/markdown/PostAdUnit.astro';
  `;

  try {
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(filePath, template, 'utf8');
    console.log(`記事の雛形を作成しました: ${filePath}`);
  } catch (error) {
    console.error('記事の雛形の作成中にエラーが発生しました:', error);
  }
};

createPost();
