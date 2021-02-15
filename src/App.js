import './App.css';
import AvatarMaker from './components/avatarMaker/AvatarMaker';
import Tickets from './components/tickets/Tickets';

const listOfDirections = [
  {city: 'Kyiv', citesCode: 'KBP'},
  {city: 'Dnipro', citesCode: 'DNK'},
  {city: 'Donetsk', citesCode: 'DOC'},
  {city: 'Zaporizhzhia', citesCode: 'OZH'},
  {city: 'Zhytomyr', citesCode: 'ZTR'},
  {city: 'Ivano-Frankivsk', citesCode: 'IFO'},
  {city: 'Kryvyi Rih', citesCode: 'KWG'},
  {city: 'Lviv', citesCode: 'LWO'},
  {city: 'Mariupol', citesCode: 'MPW'},
  {city: 'Mykolaiv', citesCode: 'NLV'},
  {city: 'Odessa', citesCode: 'ODS'},
  {city: 'Rivne', citesCode: 'RWN'},
  {city: 'Sevastopol', citesCode: 'UKS'},
  {city: 'Simferopol', citesCode: 'SIP'},
  {city: 'Sumy', citesCode: 'UMY'},
  {city: 'Ternopil', citesCode: 'TNL'},
  {city: 'Uzhhorod', citesCode: 'UDJ'},
  {city: 'Kharkiv', citesCode: 'HRK'},
  {city: 'Chernivtsi', citesCode: 'CWC'},
  {city: 'Kherson', citesCode: 'KHE'},
  {city: 'Vinnytsia', citesCode: 'VIN'},
  {city: 'Cherkasy', citesCode: 'CKC'},
  {city: 'Kropyvnytskyi', citesCode: 'KGO'},
  {city: 'Kremenchuk', citesCode: 'KHU'},
  {city: 'Poltava', citesCode: 'PLV'}
 ]

function App() {
  return (
    <div className="App">
     <AvatarMaker />
     <div className="separator"></div>
     <Tickets listOfDirections={listOfDirections} minNumOfWays="2" maxNumOfWays="9" />
    </div>
  );
}

export default App;
