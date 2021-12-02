import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImage = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}))


    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
    }

    // handle Choice
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare two card
    useEffect(() => {
      if(choiceOne && choiceTwo) {
        setDisabled(true)
        if(choiceOne.src === choiceTwo.src){
          setCards(prevCards => {
            return prevCards.map((card) => {
              if(card.src === choiceOne.src){
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 1000);
        }
      }
    }, [choiceOne, choiceTwo])


    // start a new  game automaticlly
    useEffect(() => {
      shuffleCards();
    }, [])




    // reset choice & increase turns
    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    }
  
 
  return (
    <div className="App">
      <h1>Magic Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="turns">Turn : {turns}</p>
      <div className="footer">
          Designed By Mohamadreza©
      </div>
    </div>
  );
}

export default App;
