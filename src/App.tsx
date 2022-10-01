import { useEffect, useState, FC, ReactNode } from "react";
import "./App.css";

enum isAnswer {
  Correct,
  Wrong,
}

type ExpireProps = {
  children?: ReactNode;
  delay: number;
};

const generateRandomColor = () => {
  let hexLetter: string;
  let arrOfHexLetters: string[] = [];
  let color: string;

  for (let i = 0; i < 6; i++) {
    hexLetter = Math.floor(Math.random() * 16).toString(16);
    arrOfHexLetters.push(hexLetter);
  }

  color = arrOfHexLetters.slice(0, 6).join("");

  return `#${color}`;
};

const Expire: FC<ExpireProps> = ({ children, delay }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return visible ? (
    <div>{children}</div>
  ) : (
    <div className="play-again">Play again!</div>
  );
};

function App() {
  const [color, setColor] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<isAnswer | undefined>(
    undefined
  );

  const generateColors = () => {
    const actualColor = generateRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, generateRandomColor(), generateRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
    console.log("actual color:", actualColor);
  };

  useEffect(() => {
    generateColors();
  }, []);

  const handleAnswerClick = (answer: string) => {
    if (answer === color) {
      setIsCorrectAnswer(isAnswer.Correct);
      generateColors();
    } else {
      setIsCorrectAnswer(isAnswer.Wrong);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>React challenge</h1>
        <div className="guess-me" style={{ background: color }}></div>
        <div className="answer-btn">
          {answers.map((answer) => (
            <button key={answer} onClick={() => handleAnswerClick(answer)}>
              {answer}
            </button>
          ))}
        </div>

        <div className="answer">
          {isCorrectAnswer === isAnswer.Correct && (
            <div>
              <Expire delay={4000}>Correct!</Expire>
            </div>
          )}
        </div>
        <div className="wrong">
          {isCorrectAnswer === isAnswer.Wrong && "Wrong answer. Try again!"}
        </div>
      </div>
    </div>
  );
}

export default App;
