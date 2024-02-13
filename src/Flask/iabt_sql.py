import pyodbc 
from dotenv import load_dotenv
import os
from flask import jsonify

def init():
    """Inizializes connection to SQL Server"""
    load_dotenv()
    database='IABT'
    server=os.getenv('IABT_SQL_USERNAME')
    username=os.getenv('IABT_SQL_USERNAME')
    password=os.getenv('IABT_SQL_PASSWORD')
    driver='{ODBC Driver 18 for SQL Server}'        
    conn=pyodbc.connect('DRIVER='+driver+';SERVER='+server+';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD='+password)
    cur=conn.cursor()
    return cur

# Functions designed for each specific route to exeecute data actions

def login_verify(response, **kwargs):
    """Used to grab hashed password from database for a login username."""
    cur=init()
    cur.execute(f"""SELECT password FROM login 
                WHERE username = {kwargs['username']}
                COLLATE Latin1_General_CS_AS
                """)
    result=cur.fetchone()
    if [result[0]]:
        cur.close()
        response.status_code = 200
        response.data = jsonify(password=result[0])
    else:
        cur.close()
        response.status_code = 400
    return response

def register_account(response, **kwargs):
    """Used during regsiter process to register a new employee account"""
    cur=init()
    try:
        cur.execute(f"""Insert into users(
                    [username]
                    ,[first_name]
                    ,[last_name]
                    ,[email]
                    ,[password]
                    VALUES
                    ({kwargs['username']},
                    {kwargs['firstname']},
                    {kwargs['lastname']},
                    {kwargs['email']},
                    {kwargs['password']})
                    """)
        cur.commit()
        cur.close()
        response.status_code =200
    except Exception as e:
        cur.close()
        response.status_code = 400
        response.data = jsonify(error=e)
    return response

