import {
  FaBold,
  FaStrikethrough,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
  FaQuoteRight,
} from 'react-icons/fa';
import { LuHeading2, LuHeading3, LuHeading4 } from 'react-icons/lu';

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="px-2 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border-b-0 border border-gray-300">
      <div className="flex justify-start items-center gap-3 md:gap-5 w-full lg:w-10/12 flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('bold')
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <FaBold className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('italic')
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <FaItalic className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('underline')
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <FaUnderline className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('strike')
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <FaStrikethrough className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <LuHeading2 className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <LuHeading3 className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('heading', { level: 4 })
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <LuHeading4 className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('bulletList')
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <FaListUl className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('orderedList')
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <FaListOl className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`p-[0.375rem] border-2 border-gray-300 rounded-lg ${
            editor.isActive('blockquote')
              ? 'bg-secondary-300 text-white border-primary-100'
              : 'text-gray-800'
          }`}
        >
          <FaQuoteRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
