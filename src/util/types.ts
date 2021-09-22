import { FC } from "react";

interface offerSummary {
  id: string;
}

export interface OfferType {
  id: string;
  gig: number;
  accepted: boolean;
  description: string;
  price: string;
  priceToken: number;
  isActive: boolean;
  specialist: string;
}

export interface ExecutionResultDTO {
  id: number;
  location: string;
  storageType: string;
  transactionId: string;
  blockchainIdentifier: string;
  executionJob: number;
}

export type ExecutionType = "TEE" | "CLOUD" | "ON_PREMISES";

export interface Program {
  id: number; 
  hash: string;
  executionJob: number;
  location: string;
  storageType: string;
  blockchainAddress?: string | null;
}

export interface Execution {
  id: number;
  priceToken: number;
  description: string;
  executionType: ExecutionType;
  workerPool: string;
  worker: string;
  dateCreated: string;
  dateUpdated: string | null;
  gig: string;
  executionResultDTO: ExecutionResultDTO;
  dataset: number;
  inputParameters: string[];
  programDTOList: Program[];
  dealId: string;
}

export interface ExecutionGig {
  id: number;
  gigId: string;
  dataOwner: string;
  gigDatasets: number[];
  specialist: string;
}

export interface ExecutionExplorationDetails {
  id: number;
  description: string;
}

export interface ExecutionStatus {
  ipfsGatewayURL: string;
  location: string;
  resorceLink: string;
  statusName: 'ACTIVE' | 'REVEALING' | 'COMPLETED';
  storage: string;
}

export interface ExplorationResultDTO {
  explorationJob: number;
  id: number;
  location: string;
  storateType: string;
}

export interface Exploration {
  id: number;
  description: string;
  explorationResultDTO: ExplorationResultDTO;
  codeHash: string;
  gig: string;
  dataset: number;
  dateCreated: string;
  dateUpdated: string | null;
}

export type GigStatus = 'IN_PROGRESS' | 'WAITING' | 'FINISHED' | 'ABORTED';

export interface GigType {
  id: number;
  title: string;
  dataOwner?: string;
  description: string;
  price: number | null;
  maxPrice: number | null;
  priceToken: string | null;
  isActive: boolean;
  status: GigStatus;
  dataset: string;
  offer: offerSummary[];
  executionType: string;
  executionpool: string;
  sla: string[];
  dateCreated: string;
  dateUpdated: string | null;
  skillsetDTOList: Skills[];
  offerAccepted: boolean;
  slaStatementDTOList: Sla[];
}

export interface DataSet {
  id: number;
  title: string;
  description: string;
  location: string;
  storageType: 'IPFS' | 'AWS' | 'Dropbox';
  hash: string;
  type: "RAW" | "OBFUSCATED";
  dataOwner: string;
  created: string | null;
  lastUpdated: string | null;
}

export type Skill = string | number;

export interface Skills {
  id: number;
  name: string;
  category: number;
}

export interface SkillSet {
  id: number;
  skill: Skill;
  maturity: string;
  category?: string;
  user?: number;
}

export interface AddressInfo {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export type UserType = "RDO" | "DS";

export interface User {
  interId: number;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: UserType;
  addresses: Array<AddressInfo>;
  userPhoto: string;
  description: string;
  skills: Array<{ skill: string }>;
  backgroundPhoto: string;
  tagLine: string;
  userGigs: Array<{ gigId: number }>;
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

export interface PaginationType {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface Contract {
  id: number;
  signatureRdo: boolean;
  signatureDs: boolean;
  aggregatedJson: string;
  transactionId: string;
  blockchainIdentifier: string;
  isActive: boolean;
  offer: number;
}

export interface Sla {
  id: number;
  subject: string;
  restriction: string;
  isActive: boolean;
  gig: number;
}

export interface Order {
  id: number;
  name: string;
  transactionId: string;
  blockchainIdentifier: string;
  executionJob: number;
  orderDetails: string;
}
