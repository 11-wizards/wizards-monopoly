import type { FC } from 'react';
import { Spin } from 'antd';

import './Loader.scss';

const Loader: FC = () => <Spin className="wrapper-loader" size="large" />;

export { Loader };
