import { ObjectId } from "bson";

class Task {
  /**
   *
   */
  constructor({
    isComplete,
    summary,
    description,
    partition,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.isComplete = isComplete;
    this.summary = summary;
    this.description = description;
  }

  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      isComplete: "bool",
      summary: "string",
      description: "string",
    },
    primaryKey: "_id",
  };
}

export { Task };
