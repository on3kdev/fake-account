export interface ApiDataAddress {
  buildingNumber: number;
  city: string;
  country: string;
  county_code: string;
  latitude: number;
  longitude: number;
  street: string;
  streetName: string;
  zipcode: number;
}

export interface ApiDataType {
  gender: Gender;
  name: {
    title: "Mr" | "Mrs" | "Miss" | "Ms" | "Madame" | "Monsieur";
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: "firewall";
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: Countries;
}

export interface DataType {
  title: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  gender: Gender;
  birthday: string;
  age: number;
  email: string;
  phone: string;
  cell: string;
  image: string;
  street: string;
  postcode: number;
  city: string;
  country: string;
  nat: Countries;
}

export type RootStackParamList = {
  Form: undefined;
  Profile: { formData: FormType } | undefined;
  ProfileImage: { image: string } | undefined;
  About: undefined;
  Privacy: undefined;
  Terms: undefined;
};

export type Gender = undefined | "male" | "female";

export type Countries =
  | "au"
  | "br"
  | "ca"
  | "ch"
  | "de"
  | "dk"
  | "es"
  | "fi"
  | "fr"
  | "gb"
  | "ie"
  | "ir"
  | "no"
  | "nl"
  | "nz"
  | "tr"
  | "us";

export interface FormType {
  location: Countries | undefined;
  gender: Gender;
}

export interface Permission {
  canAskAgain: boolean;
  expires: "never";
  granted: boolean;
  status: "granted" | "denied";
}
