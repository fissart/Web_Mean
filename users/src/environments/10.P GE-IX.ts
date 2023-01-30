db.users.updateMany({dni:{$in:
  [
  "72212524",
  "70172224",
  "48086354",
  "71092594",
  "80074962",
  "72089445",
  "46376546",
  "70390277",
  "70601901",
]
}},{"$set": {"mension": "P", "ciclo":"X"}})


db.users.updateMany({dni:{$in:
  [
"47403717",
"73617766",
"70397697",
"73874326",
]
}},{"$set": {"mension": "G", "ciclo":"X"}})

db.users.updateMany({dni:{$in:
  [
"46432093",
"70419398",
]
}},{"$set": {"mension": "E", "ciclo":"X"}})
