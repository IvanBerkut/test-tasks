import React, {useState} from 'react'

const Tickets = ({ listOfDirections, maxNumOfWays, minNumOfWays }) => {

    maxNumOfWays = maxNumOfWays > listOfDirections.length ? listOfDirections.length - 1 : maxNumOfWays
    const [listOfTickets, setListOfTickets] = useState(null)
    const [whatShow, setWhotShow] = useState('')

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
        let amountOfIterations = amountOfLoops < minNumOfWays ? minNumOfWays :  amountOfLoops > maxNumOfWays-1 ? maxNumOfWays-1 : amountOfLoops
        for (let i = 0; i < amountOfIterations; i++) {
            if (i === 0) {
                newRandomList.push({from: listOfDirections[getRandomInt(listOfDirections.length)].citesCode, to: listOfDirections[getRandomInt(listOfDirections.length)].citesCode})
            } 
            newRandomList.push({from: newRandomList[i].to, to: listOfDirections[getRandomInt(listOfDirections.length)].citesCode})
            if (newRandomList[i].from === newRandomList[i].to){
                newRandomList.splice(i, 1);
                if (i < amountOfIterations) {
                newRandomList.push({from: newRandomList[i].to, to: listOfDirections[getRandomInt(listOfDirections.length)].citesCode})
            }
            }
        }

        setListOfTickets(newRandomList)
        setWhotShow('random')
    }

    const handleArrange = () => {
        setWhotShow('arrange')
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
                <button onClick={handleArrange} className="arrange-button">Arrange</button>
                <div className="list-of-random-tickets">
                    {whatShow === 'random'  && shuffle(listOfTickets).map((item,index) => <div key={index}>{item.from} - {item.to} </div>)}
                    {whatShow === 'arrange' && listOfTickets.map((item,index) => <div key={index}>{item.from} - {item.to} </div>)}
                </div>
            </div>
        </>
    )
}

export default Tickets