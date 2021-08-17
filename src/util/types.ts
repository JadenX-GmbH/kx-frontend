import { FC } from "react";

interface offerSummary {
  id: string;
}

export interface Offer {
  id: string;
  accepted: boolean;
  description: string;
  price: number;
  dateCreated: string;
  lastUpdated: string | null;
}

export interface Execution {
  id: string;
  description: string;
  executionType: string;
  workerPool: string;
  worker: string;
  dateCreated: string;
  dateUpdated: string | null;
  gig: string;
}

export interface GigType {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  dataset: string;
  offer: offerSummary[];
  sla: string[];
  dateCreated: string;
  dateUpdated: string | null;
}

export interface DataSet {
  id: string;
  title: string;
  description: string;
  location: string;
  storage: string;
  created: string;
  lastUpdated: string | null;
}

export interface User {
  name: string;
  userPhoto?: string;
}

export interface Store {
  token: string;
  user: User | null;
}

export interface routeProp {
  layout: string;
  path: string;
  component: FC;
}
