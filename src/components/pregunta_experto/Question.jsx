import { useDisclosure } from '@nextui-org/react';
import DeleteTab from './DeleteTab';
import DeleteModal from './DeleteModal';
import QuestionContent from './QuestionContent';

function Question({ data, canDelete, tabOpened, setQuestionTabId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const deleteBtnHeight = '2rem';

  const handleTab = () => {
    if (canDelete) setQuestionTabId((prev) => (prev === data._id ? null : data._id));
  };

  return (
    <div
      onClick={handleTab}
      className="relative bg-secondary-50 py-5 px-6 rounded-sm transition-[margin] duration-150 ease-in-out hover:bg-opacity-85"
      style={{
        marginTop: tabOpened ? deleteBtnHeight : 0,
        cursor: canDelete ? 'pointer' : 'default',
      }}
    >
      <DeleteTab
        showTab={tabOpened}
        openModal={onOpen}
        deleteBtnHeight={deleteBtnHeight}
      />
      <DeleteModal
        questionId={data._id}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <QuestionContent data={data} />
    </div>
  );
}

export default Question;
