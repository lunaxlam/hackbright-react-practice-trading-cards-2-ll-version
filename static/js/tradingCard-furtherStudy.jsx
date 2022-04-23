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


// The TradingCard component returns a React element consisting of HTML elements defining each trading card object that will be mounted
function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}


// The AddTradingCard component returns a React element that consists of a form
function AddTradingCard(props) {

  // These are the states that we are tracking and if they change then the component will re-render
  // In the return, the useState functions are called after a user enters form data and it updates the form fields
  // The values in the updated form fields are then used to submit the form to the server when the addNewCard() is called
  const [name, setName] = React.useState("");
  const [skill, setSkill] = React.useState("");

  function addNewCard() {
    // The addNewCard() actually submits the form so it updates to the server
    // We need to access the component's state to access the user's form data 
    // The back-end is already implemented in the route /add-card
    
    // Step 1 - Goes to the '/add-card route and sends the following metadata to handle the POST method
    fetch('/add-card', {
      method: 'POST',  // Use the AJAX fetch() with POST since that is what the '/add-card' route is expecting
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'name': name, 'skill': skill})
    })
      .then(response => response.json())
      .then(jsonResponse => {
        alert(`Card added! Response: ${jsonResponse.cardAdded}`);
        const cardAdded = jsonResponse.cardAdded;
        // When we call the addCard() by accessing it as a prop, it changes the state being monitored in TradingCardContainer
        // This allows the TradingCardContainer to re-render every time a card is added
        props.addCard(cardAdded);
      });
  }
  
  // In the return we are not sending a normal HTML form so it does not default to a usual GET request method
  // We use POST at the connected route 

  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">Name</label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="nameInput"
        style={{ marginLeft: "5px" }}>
      </input>
      <label htmlFor="skillInput"
        style={{ marginLeft: "10px", marginRight: "5px" }}
      >
        Skill
      </label>
      <input
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        id="skillInput"
      ></input>
      <button style={{ marginLeft: "10px" }} onClick={addNewCard}>
        Add
      </button>
    </React.Fragment>
  );
}


// The TradingCard Container returns the child element return React elements
function TradingCardContainer() {

  // Define a state to monitor and the method to use to update the state
  // If the state is updated, this triggers a re-rendering of the component and its children; React updates DOM for us
  const [cards, setCards]= React.useState([]);

  // Defining this function as a property that the AddTradingCard component can use
  // When this function is called then we update the state
  // The function is not being called in the parent component 
  function addCard(newCard) {
    // [...cards] makes a copy of the the cards
    const currentCards = [...cards];

    // [...currentCards, newCard] is an array of all elements in currentCards, followed by newCard
    setCards([...currentCards, newCard]);
  }

  // useEffect is often used to load initial data for a React component 
  // useEffect will run the defined function EVERY TIME the component re-renders; pass a second argument to prevent this
  // The second argument lets useEffect know not to run the function IF the argument passed to the function provided has NOT changed 
  // Use an empty array as the second argument to run the effect only one time; otherwise, pass in your args as an array
  React.useEffect(() => {
    fetch('/cards-further-study.json')  // Regular GET method to retrieve info already in database 
    // Parse the response as JSON
    .then(response => response.json())
    // Here we define when the component's state should change; update the tradingCards component with the data
    .then(data => setCards(data.cards))
  }, [])

  // We will use this list of tradingCards objects to return as React elements 
  const tradingCards = [];

  // Print out the value of cards
  console.log(`cards: `, cards)

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

  return (
    <React.Fragment>
      <AddTradingCard addCard={addCard}/>
      <h2>Trading Cards</h2>
      <div className="grid">{tradingCards}</div>
    </React.Fragment>
  );
}

// Mount the react elements returned by the TradingCardContainer component at the defined DOM element
ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));
