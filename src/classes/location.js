import moment from "moment";

class Location {
  constructor(Timestamp, Latitude, Longitude, Label, Address) {
    this.Timestamp = Timestamp;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.Label = Label;
    this.Address = Address;
  }

  get UpdatedRelativeTime() {
    return moment(this.Timestamp).fromNow();
  }

  get Valid() {
    return !!this.Latitude && !!this.Longitude;
  }
}

export const locationFromSyncDoc = (syncDoc) => {
  const { Latitude, Longitude, Label, Address } = syncDoc.data;
  return new Location(syncDoc.dateUpdated, Latitude, Longitude, Label, Address);
};

export default Location;
