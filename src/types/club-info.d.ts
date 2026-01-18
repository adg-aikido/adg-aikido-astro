declare module "../data/club-info.yaml" {
  interface BoardMember {
    role: string;
    name: string;
  }

  interface ClubInfo {
    name: string;
    address: {
      street: string;
      postalCode: string;
      city: string;
    };
    payment: {
      plusgiro: string;
      swish: string;
      "swish-image": string;
    };
    contact: {
      email: string;
      facebook: string;
    };
    board: {
      email: string;
      members: BoardMember[];
    };
    directions: {
      publicTransport: string[];
      parking: {
        note: string;
      };
      walkingDirections: string;
    };
    maps: Array<{
      src: string;
      alt: string;
    }>;
  }

  const clubInfo: ClubInfo;
  export default clubInfo;
}
