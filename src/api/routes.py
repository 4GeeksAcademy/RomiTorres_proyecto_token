"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
# from flask import Flask, request, jsonify, url_for, Blueprint
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return response_body, 200

@api.route('/users', methods=['POST', 'GET'])

def handle_users():
    if request.method == 'GET' :
        users = db.session.execute(db.select(User).order_by(User.name)).scalars()
        results = [item.serialize() for item in users]
        response_body = {"message": "Esto devuelve el GET del endpoint /users",
                         "results": results,
                         "status": "ok"}
        return jsonify(response_body), 200
    if request.method == 'POST' :
        request_body = request.get_json()
        user = User(email= request_body["email"], 
                    password= request_body["password"],
                    name= request_body["name"],
                    is_active= request_body['is_active'],
                    lastname= request_body["lastname"])
        db.session.add(user)
        db.session.commit()
        print(request_body)
        response_body = {"message": "Adding new user",
                         "status": "ok",
                         "new_user": request_body}
        return response_body, 200

@api.route('/users/<int:id>', methods=['PUT', 'GET', 'DELETE'])    
def handle_user(id):
    if request.method == 'GET' :
        user = db.get_or_404(User, id)
        response_body = {"status": "ok",
                         "results": user.serialize()}
        return response_body, 200
    if request.method == 'PUT' :
         request_body = request.get_json()
         user = db.get_or_404(User, id)
         user.email = request_body["email"]
         user.password = request_body["password"]
         user.name = request_body["name"]
         user.lastname = request_body["lastname"]
         db.session.commit()
         response_body = {"message": "Updating user",
                         "status": "ok",
                         "user": request_body}
         return response_body, 200
    if request.method == 'DELETE' :
        user = db.get_or_404(User, id)
        db.session.delete(user)
        db.session.commit()
        response_body = {"message": "Deleting user",
                         "status": "ok",
                         "user_deleting": id}
        return response_body, 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # aqui realizamos la consulta a nuestra DB
    # verificar email, password y si esta activo
    user = db.one_or_404(db.select(User).filter_by(email=email, password=password, is_active=True),
                         description=f'Usuario no encontrado: < {email} >')

    access_token = create_access_token(identity=email)
    response_body = {'access_token':access_token,
                    'message': 'User logged',
                     'status': 'ok' }
    return response_body, 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200