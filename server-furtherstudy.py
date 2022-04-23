from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

CARD_DATA = [
    {
        "name": "Balloonicorn",
        "skill": "video games",
        "imgUrl": "/static/img/balloonicorn.jpg",
        "cardId": 1,
    },
    {
        "name": "Float",
        "skill": "baking pretzels",
        "imgUrl": "/static/img/float.jpg",
        "cardId": 2,
    },
    {
        "name": "Llambda",
        "skill": "knitting scarves",
        "imgUrl": "/static/img/llambda.jpg",
        "cardId": 3,
    },
    {
        "name": "Off-By-One",
        "skill": "climbing mountains",
        "imgUrl": "/static/img/off-by-one.jpeg",
        "cardId": 4,
    },
    {
        "name": "Seed.py",
        "skill": "making curry dishes",
        "imgUrl": "/static/img/seedpy.jpeg",
        "cardId": 5,
    },
    {
        "name": "Polymorphism",
        "skill": "costumes",
        "imgUrl": "/static/img/polymorphism.jpeg",
        "cardId": 6,
    },
    {
        "name": "Short Stack Overflow",
        "skill": "ocean animal trivia",
        "imgUrl": "/static/img/shortstack-overflow.jpeg",
        "cardId": 7,
    },
    {
        "name": "Merge",
        "skill": "bullet journaling",
        "imgUrl": "/static/img/merge.png",
        "cardId": 8,
    },
]


@app.route("/")
def show_homepage():
    """Show the application's homepage."""

    return render_template("homepage.html")


@app.route("/cards-further-study")
def show_cards():
    """Show all trading cards."""

    return render_template("cards-further-study.html")


@app.route("/cards-further-study.json")
def get_cards_json():
    """Return a JSON response with all cards."""

    return jsonify({"cards": CARD_DATA})


@app.route("/add-card", methods=["POST"])
def add_card():
    """Add a new card to the DB. POST method is used here."""

    # Reading the incoming JSON data from the AddTradingCard component

    # request.get_sjon() converts the JSON object back into Python data 
    name = request.get_json().get("name")
    skill = request.get_json().get("skill")

    # Now that the JSON object is in Python data format, we can create a new dictionary object to append
    # into our CARD_DATA list data structure 

    new_card = {
        "name": name,
        "skill": skill,
        "imgUrl": "/static/img/placeholder.png",
        "cardId": len(CARD_DATA) + 1,
    }
    CARD_DATA.append(new_card)

    # After we append the new data, we want to return it back into a JSON object for our JSX file use
    return jsonify({"success": True, "cardAdded": new_card})


@app.route("/cards-no-react")
def show_cards_no_react():
    return render_template("cards-no-react.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
