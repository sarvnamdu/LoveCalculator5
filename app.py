import sqlite3

# Connect to the SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('data.db')
print("Connected to SQLite database")

# Create a cursor object to interact with the database
cursor = conn.cursor()

# Create the LoveData table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS LoveData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name1 TEXT,
        name2 TEXT,
        loveScore INTEGER
    )
''')

print("Table LoveData created successfully (if it didn't already exist)")

# Commit the changes and close the connection
conn.commit()
conn.close()
print("Database connection closed")
