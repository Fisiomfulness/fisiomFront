import { Pagination } from '@nextui-org/react';

export default function Paginate({ total, page, setPage }) {
  return (
    <Pagination
      showControls
      total={total}
      page={page}
      onChange={setPage}
      variant="flat"
      className="mt-auto"
    />
  );
}
