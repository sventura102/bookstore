const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res, next) => {
    const all = mongodb.getDb().db('books').collection('book-list').find();
    all.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
};

const getOne = async(req, res, next) => {
    const byId = new ObjectId(req.params.id);
    const one = await mongodb.getDb().db('books').collection('book-list').find({_id: byId});
    one.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
}

const createBook = async(req, res, next) => {
  const book = {title: req.body.title, author: req.body.author, year: req.body.year, pages: req.body.pages};
  const response = await mongodb.getDb().db('books').collection('book-list').insertOne(book);
  if (response.acknowledged) { res.status(201).json(response);
  } else {
    res.status(500).json(response.error); 
  }
};

const updateBook = async(req, res, next) => {
  const byId = new ObjectId(req.params.id);
  const book = {title: req.body.title, author: req.body.author, year: req.body.year, pages: req.body.pages};
  const response = await mongodb.getDb().db('books').collection('book-list').replaceOne({_id: byId}, book);
  console.log(response);
  if (response) { res.status(204).json(response)
  } else {
    res.status(500).json(response.error);
  }
}

const deleteBook = async(req, res, next) => {
  const byId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('books').collection('book-list').deleteOne({_id: byId}, true)
  if (response) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error);
  }
};

module.exports = {getOne, getAll, createBook, updateBook, deleteBook};