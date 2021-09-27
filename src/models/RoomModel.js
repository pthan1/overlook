import db from '../apiCalls';

class RoomModel {
  constructor() {
    this.allRooms = this.getAllRooms();
  }

  getAllRooms() {
    return db.getAllRooms()
    .then(data => return data);
  }

}

export default RoomModel;