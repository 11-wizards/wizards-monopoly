import type { FC } from 'react';
import { Spin } from 'antd';

import './Loader.scss';

type LoaderProps = {
  loading: boolean;
  children: JSX.Element;
  showChildrenWhileLoading?: boolean;
  size?: 'small' | 'large';
};

export const Loader: FC<LoaderProps> = ({ loading, children, showChildrenWhileLoading, size }) =>
  loading ? (
    <div className="loader">
      <Spin className="loader__spinner" size={size} />
      {showChildrenWhileLoading && <div className="loader__childrenContainer">{children}</div>}
    </div>
  ) : (
    children
  );
