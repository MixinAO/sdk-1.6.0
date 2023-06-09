import { activeContractsList } from "@mixinao/osx-ethers";
import { NetworkDeployment, SupportedNetworks } from "./interfaces/common";
import { ProposalMetadata } from "./interfaces/plugin";
import { JsonRpcProvider } from "@ethersproject/providers";

export const MVMProvider = new JsonRpcProvider('https://geth.mvm.dev', {
  chainId: 73927,
  name: 'mvm',
  ensAddress: '0xB269b926d06186dA332DED7d9229becfdbDA6b72',
})

export const UNSUPPORTED_PROPOSAL_METADATA_LINK: ProposalMetadata = {
  title: "(unsupported metadata link)",
  summary: "(the link to the metadata is not supported)",
  description: "(the link to the metadata is not supported)",
  resources: [],
};
export const EMPTY_PROPOSAL_METADATA_LINK: ProposalMetadata = {
  title: "(the proposal has no metadata)",
  summary: "(the current proposal does not have any content defined)",
  description: "(the current proposal does not have any content defined)",
  resources: [],
};
export const UNAVAILABLE_PROPOSAL_METADATA: ProposalMetadata = {
  title: "(unavailable metadata)",
  summary: "(the proposal metadata is not available)",
  description: "(the proposal metadata is not available)",
  resources: [],
};

const getGraphqlNode = (netowrk: SupportedNetworks): string => {
  return netowrk === 'mvm' 
  ? "https://graph.mvg.finance/subgraphs/name/osx-mainnet/graphql"
  : `https://subgraph.satsuma-prod.com/${
    process.env.SATSUMA_API_KEY || "qHR2wGfc5RLi6"
  }/aragon/osx-${SupportedNetworksToGraphqlNetworks[netowrk]}/api`;
};

type GraphqlNetworks = "mainnet" | "goerli" | "polygon" | "mumbai" | 'mvm';

const SupportedNetworksToGraphqlNetworks: {
  [K in SupportedNetworks]: GraphqlNetworks;
} = {
  homestead: "mainnet",
  goerli: "goerli",
  matic: "polygon",
  maticmum: "mumbai",
  mvm: "mvm",
};

export const GRAPHQL_NODES: { [K in SupportedNetworks]: { url: string }[] } = {
  homestead: [{ url: getGraphqlNode("homestead") }],
  goerli: [{ url: getGraphqlNode("goerli") }],
  matic: [{ url: getGraphqlNode("matic") }],
  maticmum: [{ url: getGraphqlNode("maticmum") }],
  mvm: [{ url: getGraphqlNode("mvm") }],
};

const IPFS_ENDPOINTS = {
  prod: [
    {
      url: "https://ipfs-0.aragon.network",
      headers: {
        "X-API-KEY": process.env.IPFS_API_KEY ||
          "b477RhECf8s8sdM7XrkLBs2wHc4kCMwpbcFC55Kt",
      },
    },
    {
      url: "https://ipfs-1.aragon.network",
      headers: {
        "X-API-KEY": process.env.IPFS_API_KEY ||
          "b477RhECf8s8sdM7XrkLBs2wHc4kCMwpbcFC55Kt",
      },
    },
  ],
  test: [
    {
      url: "https://testing-ipfs-0.aragon.network",
      headers: {
        "X-API-KEY": process.env.IPFS_TEST_API_KEY ||
          "b477RhECf8s8sdM7XrkLBs2wHc4kCMwpbcFC55Kt",
      },
    },
  ],
};

export const IPFS_NODES: {
  [K in SupportedNetworks]: {
    url: string;
    headers?: Record<string, string> | undefined;
  }[];
} = {
  homestead: IPFS_ENDPOINTS.prod,
  goerli: IPFS_ENDPOINTS.test,
  matic: IPFS_ENDPOINTS.prod,
  maticmum: IPFS_ENDPOINTS.test,
  mvm: IPFS_ENDPOINTS.test,
};

export const LIVE_CONTRACTS: { [K in SupportedNetworks]: NetworkDeployment } = {
  homestead: {
    daoFactory: activeContractsList.mainnet.DAOFactory,
    pluginSetupProcessor: activeContractsList.mainnet.PluginRepoFactory,
    multisigRepo: activeContractsList.mainnet["multisig-repo"],
    adminRepo: activeContractsList.mainnet["admin-repo"],
    addresslistVotingRepo:
      activeContractsList.mainnet["address-list-voting-repo"],
    tokenVotingRepo: activeContractsList.mainnet["token-voting-repo"],
    multisigSetup: activeContractsList.mainnet.MultisigSetup,
    adminSetup: activeContractsList.mainnet.AdminSetup,
    addresslistVotingSetup: activeContractsList.mainnet.AddresslistVotingSetup,
    tokenVotingSetup: activeContractsList.mainnet.TokenVotingSetup,
  },
  goerli: {
    daoFactory: activeContractsList.goerli.DAOFactory,
    pluginSetupProcessor: activeContractsList.goerli.PluginSetupProcessor,
    multisigRepo: activeContractsList.goerli["multisig-repo"],
    adminRepo: activeContractsList.goerli["admin-repo"],
    addresslistVotingRepo:
      activeContractsList.goerli["address-list-voting-repo"],
    tokenVotingRepo: activeContractsList.goerli["token-voting-repo"],
    multisigSetup: activeContractsList.goerli.MultisigSetup,
    adminSetup: activeContractsList.goerli.AdminSetup,
    addresslistVotingSetup: activeContractsList.goerli.AddresslistVotingSetup,
    tokenVotingSetup: activeContractsList.goerli.TokenVotingSetup,
  },
  maticmum: {
    daoFactory: activeContractsList.mumbai.DAOFactory,
    pluginSetupProcessor: activeContractsList.mumbai.PluginSetupProcessor,
    multisigRepo: activeContractsList.mumbai["multisig-repo"],
    adminRepo: activeContractsList.mumbai["admin-repo"],
    addresslistVotingRepo:
      activeContractsList.mumbai["address-list-voting-repo"],
    tokenVotingRepo: activeContractsList.mumbai["token-voting-repo"],
    multisigSetup: activeContractsList.mumbai.MultisigSetup,
    adminSetup: activeContractsList.mumbai.AdminSetup,
    addresslistVotingSetup: activeContractsList.mumbai.AddresslistVotingSetup,
    tokenVotingSetup: activeContractsList.mumbai.TokenVotingSetup,
    ensRegistry: activeContractsList.mumbai.ENSRegistry,
  },
  matic: {
    daoFactory: activeContractsList.polygon.DAOFactory,
    pluginSetupProcessor: activeContractsList.polygon.PluginSetupProcessor,
    multisigRepo: activeContractsList.polygon["multisig-repo"],
    adminRepo: activeContractsList.polygon["admin-repo"],
    addresslistVotingRepo:
      activeContractsList.polygon["address-list-voting-repo"],
    tokenVotingRepo: activeContractsList.polygon["token-voting-repo"],
    multisigSetup: activeContractsList.polygon.MultisigSetup,
    adminSetup: activeContractsList.polygon.AdminSetup,
    addresslistVotingSetup: activeContractsList.polygon.AddresslistVotingSetup,
    tokenVotingSetup: activeContractsList.polygon.TokenVotingSetup,
    ensRegistry: activeContractsList.polygon.ENSRegistry,
  },
  mvm: {
    daoFactory: activeContractsList.mvm.DAOFactory,
    pluginSetupProcessor: activeContractsList.mvm.PluginSetupProcessor,
    multisigRepo: activeContractsList.mvm["multisig-repo"],
    adminRepo: activeContractsList.mvm["admin-repo"],
    addresslistVotingRepo:
      activeContractsList.mvm["address-list-voting-repo"],
    tokenVotingRepo: activeContractsList.mvm["token-voting-repo"],
    multisigSetup: activeContractsList.mvm.MultisigSetup,
    adminSetup: activeContractsList.mvm.AdminSetup,
    addresslistVotingSetup: activeContractsList.mvm.AddresslistVotingSetup,
    tokenVotingSetup: activeContractsList.mvm.TokenVotingSetup,
    ensRegistry: activeContractsList.mvm.ENSRegistry,
  },
};
