import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

export const useFullScreenApi = (element: HTMLDivElement | null) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onFullscreenChange = (): Promise<void> | undefined => {
    if (document.fullscreenElement) {
      setIsFullscreen(false);

      return document?.exitFullscreen();
    }

    setIsFullscreen(true);

    return element?.requestFullscreen();
  };

  useEffect(() => {
    function onResize() {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    }
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <Button onClick={onFullscreenChange}>
      {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </Button>
  );
};
