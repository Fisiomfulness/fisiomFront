"use client";

import Question from "@/components/pregunta_experto/Question";
import Comment from "@/components/pregunta_experto/Comment";
import { useState, useEffect } from "react";

import Loading from "@/app/loading";

function PreguntaExpertoClient() {
  const [comments, setComments] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const item = localStorage.getItem("comments");
    const _comments = JSON.parse(item);
    if (_comments?.length > 0) setComments(_comments);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <div className="p-4 w-full max-w-4xl flex flex-col items-center mx-auto gap-4">
      <Question comments={comments} setComments={setComments} />
      {comments.length > 0 && (
        <button
          className="bg-primary px-6 py-1 text-white font-bold"
          onClick={() => setComments([])}
        >
          Limpiar
        </button>
      )}
      <div className="w-full flex flex-col gap-4 text-center">
        {isLoading ? (
          <Loading />
        ) : comments.length <= 0 ? (
          <p>Ninguna pregunta</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              comments={comments}
              setComments={setComments}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PreguntaExpertoClient;
