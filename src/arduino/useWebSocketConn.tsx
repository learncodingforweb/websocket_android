import {useCallback, useEffect, useRef, useState} from 'react';
import config from '../utils/config';

const useWebSocketConn = () => {
  const webRef = useRef<WebSocket>();
  const [forceConnect, setForceConnect] = useState(0);
  const [conStatus, setConStatus] = useState(false);
  const [data, setData] = useState('');

  // console.log('conStatus', conStatus);

  useEffect(() => {
    const sock = new WebSocket(`ws://${config.IP}:${config.PORT}`);
    console.log('forceConnect', forceConnect);
    sock.onopen = () => {
      setConStatus(true);
    };
    sock.onclose = () => {
      console.log('close socket');
      setConStatus(false);
    };
    sock.onerror = () => {
      console.log('error socket');
      setConStatus(false);
    };
    sock.onmessage = e => {
      console.log('message', e.data);
      setData(e.data);
    };
    webRef.current = sock;
    return () => {
      sock.close();
    };
  }, [forceConnect]);

  useEffect(() => {
    if (config.SOCKET_RECONNECT === true) {
      if (conStatus === false) {
        const timeout = setInterval(() => {
          setForceConnect(p => p + 1);
        }, 1000);
        return () => {
          clearInterval(timeout);
        };
      }
    }
  }, [conStatus]);

  const transmit = useCallback(
    (d: string) => {
      webRef.current?.send(d);
    },
    [webRef],
  );

  return {
    data,
    conStatus,
    transmit,
  };
};

export default useWebSocketConn;
