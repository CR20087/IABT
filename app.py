from flask import Flask,jsonify,render_template,request,make_response
from src.Flask import iabt_sql
from src.Flask import Password_Reset
from dotenv import load_dotenv


# Flask App configuration
app=Flask(__name__, template_folder='src/Flask/templates')
    
# Routes
@app.route('/')
def index():
    """Default/Home page has a basic rendered template"""
    return render_template('index.html')

@app.route("/login",methods=['POST'])
def login_verify():
    """Checks for login match.
    
    Returns hashed password role of account, (employee specific) if account
    has been registered.
    """
    data=request.get_json()
    result=iabt_sql.login_verify(data['username'])
    return jsonify(password=str(result[0]),role=str(result[1]),setup=str(result[2]))



if __name__ == "__main__":
    app.run(debug=True)
