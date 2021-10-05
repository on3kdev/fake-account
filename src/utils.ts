import { ApiDataType } from "./@types/types";

export const primaryColor = "#005b9f";
export const secondaryColor = "#024577";

const generateString = (word: string, salt: string) => {
  const defaultWord = word.split("");
  const defaultNumbers = salt.split("");
  const defaultChars = ["?", "!", "&", "%", "/", "(", ")", "_", "-"];

  const letters = defaultWord.sort(() => Math.random() - 0.5).slice(0, 6);
  const numbers = defaultNumbers.sort(() => Math.random() - 0.5).slice(0, 2);
  const chars = defaultChars.sort(() => Math.random() - 0.5).slice(0, 2);

  const passwordArray = [...letters, ...numbers, ...chars];

  return passwordArray.sort(() => Math.random() - 0.5).join("");
};

const convertDateFormat = (dateString: string) => {
  const date = new Date(dateString);

  const dateDayString = date.getDate().toString();
  const dateMonthNumber = date.getMonth();
  const dateYear = date.getFullYear();

  const dateDay =
    dateDayString.length > 1 ? dateDayString : `0${dateDayString}`;
  const dateMonth =
    dateMonthNumber.toString().length > 1
      ? dateMonthNumber + 1
      : `0${dateMonthNumber + 1}`;

  return `${dateDay}.${dateMonth}.${dateYear}`;
};

const convertEmail = (email: string) => {
  const name = email.split("@")[0];

  const providerPool = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "aol.com",
    "outlook.com",
    "msn.com",
    "icloud.com",
    "live.com",
  ];

  const provider =
    providerPool[Math.floor(Math.random() * providerPool.length)];

  return `${name}@${provider}`;
};

export const changeFields = (data: ApiDataType) => {
  const birthday = convertDateFormat(data.dob.date);
  const email = convertEmail(data.email);

  return {
    title: data.name.title,
    firstname: data.name.first,
    lastname: data.name.last,
    username: data.login.username,
    password: generateString(data.login.password, data.login.salt),
    gender: data.gender,
    birthday: birthday,
    age: data.dob.age,
    email: email,
    phone: data.phone,
    cell: data.cell,
    image: data.picture.large,
    street: `${data.location.street.name} ${data.location.street.number}`,
    postcode: data.location.postcode,
    city: data.location.city,
    country: data.location.state,
    nat: data.nat,
  };
};
