function Homepage() {
  return (
    <React.Fragment>
      <img src="/static/img/balloonicorn.jpg" alt="" />

      <p>This is a great site for viewing trading cards.</p>

      <a href="/cards-no-react">
        Click here to view the trading cards page written with plain JavaScript and no React.
      </a>
      <br />
      <a href="/cards">Click here to view the trading cards page in React.</a>
    </React.Fragment>
  );
}

ReactDOM.render(<Homepage />, document.getElementById('app'));
