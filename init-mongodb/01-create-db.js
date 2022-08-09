// Create user
dbAdmin = db.getSiblingDB("admin");
dbAdmin.createUser({
  user: "eoren",
  pwd: "admin",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
  mechanisms: ["SCRAM-SHA-1"],
});

// Authenticate user
dbAdmin.auth({
  user: "eoren",
  pwd: "admin",
  mechanisms: ["SCRAM-SHA-1"],
  digestPassword: true,
});

// Create DB and collection
db = new Mongo().getDB("intel");
db.createCollection("events");
db.createUser({
  user: "eoren",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "intel" }],
  mechanisms: ["SCRAM-SHA-1"],
});