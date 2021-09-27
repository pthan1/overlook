import db from '../apiCalls';

class RoomModel {
  constructor(allRooms) {
    this.allRooms = allRooms;
  }

  // getAllRooms() {
  //   return db.getAllRooms()
  //   .then(data => {return data});
  // }

}

export default RoomModel;