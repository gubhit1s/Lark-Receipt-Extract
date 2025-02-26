import { bitable } from '@lark-opdev/block-bitable-api';
import { FC, useEffect } from 'react';
import { useAsync } from 'react-async-hook';
import { downloadPdf, getCurrentTask } from './utils';
import {
  Typography,
  Tag,
  Button,
  Divider,
  Space,
  Toast,
} from '@douyinfe/semi-ui';
import { table } from '@douyinfe/semi-ui/lib/es/markdownRender/components';

const { Title, Text } = Typography;

const defaultTask = {
  tableId: '',
  recordId: '',
};

export const App = () => {
  const task = useAsync(getCurrentTask, []);
  const { tableId, recordId } = task.result ?? defaultTask;

  // 切换上下一条记录时，触发 SelectionChange
  useEffect(() => {
    return bitable.base.onSelectionChange(({ data }) => task.execute());
  }, []);

  if (task.loading) return <div>loading</div>;
  if (task.error) return <div>error: {task.error.message}</div>;

  return (
    <PureTaskComponment
      tableId={tableId}
      recordId={recordId}
      onDownloadPdf={downloadPdf}
    />
  );
};

interface PureTaskComponmentProps {
  tableId: string | null;
  recordId: string | null;
  onDownloadPdf: () => void;
}

const PureTaskComponment: FC<PureTaskComponmentProps> = ({
  tableId,
  recordId,
  onDownloadPdf,
}) => {
  return (
    <Space vertical align='start'>
      <div>
        <Title heading={2}>PDF Receipt Extractor</Title>
      </div>
      <div>
        <Text>Table Id: </Text>
        <Text>{tableId}</Text>
      </div>
      <div>
        <Text>Selected record ID: </Text>
        <Text>{recordId}</Text>
      </div>
      <Button onClick={onDownloadPdf}>Download PDF</Button>
    </Space>
  );
};
