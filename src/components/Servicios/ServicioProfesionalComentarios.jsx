'use client';
import { useState, useEffect } from 'react';
import { ScrollShadow, Spinner } from '@nextui-org/react';
import { getProfessionalRatings, hasUserCommented } from '@/services/professionals';
import { apiEndpoints } from '@/api_endpoints';
import axios from 'axios';
import roles from '@/utils/roles';
import ProfessionalComment from './ProfessionalComment';
import ServicioDetallesCommentBox from './ServicioDetallesCommentBox';

// * Como no se esta realizando un observer si no un fetch de mas comentarios [si hay] al
// * Utilizar el scroll, se necesita de este mismo, o sea que ES OBLIGATORIO QUE El
// * MAX_PER_PAGE SEA MÍNIMO DE 6 asi las cards activan el scroll [max-h 40rem del container].
const ServicioProfesionalComentarios = ({
  professional,
  dataComments,
  MAX_RATINGS_PER_PAGE = 10,
  session,
}) => {
  const [comments, setComments] = useState(dataComments.comments || []);
  const [hasMoreToFetch, setHasMoreToFetch] = useState(dataComments.hasMoreToLoad);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);

  const isProfessional = session && session.user.role === roles.PROFESSIONAL;

  useEffect(() => {
    if (session && !isProfessional) {
      hasUserCommented(professional._id, session.user.id).then((commented) => {
        setHasCommented(commented);
      });
    }
  }, [session, professional._id]);

  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const bottom = scrollHeight - scrollTop === clientHeight;

    // * Fetch comments in reach bottom of scroll and only if there are more
    if (bottom && hasMoreToFetch) {
      setIsFetchingComments(true);
      getProfessionalRatings(professional._id, comments.length, MAX_RATINGS_PER_PAGE)
        .then((res) => {
          setComments((prev) => [...prev, ...res.comments]);
          setHasMoreToFetch(res.hasMoreToLoad);
        })
        .finally(() => setIsFetchingComments(false));
    }
  };

  return (
    <section className="grow flex flex-col my-6">
      {comments.length > 0 ? (
        <ScrollShadow
          size={20}
          onScroll={handleScroll}
          className="grow max-h-[40rem] overflow-y-auto flex flex-col gap-3"
        >
          {comments.map((comment) => (
            <ProfessionalComment key={comment._id} comment={comment} />
          ))}
          {isFetchingComments && <Spinner size="md" color="primary" />}
        </ScrollShadow>
      ) : (
        <p
          className={`grow text-secondary-500 font-bold text-center border-t border-gray-200 pt-[1.5rem]`}
        >
          {!session || isProfessional
            ? 'Sin comentarios'
            : !isProfessional &&
              'Se el primero en dejarle un comentario al profesional! 😁'}
        </p>
      )}

      {session ? (
        !isProfessional ? (
          hasCommented ? (
            <div className="text-center bg-primary-600 mt-5 md:mt-7 text-white p-5">
              <p>Ya le has dejado un comentario a este profesional.</p>
            </div>
          ) : (
            <ServicioDetallesCommentBox
              professional={professional}
              session={session}
              setComments={setComments}
              setHasCommented={setHasCommented}
            />
          )
        ) : (
          <div className="text-center bg-primary-600 mt-5 md:mt-7 text-white p-5">
            <p>Solo los usuarios pueden dejar un comentario</p>
          </div>
        )
      ) : (
        <div className="text-center bg-primary-600 mt-5 md:mt-7 text-white p-5">
          <p>
            <span>
              <a
                href="/login"
                className="font-semibold tracking-wider text-primary-50 underline hover:no-underline hover:text-secondary-900"
              >
                Inicie sesión
              </a>
            </span>{' '}
            para dejar un comentario
          </p>
        </div>
      )}
    </section>
  );
};

export default ServicioProfesionalComentarios;
