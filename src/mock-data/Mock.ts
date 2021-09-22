import generateDataScientists from "./DataScientistMock";
import { GigType, DataSet } from "../util/types";

const faker = require("faker");

//start generating all mock models
let mockDataScientists = generateDataScientists(10);

let mockdata = {
  mockDataScientists: mockDataScientists,
  number: 10,
};

export const generateGigs: (i: number) => GigType[] = (i: number) => {
  let gigs: GigType[] = [];

  for (let id = 1; id <= i; id++) {
    let id = faker.datatype.uuid();
    let title = faker.lorem.slug();
    let description = faker.lorem.sentence();
    let price = faker.commerce.price(8200, 176300);
    let status = faker.random.arrayElement([
      "created",
      "received offers",
      "cancelled",
      "in progress",
      "received results",
      "finished",
    ]);
    let dataset = faker.datatype.uuid();

    // gigs.push({
    //   id: id,
    //   title: title,
    //   description: description,
    //   price: price,
    //   status: status,
    //   dataset: dataset,
    //   offer: [
    //     {
    //       id: "offer-1",
    //     },
    //     {
    //       id: "offer-2",
    //     },
    //   ],
    //   sla: [],
    //   dateCreated: "18/07/2021",
    //   dateUpdated: null,
    // });
  }

  return gigs;
};

export const generateOffers = (i: number) => {
  let offers = [];

  for (let id = 1; id <= i; id++) {
    let id = faker.datatype.uuid();

    let description = faker.lorem.sentence();
    let price = faker.commerce.price(8200, 176300);

    offers.push({
      id: id,
      accepted: false,
      description: description,
      price: price,

      dateCreated: "08/07/2021",
      lastUpdated: null,
    });
  }

  return offers;
};

export const generateDataset: (i: number) => DataSet[] = (i: number) => {
  let data: DataSet[] = [];

  for (let id = 1; id <= i; id++) {
    let id = faker.datatype.uuid();

    let description = faker.lorem.sentence();

    // data.push({
    //   id: id,
    //   title: faker.lorem.slug(),
    //   description: description,
    //   location: faker.name.jobArea(),
    //   storage: faker.locale,
    //   created: "18/07/2021",
    //   lastUpdated: null,
    // });
  }

  return data;
};

export const generateExecutons = (i: number) => {
  let data = [];

  for (let id = 1; id <= i; id++) {
    let id = faker.datatype.uuid();

    let description = faker.lorem.sentence();

    data.push({
      id: id,
      description: description,
      executionType: "--",
      workerPool: "--",
      worker: "--",
      dateCreated: "18/07/2021",
      dateUpdated: null,
      gig: "242345",
    });
  }

  return data;
};

export default mockdata;
