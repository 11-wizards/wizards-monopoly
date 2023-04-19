import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

export const useFullScreenApi = (ref) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onFullscreenChange = (): Promise<void> => {
    console.log(document.documentElement.clientHeight);

    if (isFullscreen) {
      return document?.exitFullscreen();
    }
    const element = ref.current as unknown as HTMLElement;
    setIsFullscreen((prev) => !prev);

    return element?.requestFullscreen();
  };

  useEffect(() => {
    function test() {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    }
    window.addEventListener('resize', test);

    return () => window.removeEventListener('resize', test);
  }, []);

  return (
    <Button onClick={onFullscreenChange}>
      {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </Button>
  );
};
