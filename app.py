from flask import Flask, render_template, request
from flask_cors import CORS

from src.Flask import iabt_sql

# Flask App configuration
app = Flask(__name__, template_folder='src/Flask/templates')
CORS(app)


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
    response, status = iabt_sql.login_verify(username=data['username'])

    return response, status


@app.route("/register", methods=['POST'])
def register_account():
    """Register new account.
    
    Creates new user instance.
    """
    print('1')
    data = request.get_json()
    print('2')
    response, status = iabt_sql.register_account(username=data['userName'], password=data['password'],
                                                 email=data['email'],
                                                 first_name=data['firstName'], last_name=data['lastName'])
    print('3')
    return response, status


if __name__ == "__main__":
    app.run(debug=True)
