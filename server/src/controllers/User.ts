import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User, { IUserModel } from "../models/User";
import bcrypt from 'bcryptjs'
import passportLocal from 'passport-local';
import passport from "passport";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role, storeId } = req?.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password: hashedPassword,
    role,
    storeId
  })

  return user
    .save()
    .then(user => res.status(201).json({ user }))
    .catch(error => res.status(500).json({ error }))
}

const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID

  return User.findById(userID)
    .then(user => user
      ? res.status(200).json({ user })
      : res.status(404).json({ message: 'Not Found [read]' }))
    .catch(error => res.status(500).json({ error }))
}

const readAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .then(users => res.status(200).json({ users }))
    .catch(error => res.status(500).json({ error }))
}

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID
  return User.findById(userID)
    .then(user => {
      if (user) {
        user.set(req?.body)

        return user
          .save()
          .then(user => res.status(201).json({ user }))
          .catch(error => res.status(500).json({ error }))
      } else {
        res.status(404).json({ message: 'Not Found [update]' })
      }
    })

}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID

  return User.findByIdAndDelete(userID)
    .then(user => user
      ? res.status(201).json({ message: 'Deleted' })
      : res.status(404).json({ message: 'Not Found [delete]' }))
    .catch(error => res.status(500).json({ message: error }))
}


const LocalStrategy = passportLocal.Strategy
passport.use('login', new LocalStrategy((username: string, password: string, done) => {
  let newUser;
  User.findOne({ name: username }, (err: Error, user: IUserModel) => {
    if (err) throw err;
    if (!user) return done(null, false);
    console.log(user)
    newUser = user 
    bcrypt.compare(password, newUser.password, (err: Error, result: boolean) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user._id);
      } else {
        return done(null, false);
      }
    });
  });
})
);





export default { createUser, readUser, readAllUsers, updateUser, deleteUser }