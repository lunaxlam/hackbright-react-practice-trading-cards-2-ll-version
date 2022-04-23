function Homepage() {
  return (
    <React.Fragment>
      <img src="/static/img/balloonicorn.jpg" alt="" />

      <p>This is a great site for viewing trading cards.</p>

      <a href="/cards-no-react">
        Click here to view the trading cards page written with plain JavaScript and no React.
      </a>
      <br />
      <a href="/cards">Click here to view the trading cards page in React. Only available with server.py</a>
      <br />
      <a href="/cards-further-study">Click here to view the Further Study trading cards page in React. Only available with server-futherstudy.py</a>
    </React.Fragment>
  );
}

ReactDOM.render(<Homepage />, document.getElementById('app'));
