const express = require("express");
const router = express.Router();

const Chat = require("../../models/Chat");

router.get("/chats_day/", async (req, res) => {
  try {
    const chats = await Chat.aggregate([
      {
        $group: {
          _id: {
            timestampDay: {
              $dayOfYear: { $dateFromString: { dateString: "$timestamp" } }
            },
            sender: "$sender"
          },

          count: { $sum: 1 },
          first: { $min: { $dateFromString: { dateString: "$timestamp" } } }
        }
      },
      { $sort: { "_id.timestampDay": -1 } },
      { $project: { date: "$first", count: 1 } }
    ]);
    console.log(chats);

    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/chats_by_hour/:page_no", async (req, res) => {
  const page = req.params.page_no;

  try {
    const chats = await Chat.aggregate([
      {
        $group: {
          _id: {
            timestamp: {
              $hour: { $dateFromString: { dateString: "$timestamp" } }
            },
            timestampDay: {
              $dayOfYear: { $dateFromString: { dateString: "$timestamp" } }
            },
            sender: "$sender"
          },

          count: { $sum: 1 },
          first: { $min: { $dateFromString: { dateString: "$timestamp" } } }
        }
      },
      { $sort: { "_id.timestampDay": -1 } },
      { $skip: (page - 1) * 20 },
      { $limit: 20 },
      { $project: { date: "$first", count: 1 } }
    ]);
    console.log(chats);

    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
