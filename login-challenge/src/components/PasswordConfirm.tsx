import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/components/PasswordConfirm.module.css';

type Position = { x: number; y: number };

const PasswordConfirm = ({ password, onConfirm }: { 
  password: string;
  onConfirm: (isMatch: boolean) => void 
}) => {
  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState(Array.from({ length: 10 }, (_, i) => i.toString()));
  const positions = useRef<Map<string, Position>>(new Map());
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const getPosition = (index: number) => {
    const item = itemsRef.current[index];
    if (!item) return { x: 0, y: 0 };
    const rect = item.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
  };

  const animateShuffle = async (newNumbers: string[]) => {
    // Salva as posições iniciais
    const initialPositions: Position[] = [];
    newNumbers.forEach((_, index) => {
      initialPositions[index] = getPosition(index);
    });    

    // Atualiza os números
    setNumbers(newNumbers);

    // Espera o React atualizar o DOM
    await new Promise(resolve => requestAnimationFrame(resolve));

    // Anima as mudanças
    newNumbers.forEach((num, newIndex) => {
      const oldIndex = numbers.indexOf(num);
      const item = itemsRef.current[newIndex];
      if (!item) return;

      const finalPos = getPosition(newIndex);
      const initialPos = initialPositions[oldIndex];

      const deltaX = initialPos.x - finalPos.x;
      const deltaY = initialPos.y - finalPos.y;

      // Pré-animação
      item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      item.style.transition = 'transform 0s';

      // Trigger reflow
      item.getBoundingClientRect();

      // Anima para posição final
      item.style.transform = '';
      item.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  };

  const [hasStarted, setHasStarted] = useState(false); // Novo estado

  const handleNumberClick = async (num: string) => {
    if (input.length >= 4) return; // Alterado para 4 caracteres

    // 1. Primeira interação inicia o shuffle
    if (!hasStarted) {
      setHasStarted(true);
      setInput(num);
      await animateShuffle([...numbers].sort(() => Math.random() - 0.5));
      return;
    }

    // 2. Lógica normal para demais interações
    const newInput = input + num;
    setInput(newInput);

    if (newInput.length === 4) {
      // 3. Verificação final
      onConfirm(newInput === password);
      // 4. Resetar estado
      setTimeout(() => {
        setInput('');
        setHasStarted(false);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      {/* Alterado para 4 pontos */}
      <div className={styles.passwordDisplay}>
        {Array(4).fill(0).map((_, i) => (
          <span key={i} className={styles.dot}>
            {i < input.length ? '•' : '○'}
          </span>
        ))}
      </div>

      <div className={styles.numbersGrid}>
        {numbers.map((num, index) => (
          <div
            key={`card-${num}-${index}`}
            className={`${styles.numberCard} ${!hasStarted ? styles.revealed : ''}`} // Revelado inicialmente
            onClick={() => handleNumberClick(num)}
            ref={el => itemsRef.current[index] = el!}
          >
            <div className={styles.cardContent}>
              <div className={styles.front}>?</div>
              <div className={styles.back}>{num}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordConfirm;