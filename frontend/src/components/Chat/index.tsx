import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaRobot, FaTimes, FaUser } from 'react-icons/fa';

export default function Chat() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState();
  const prevMessage = useRef(message);
  const [messageLog, setMessageLog] = useState([]);

  const predict = useCallback(async () => {
    const msg = message.replace(/[^a-zA-Z ]/g, '');
    const response = await fetch(`http://localhost:9999/predict/${msg}`);
    const data = await response.json();
    return data;
  }, [message]);

  const inputRef = useRef(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message && prevMessage.current !== message) {
      predict().then((data) => {
        // @ts-ignore
        const index = Object.values(data).indexOf(Math.max(...Object.values(data)));
        // @ts-ignore
        setResult(Object.keys(data)[index]);
      });
    }
  }, [message, predict]);

  const suggestions = useMemo(() => {
    if (!result) {
      return [];
    } else {
      switch (result) {
        // @ts-ignore
        case 'Disgust':
          return ['😖', '🤢'];
        // @ts-ignore
        case 'Enjoyment':
          return ['😊', '😂', '🤣'];
        // @ts-ignore
        case 'Sadness':
          return ['😥', '😔', '🥲'];
        // @ts-ignore
        case 'Anger':
          return ['😠', '😡', '😤'];
        // @ts-ignore
        case 'Fear':
          return ['😨', '😱', '😰'];
        // @ts-ignore
        case 'Other':
          return ['🤔', '🤨', '🤭'];
        default:
          return [];
      }
    }
  }, [result]);

  return (
    <>
      <div className="chat">
        <div className="chat__show" onClick={() => setShow((prev) => !prev)}>
          Feedback
        </div>
      </div>
      {show && (
        <div className="chat__hide">
          <div className="chat__header">
            <div className="chat__header__title">
              <FaRobot size={20} />
              <p> Feedback</p>
            </div>
            <FaTimes size={20} onClick={() => setShow(false)} style={{ marginRight: '15px' }} />
          </div>
          <div className="chat__body">
            <div className="chat__suggestion">
              {!!message &&
                !!result &&
                suggestions.map((suggestion, index) => (
                  <div
                    className="chat__suggestion__item"
                    onClick={() => {
                      setMessage(message + ' ' + suggestion + suggestion + suggestion + ' ');
                      // @ts-ignore
                      inputRef.current.focus();
                    }}
                    key={index}
                  >
                    {suggestion} {suggestion} {suggestion}
                  </div>
                ))}
            </div>
            <div className="chat__box" ref={ref}>
              {messageLog.map((log, index) => (
                // @ts-ignore
                <div className={`chat__wrapper ${log.type}`} key={index}>
                  {/* @ts-ignore */}
                  <div className={`chat__message`} key={index}>
                    {/* @ts-ignore */}
                    {log.type === 'user' && (
                      <div className="chat__avatar">
                        <FaUser size={20} />
                      </div>
                    )}
                    {/* @ts-ignore */}
                    <div className="chat__text">{log.message}</div>
                    {/* @ts-ignore */}
                    {log.type === 'bot' && (
                      <div className="chat__avatar">
                        <FaRobot size={20} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="chat__footer">
            <input
              type="text"
              placeholder="Type your message"
              className="chat__input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (!!message) {
                    // @ts-ignore
                    setMessageLog((prev) => [
                      ...prev,
                      {
                        type: 'user',
                        message
                      }
                    ]);
                    setMessage('');
                    switch (result) {
                      // @ts-ignore
                      case 'Disgust':
                        // @ts-ignore
                        setMessageLog((prev) => [
                          ...prev,
                          {
                            type: 'bot',
                            message: 'Chúng tôi có thể hỗ trợ gì cho bạn?'
                          }
                        ]);
                        break;
                      // @ts-ignore
                      case 'Enjoyment':
                        // @ts-ignore
                        setMessageLog((prev) => [
                          ...prev,
                          {
                            type: 'bot',
                            message: 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi'
                          }
                        ]);
                        break;
                      // @ts-ignore
                      case 'Sadness':
                        // @ts-ignore
                        setMessageLog((prev) => [
                          ...prev,
                          {
                            type: 'bot',
                            message: 'Hãy để chúng tôi hỗ trợ bạn'
                          }
                        ]);
                        break;
                      // @ts-ignore
                      case 'Anger':
                        // @ts-ignore
                        setMessageLog((prev) => [
                          ...prev,
                          {
                            type: 'bot',
                            message: 'Chúng tôi sẽ cố gắng để cải thiện dịch vụ'
                          }
                        ]);
                        break;
                      // @ts-ignore
                      case 'Fear':
                        // @ts-ignore
                        setMessageLog((prev) => [
                          ...prev,
                          {
                            type: 'bot',
                            message: 'Chúng tôi sẽ cố gắng hỗ trợ bạn'
                          }
                        ]);
                        break;
                      // @ts-ignore
                      case 'Other':
                        // @ts-ignore
                        setMessageLog((prev) => [
                          ...prev,
                          {
                            type: 'bot',
                            message: 'Cảm ơn bạn. Chúc bạn một ngày tốt lành'
                          }
                        ]);
                        break;
                    }
                    // @ts-ignore
                    ref.current.scrollTop = ref.current.scrollHeight + 500;
                  }
                }
              }}
              ref={inputRef}
            />
          </div>
        </div>
      )}
    </>
  );
}
