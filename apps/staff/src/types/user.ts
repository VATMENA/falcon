export interface VatsimUser {
  data: {
    cid: string;
    personal: {
      name_first: string;
      name_last: string;
      name_full: string;
      email: string;
    };
    vatsim: {
      region: {
        id: string;
        name: string;
      };
      division: {
        id: string;
        name: string;
      };
      subdivision: {
        id: string;
        name: string;
      };
      rating: {
        id: string;
        long: string;
        short: string;
      };
      pilotRating: {
        id: string;
        short: string;
        long: string;
      };
    };
  };
}
