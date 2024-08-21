import { useState } from 'react';
import { User, Link } from '@nextui-org/react';
import Stars from './Stars';
import ServicioReportComentario from './ServicioReportComentario';

export default function ProfessionalComment({ comment }) {
  return (
    <div className="bg-primary-50 p-4 rounded-lg hover:bg-[#D8EEF8] md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-2">
        <User
          name={comment._user.name}
          description={<Stars rating={comment.score} />}
          avatarProps={{
            src: comment._user.image,
          }}
          className="text-zinc-800 italic"
        />
        <ServicioReportComentario />
      </div>
      <p className="text-sm">{comment.description}</p>
    </div>
  );
}
