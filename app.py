from flask import Flask, jsonify, render_template, request, make_response
from src.Flask import iabt_sql
from src.Flask import Password_Reset

# Flask App configuration
app = Flask(__name__, template_folder='src/Flask/templates')


# Routes
@app.route('/')
def index():
    """Default/Home page has a basic rendered template"""
    return render_template('index.html')


@app.route("/login", methods=['POST'])
def login_verify():
    """Checks for login match.
    
    Returns hashed password role of account, (employee specific) if account
    has been registered.
    """
    data = request.get_json()
    response = iabt_sql.login_verify(username=data['username'])

    return response


@app.route("/register", methods=['POST'])
def register_account():
    """Register new account.
    
    Creates new user instance.
    """
    data = request.get_json()
    response, status = iabt_sql.register_account(username=data['userName'], password=data['password'],
                                         email=data['email'],
                                         first_name=data['firstName'], last_name=['lastName'])

    return response, status



if __name__ == "__main__":
    app.run(debug=True)
