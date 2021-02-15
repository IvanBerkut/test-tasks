import React, {useState} from 'react'

const Tickets = ({ listOfDirections, maxNumOfWays, minNumOfWays }) => {

    maxNumOfWays = maxNumOfWays > listOfDirections.length ? listOfDirections.length - 1 : maxNumOfWays
    const [listOfTickets, setListOfTickets] = useState(null)
    const [listToShow, setListToShow] = useState('')

    const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
    
    const shuffle = array => {
         let shuffleArray = [...array]
         for (let i = shuffleArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
           [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
      }
      return shuffleArray;
    };

    let newRandomList = []

    const handleButton = () => {
        let amountOfLoops = getRandomInt(listOfDirections.length);
        let amountOfIterations = amountOfLoops < minNumOfWays ? minNumOfWays-1 :  amountOfLoops > maxNumOfWays-1 ? maxNumOfWays-1 : amountOfLoops
        for (let i = 0; i < amountOfIterations; i++) {
            if (i === 0) {
                newRandomList.push([listOfDirections[getRandomInt(listOfDirections.length)].citesCode, listOfDirections[getRandomInt(listOfDirections.length)].citesCode])
            } 
            newRandomList.push([newRandomList[i][1], listOfDirections[getRandomInt(listOfDirections.length)].citesCode])
            if (newRandomList[i][0] === newRandomList[i][1]){
                newRandomList.splice(i, 1);
                if (i < amountOfIterations) {
                    newRandomList.push([newRandomList[i][1], listOfDirections[getRandomInt(listOfDirections.length)].citesCode])
                }
            }
        }

        setListOfTickets(newRandomList)
        setListToShow('random')
    }

    const handleArrange = () => {
        setListToShow('arrange')
    }

    return (
        <>
            <div>
                <h1>Ticket generator</h1>
            </div>
            <div className="random-tickets-block">
                <button onClick={handleButton} className="get-tickets-button">
                    Generate tickets
                </button>
                {listOfTickets && <button onClick={handleArrange} className="arrange-button">Arrange</button>}
                <div className="list-of-random-tickets">
                    {listToShow === 'random'  && shuffle(listOfTickets).map((item,index) => <div className="list-of-random-tickets-item" key={index}>{item[0]} <div className="arrow"><div></div></div> {item[1]} </div>)}
                    {listToShow === 'arrange' && listOfTickets.map((item,index) => <div className="list-of-random-tickets-item" key={index}>{item[0]} <div className="arrow"><div></div></div> {item[1]} </div>)}
                </div>
            </div>
        </>
    )
}

export default Tickets