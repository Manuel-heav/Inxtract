"use client";
import { useState, useEffect } from 'react';
import Tiptap from '../components/Tiptap'

export function DocumentForm({ content: initialContent }: { content: string }) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleChange = (newContent: string) => {
    setContent(newContent);
  }

  return (
    <div>
      <Tiptap onChange={handleChange} content={content} />
    </div>
  );
}
