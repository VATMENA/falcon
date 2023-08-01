export interface User {
  id: string;
  personal: {
    name: String;
    familyName: String;
    email: String;
  };
  vatsim: {
    region: {
      id: String;
      name: String;
    };
    division: {
      id: String;
      name: String;
    };
    subdivision: {
      id: String;
      name: String;
    };
    rating: {
      id: String;
      long: String;
      short: String;
    };
    pilotRating: {
      id: String;
      short: String;
      long: String;
    };
  };
}
