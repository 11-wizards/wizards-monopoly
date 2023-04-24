import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';

export const useFullScreenApi = (element: RefObject<Nullable<HTMLDivElement>>): JSX.Element => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(document.fullscreenElement != null);

  const setFullscreen = (): void => {
    if (element === null) return;
    if (element.current == null) return;
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(document.fullscreenElement != null);
        })
        .catch(() => {
          setIsFullscreen(false);
        });
    }
    element.current
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(document.fullscreenElement != null);
      })
      .catch(() => {
        setIsFullscreen(false);
      });
  };

  useLayoutEffect(() => {
    if (element === null) return;
    if (element.current == null) return;
    const el = element.current as HTMLElement;

    const onSetIsFullScreen = (): void => setIsFullscreen(document.fullscreenElement != null);

    el.onfullscreenchange = onSetIsFullScreen;

    return () => {
      el.onfullscreenchange = null;
    };
  });

  return (
    <Button onClick={setFullscreen}>
      {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </Button>
  );
};
