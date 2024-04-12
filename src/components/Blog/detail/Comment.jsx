import { User, Link } from '@nextui-org/react';
import Star from './Star';

export default function Comment() {
  return (
    <div className="bg-primary-50 p-4 rounded-lg hover:bg-[#D8EEF8] md:p-8">
      <div className="flex items-center justify-between mb-2">
        <User
          name="Jane Doe"
          description={<Star />}
          avatarProps={{
            src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
          }}
          className="text-zinc-800 italic"
        />
        <Link href="#" color="danger">
          Reportar
        </Link>
      </div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore harum
        atque temporibus ratione culpa fugit error, dolorem a, quos odio enim
        corporis consequuntur exercitationem excepturi, necessitatibus modi
        corrupti repellendus earum!
      </p>
    </div>
  );
}
