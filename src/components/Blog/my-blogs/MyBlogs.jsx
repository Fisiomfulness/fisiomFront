'use client';
import { useEffect, useState, Fragment } from 'react';
import { getBlogs, getProfessionalBlogs } from '@/services/blogs';
import { Pagination, Spinner } from '@nextui-org/react';
import InfoCard from './InfoCard';

// ! TODO: Change for session id [professional | context]
const sessionId = '6621996c532167844b1923a5';

const CARDS_PER_PAGE = 6;

const MyBlogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myBlogs, setMyBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const query = { limit: CARDS_PER_PAGE };

  const handleChange = (selectedPage) => {
    setIsLoading(true);
    getProfessionalBlogs(sessionId, { ...query, page: selectedPage })
      .then((res) => {
        setMyBlogs(res.blogs);
        setPage(res.page);
        setTotalPages(res.totalPages);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getProfessionalBlogs(sessionId, query)
      .then((res) => {
        setMyBlogs(res.blogs);
        setPage(res.page);
        setTotalPages(res.totalPages);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <Fragment>
          {myBlogs.length > 0 ? (
            <Fragment>
              <div className="w-full justify-center gap-x-6 gap-y-8 grid grid-cols-[repeat(auto-fill,minmax(auto,400px))] mb-2">
                {myBlogs.map((blog) => (
                  <InfoCard key={blog._id} blog={blog} />
                ))}
              </div>
              <Pagination
                showControls
                total={totalPages}
                initialPage={1}
                page={page}
                onChange={handleChange}
                className="w-full flex justify-center mt-auto mb-2"
              />
            </Fragment>
          ) : (
            <h3 className="m-auto">Aun no publicaste nada...</h3>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyBlogs;
