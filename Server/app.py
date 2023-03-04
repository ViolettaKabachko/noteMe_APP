from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from postgres_db import DataBase
from json import loads
from db import adr


app = Flask(__name__)
app.secret_key = '488f497f7dc9e664e6842a87c54e47118b53f4c4'
CORS(app)
connected_db = DataBase(**adr)


@app.before_request
def postgres_connection():
    global connected_db
    print('Connecting...')
    connected_db.connect()
    print('Connected to Postgres', end='\n\n')


@app.after_request
def close_connection(response):
    global connected_db
    connected_db.close_connection()
    print('Connection closed', 'response is', response, end='\n')
    return response


@app.route('/reg', methods=['GET', 'POST'])
def register():
    data = loads(request.data)
    print('Data is', data)
    first_name = data['first_name']
    second_name = data['second_name']
    nick = data['nick']
    age = data['age']
    email = data['e-mail']
    password = generate_password_hash(data['password'])
    connected_db.insert_data(first_name, second_name, nick, age, email, password)
    return jsonify({'answer': True})


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = loads(request.data)
        print(f'Data is {data}', end='\n')
        if len(data) < 2:
            email = data['email']
            user = connected_db.get_user_by_email(email)
            return jsonify(user)
        else:
            email = data['email']
            password = data['password']
            user = connected_db.get_user_by_email(email)
            print(user)
            if user and check_password_hash(user[-2], password):
                return jsonify(user)
            return jsonify([
                    'Data is incorrect'
            ])


@app.route('/upload_post', methods=['POST'])
def upload_post():
    data = loads(request.data)
    connected_db.upload_post(int(data['user_id']), data['text'])
    return jsonify([
        "Uploaded"
    ])


@app.route('/users_posts', methods=['POST'])
def show_posts():
    data = loads(request.data)
    print(data)
    posts = connected_db.get_user_posts(int(data['user_id']))
    res = [[post[1], post[-1]] for post in posts]
    return jsonify(res)

# @app.route('/ava', methods=['POST'])
# def dowload():
#     """Upload a avatar to BD by id"""
#     data = request.data
#     print(data.read())
#     return jsonify({})


# @app.route('/posts/<post_id>')
# def posts(post_id):
#     res = connected_db.get_post(int(post_id))
#     print(res)
#     if not res:
#         return jsonify(['There is no post'])
#     return jsonify(
#         {'data': res}
#     )


if __name__ == '__main__':
    app.run()
