const tradingCardData = [
  {
    name: 'Balloonicorn',
    skill: 'video games',
    imgUrl: '/static/img/balloonicorn.jpg',
    cardId: 1,
  },
  {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg',
    cardId: 2,
  },
  {
    name: 'Llambda',
    skill: 'knitting scarves',
    imgUrl: '/static/img/llambda.jpg',
    cardId: 3,
  },
  {
    name: 'Off-By-One',
    skill: 'climbing mountains',
    imgUrl: '/static/img/off-by-one.jpeg',
    cardId: 4,
  },
  {
    name: 'Seed.py',
    skill: 'making curry dishes',
    imgUrl: '/static/img/seedpy.jpeg',
    cardId: 5,
  },
  {
    name: 'Polymorphism',
    skill: 'costumes',
    imgUrl: '/static/img/polymorphism.jpeg',
    cardId: 6,
  },
  {
    name: 'Short Stack Overflow',
    skill: 'ocean animal trivia',
    imgUrl: '/static/img/shortstack-overflow.jpeg',
    cardId: 7,
  },
  {
    name: 'Merge',
    skill: 'bullet journaling',
    imgUrl: '/static/img/merge.png',
    cardId: 8,
  },
];

function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function TradingCardContainer() {

  // Define a state to monitor and the method to use to update the state
  // If the state is updated, this triggers a re-rendering of the component and its children; React updates DOM for us
    const [cards, setCards]= React.useState([]);

  // useEffect is often used to load initial data for a React component 
  // useEffect will run the defined function EVERY TIME the component re-renders; pass a second argument to prevent this
  // The second argument lets useEffect know not to run the function IF the argument passed to the function provided has NOT changed 
  // Use an empty array as the second argument to run the effect only one time; otherwise, pass in your args as an array
  React.useEffect(() => {
    fetch('/cards.json')
    // Parse the response as JSON
    .then(response => response.json())
    // Here we define when the component's state should change; update the tradingCards component with the data
    .then(data => setCards(data.cards))
  }, [])

  // We will use this list of tradingCards objects to return as React elements 
  const tradingCards = [];

  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.cardId}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />,
    );
  }

  return <div className="grid">{tradingCards}</div>;
}

// Mount the react elements returned by the TradingCardContainer component at the defined DOM element
ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));

