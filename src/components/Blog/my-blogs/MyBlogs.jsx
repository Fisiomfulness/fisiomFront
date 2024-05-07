'use client';
import { useEffect, useState, Fragment } from 'react';
import {
  deleteBlog,
  getBlogs,
  getProfessionalBlogs,
  updateBlog,
} from '@/services/blogs';
import { Pagination, Spinner } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import InfoCard from './InfoCard';
import EditBlogModal from './EditBlogModal';
import ConfirmModal from './ConfirmModal';
import toast from 'react-hot-toast';

const initialValues = {
  title: '',
  text: '',
  type_id: '',
  image: '',
}

const CARDS_PER_PAGE = 6;

const MyBlogs = ({ types }) => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true);
  const [myBlogs, setMyBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [editIniValues, setEditIniValues] = useState(initialValues);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [blogIdToHandle, setBlogIdToHandle] = useState(null);

  const fetchBlogs = (page = 1) => {
    setIsLoading(true);
    getProfessionalBlogs(session?.user.id, { limit: CARDS_PER_PAGE, page })
      .then((res) => {
        setMyBlogs(res.blogs);
        setPage(res.page);
        setTotalPages(res.totalPages);
      })
      .finally(() => setIsLoading(false));
  };

  const handleBlog = async (option = 'update', newValues) => {
    if (option !== "update" && option !== "delete") return;
    try {
      if (option == 'update') {
        const formData = new FormData();
        for (const name in newValues) {
          formData.append(name, newValues[name]);
        }
        await updateBlog(blogIdToHandle, formData);
        setEditModalOpen(false)
      } else {
        await deleteBlog(blogIdToHandle);
        setConfirmModalOpen(false)
      }
      await fetchBlogs();
      toast.success(`Blog ${option === 'update' ? 'actualizado' : 'eliminado'} correctamente`);
    } catch (error) {
      toast.error('Oops! vuelva a intentarlo mas tarde...');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <Fragment>
          <EditBlogModal
            handleUpdate={handleBlog}
            types={types}
            initialValues={editIniValues}
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
          />
          <ConfirmModal
            isOpen={confirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            onConfirm={handleBlog}
          />
          {myBlogs.length > 0 ? (
            <Fragment>
              <div className="w-full justify-center gap-x-6 gap-y-8 grid grid-cols-[repeat(auto-fill,minmax(auto,400px))] mb-5">
                {myBlogs.map((blog) => (
                  <InfoCard
                    key={blog._id}
                    blog={blog}
                    setEditIniValues={setEditIniValues}
                    setEditModalOpen={setEditModalOpen}
                    setConfirmModalOpen={setConfirmModalOpen}
                    setBlogIdToHandle={setBlogIdToHandle}
                  />
                ))}
              </div>
              <Pagination
                showControls
                total={totalPages}
                initialPage={1}
                page={page}
                onChange={fetchBlogs}
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
