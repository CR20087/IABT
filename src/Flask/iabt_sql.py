import pyodbc 
from dotenv import load_dotenv
import os

def init():
    """Inizializes connection to SQL Server"""
    load_dotenv()
    database='CPA'
    server=os.getenv('CPA_SQL_SERVER_ID')
    username=os.getenv('CPA_SQL_AUTH_ID')
    password=os.getenv('CPA_SQL_AUTH_KEY')
    driver='{ODBC Driver 18 for SQL Server}'        
    conn=pyodbc.connect('DRIVER='+driver+';SERVER='+server+';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD='+password)
    cur=conn.cursor()
    return cur

# Functions designed for each specific route to exeecute data actions

def login_verify(username):
    """Used to grab hashed password from database for a login username."""
    cur=init()
    cur.execute(f"""SELECT password FROM login 
                WHERE username = {username}
                COLLATE Latin1_General_CS_AS
                """)
    result=cur.fetchone()
    if result:
        cur.execute(f"""UPDATE login 
                    SET last_login = CURRENT_TIMESTAMP 
                    WHERE username = {username}
                    """)
        cur.commit()
        cur.close()
        return [result[0]]
    else:
        cur.close()
        return ['n/a'] 
    
def register_check(username):
    """Used during login to check if an employee account is registered"""
    cur=init()
    cur.execute(f"""SELECT password FROM login 
                WHERE login.username = {username}
                COLLATE Latin1_General_CS_AS
                """)
    results=cur.fetchone()
    cur.execute(f"Select * FROM employee where username = {username}")
    config=bool(cur.fetchone())
    cur.close()
    return [results[0],config]

def register_account(username,firstname,lastname,email,address,suburb,postcode,phone):
    """Used during regsiter process to register a new employee account"""
    cur=init()
    try:
        cur.execute(f"""Insert into employee(
                    [username]
                    ,[first_name]
                    ,[last_name]
                    ,[email]
                    ,[address_1]
                    ,[address_2]
                    ,[post_code]
                    ,[phone]) 
                    VALUES
                    ({username},
                    {firstname},
                    {lastname},
                    {email},
                    {address},
                    {suburb},
                    {postcode},
                    {phone})
                    """)
        cur.execute(f"""Insert into leave_details(username) VALUES ({username})""")
        cur.commit()
        cur.close()
    except Exception as e:
        cur.close()
        return 'Failed',e
    return 'Success','n/a'

def login_reset_match(email):
    """Check to see if email exists and linked to account"""
    cur=init()
    cur.execute(f"""    
                Select
                username        
                from employee
                where email = '{email}'
                union
                select
                username                
                From manager
                Where email = '{email}'
                """)
    result=cur.fetchone()      
    cur.close()  
    if not result:
        return False
    return True,result[0]

def login_reset(username,password):
    """Update login password to new password using username for where clause"""
    cur=init()
    try:
        cur.execute(f"""
                    Update login set
                    password = {password}
                    Where username = {username}
                    """)
        cur.commit()
        cur.close()
    except Exception as e:
        cur.close()
        return 'Failed',e
    return 'Success','n/a','false'
