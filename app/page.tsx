'use client';

import { useState, useEffect } from 'react';
import { allPosts } from 'content-collections';

export const maxDuration = 30;

export default function Home() {
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post._meta.path}>
          <a href={`/posts/${post._meta.path}`}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}