import { bitable } from '@lark-opdev/block-bitable-api';
import { FC, useEffect } from 'react';
import { useAsync } from 'react-async-hook';
import { downloadPdf, getCurrentTask } from './utils';
import { Typography, Tag, Button, Divider, Space, Toast } from '@douyinfe/semi-ui';
import { table } from '@douyinfe/semi-ui/lib/es/markdownRender/components';

const { Title, Text } = Typography;

const defaultTask = {
  tuitionCode: '',
  studentName: '',
};

export const App = () => {
  const task = useAsync(getCurrentTask, []);
  const { tuitionCode, studentName } = task.result ?? defaultTask;

  useEffect(() => {
    return bitable.base.onSelectionChange(({ data }) => task.execute());
  }, []);

  if (task.loading) return <div>loading</div>;
  if (task.error) return <div>error: {task.error.message}</div>;

  return (
    <PureTaskComponment
      tuitionCode={tuitionCode}
      studentName={studentName}
      onDownloadPdf={downloadPdf}
    />
  );
};

interface PureTaskComponmentProps {
  tuitionCode: string | null;
  studentName: string | null;
  onDownloadPdf: () => void;
}

const PureTaskComponment: FC<PureTaskComponmentProps> = ({
  tuitionCode,
  studentName,
  onDownloadPdf,
}) => {
  return (
    <Space vertical align='start'>
      <div>
        <Title heading={2}>Xuất phiếu đóng học phí</Title>
      </div>
      <div>
        <Text>Mã học phí: </Text>
        <Text>{tuitionCode}</Text>
      </div>
      <div>
        <Text>Tên học viên: </Text>
        <Text>{studentName}</Text>
      </div>
      <Button onClick={onDownloadPdf}>Download PDF</Button>
    </Space>
  );
};
