import pyodbc
from dotenv import load_dotenv
import os
from flask import jsonify


def init():
    """Initializes connection to SQL Server"""
    load_dotenv()
    database = 'IABT'
    server = os.getenv('IABT_SQL_USERNAME')
    username = os.getenv('IABT_SQL_USERNAME')
    password = os.getenv('IABT_SQL_PASSWORD')
    driver = '{ODBC Driver 18 for SQL Server}'
    conn = pyodbc.connect(
        'DRIVER=' + driver + ';SERVER=' + server + ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password + 'TrustServerCertificate=yes')
    cur = conn.cursor()
    return cur

def login_verify(**kwargs):
    """Used to grab hashed password from database for a username."""
    cur = init()
    try:
        cur.execute(f"""SELECT password FROM users 
                    WHERE username = {kwargs['username']}
                    COLLATE Latin1_General_CS_AS
                    """)
        result = cur.fetchone()
        if result[0]:
            cur.close()
            return jsonify(data=[{'password': result[0]}]), 200
        else:
            cur.close()
            return jsonify(data=None), 400
    except Exception as e:
        return jsonify(error=e), 501


def register_account(**kwargs):
    """Used during register process to register a new account"""
    cur = init()
    try:
        cur.execute(f"""Insert into users(
                    [username]
                    ,[first_name]
                    ,[last_name]
                    ,[email]
                    ,[password]
                    VALUES
                    ('{kwargs['username']}',
                    '{kwargs['first_name']}',
                    '{kwargs['last_name']}',
                    '{kwargs['email']}',
                    '{kwargs['password']}')
                    """)
        cur.commit()
        cur.close()
        return jsonify(data=None), 200
    except Exception as e:
        cur.close()
        return jsonify(error=e), 501
