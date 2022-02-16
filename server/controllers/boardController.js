const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const generateBoard = require('../utils/generateBoard.js');
const db = require('../models/userModel.js');

const boardController = {};

boardController.saveBoard = async (req, res, next) => {
  console.log('Entering saveBoard controller.');
  console.log('req');
  console.log(req.cookies);
  console.log('board');
  console.log(req.body.board);
  console.log('saveslot');
  console.log(req.body.saveSlot);
  if (req.cookies) {
    const username = req.cookies.cookie;
    const saveSlot = req.body.saveSlot;
    const board = JSON.stringify(req.body.board);
    const title = saveSlot;
    // l_id, title, board, slot_no, and user_id
    console.log('running first query');
    const queryForUserId = 'SELECT u_id FROM users WHERE user_name=$1;';
    const userIdResult = await db.query(queryForUserId, [username]);
    const userId = userIdResult.rows[0].u_id;
    console.log(userId);
    console.log('running second query');
    const queryForSave = 'INSERT INTO lexicon (title, board, slot_no, user_id) VALUES (\'cool_board\', $1, $2, $3) RETURNING *;';
    const saveResult = await db.query(queryForSave, [board, saveSlot, userId]);
    console.log(saveResult);


  } else {
    return next();
  }
}

boardController.randomizeBoard = (req, res, next) => {
  let blankBoard = new Array(30).fill(new Array(60).fill(0));
  // check if we have a figure for the requested figure.
  res.locals.randomizeBoard = generateBoard(blankBoard, req.params.id);
  return next();
}

boardController.loadBoard = (req, res, next) => {
  console.log('logic for loadBoard');
  const board = '';
  return next();
}

boardController.postBoard = (req, res, next) => {
  const board = req.body;
  return next();
}

boardController.loadBoardFromLexicon = (req, res, next) => {
  console.log('Entering loadBoardFromLexicon controller.');
}

module.exports = boardController;
