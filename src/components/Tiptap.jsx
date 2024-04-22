'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import Toolbar from './Toolbar';

const Tiptap = ({ editorRef, content, onChange, limitCharacters = 1000 }) => {
  // * Callback that will receive the html content
  const handleChange = (newContent) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CharacterCount.configure({ limit: limitCharacters }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'w-full px-3 py-2 bg-white border border-gray-300 rounded-bl-md rounded-br-md shadow-sm outline-none focus:border-primary-500',
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  if (!editor) return null;
  if (editorRef) editorRef.current = editor;

  return (
    <div className="w-full">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <p
        className={
          editor.storage.characterCount.characters() === limitCharacters
            ? 'text-danger-500'
            : 'text-gray-500'
        }
      >
        {editor.storage.characterCount.characters()}/{limitCharacters}{' '}
        caracteres
      </p>
    </div>
  );
};

export default Tiptap;
