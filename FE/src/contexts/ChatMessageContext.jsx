import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { io } from 'socket.io-client';

const MessageContext = createContext();

export const ChatMessageProvider = ({ children }) => {
  const [headerMessage, setHeaderMessage] = useState(null);
  // useRefは再レンダリングしても値を保持できる
  // Socket.IOの接続インスタンスを保存して使い回す用
  const socketRef = useRef(null);

  useEffect(() => {
    // サーバーへSocket.IO接続を作成（初回マウント時のみ）
    const socket = io('/', {
      path: '/socket.io',
      transports: ['websocket'],
    });

    socketRef.current = socket;

    // サーバから"chat:update"イベントを受信して表示を更新
    socket.on('chat:update', (message) => {
      setHeaderMessage(typeof message === 'string' && message ? message : null);
    });

    return () => {
      // 画面を離れたら接続を切断
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // サーバへinputフォームからのmessageを送信
  const sendHeaderMessage = (message) => {
    const socket = socketRef.current;
    if (!socket) return; // 疎通確認

    socket.emit('chat:send', { message });
  };

  // useMemoは同じ値なら同じオブジェクトを再利用できるようにする
  // Contextのvalueを毎回作り直さず、不要な再レンダリングを減らす
  // headerMessageが変わったときだけ新しいvalueを作る
  const value = useMemo(
    () => ({ headerMessage, sendHeaderMessage }),
    [headerMessage]
  );

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export const useHeaderMessage = () => {
  const context = useContext(MessageContext);
  return context;
};
