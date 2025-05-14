import { useState, useEffect, useRef } from 'react';
import { connectSocket } from '../../services/socket';
import './GameChat.css';

export const GameChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [diceRoll, setDiceRoll] = useState('d20');
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socketRef.current = connectSocket();
    
    socketRef.current.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socketRef.current.on('dice_roll', (roll) => {
      setMessages(prev => [...prev, {
        type: 'roll',
        user: roll.user,
        result: roll.result,
        dice: roll.dice
      }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socketRef.current.emit('message', message);
      setMessage('');
    }
  };

  const handleRollDice = () => {
    socketRef.current.emit('roll_dice', diceRoll);
  };

  return (
    <div className="game-chat">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type === 'roll' ? 'roll' : ''}`}>
            {msg.type === 'roll' ? (
              <>
                <span className="user">{msg.user}: </span>
                <span className="roll-result">{msg.result}</span>
                <span className="dice-type">({msg.dice})</span>
              </>
            ) : (
              <>
                <span className="user">{msg.user}: </span>
                <span className="text">{msg.text}</span>
              </>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Digite uma mensagem..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>

      <div className="dice-roller">
        <select value={diceRoll} onChange={(e) => setDiceRoll(e.target.value)}>
          <option value="d4">d4</option>
          <option value="d6">d6</option>
          <option value="d8">d8</option>
          <option value="d10">d10</option>
          <option value="d12">d12</option>
          <option value="d20">d20</option>
          <option value="d100">d100</option>
        </select>
        <button onClick={handleRollDice}>Rolar</button>
      </div>
    </div>
  );
};